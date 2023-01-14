/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {
  ConflictError11000,
  AuthorizationError401,
  NotFoundError404,
  WrongDataError400,
} = require('../middlewares/errorHandlers');

const errorMsg404 = 'Пользователь с указанным _id не найден';
const errorMsg401 = 'Ошибка авторизации';
const errorMsg11000 = 'Пользователь с данным email уже существует';
const errorMsg400 = 'Некорректные данные при создании карточки';

const secret = process.env.JWT_SECRET || 'secret-key';

module.exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.send({ data: users });
    })
    .catch(next);
};

module.exports.getUserId = (req, res, next) => {
  const { userId } = req.params;
  User.findById({
    _id: userId,
  })
    .then((users) => {
      if (!users) {
        throw new NotFoundError404(errorMsg404);
      }

      res.send(users);
    })
    .catch(next);
};

module.exports.getMe = (req, res, next) => {
  const userId = req.user._id;
  User.findById({
    _id: userId,
  })
    .then((users) => {
      if (!users) {
        throw new NotFoundError404(errorMsg404);
      } else {
        res.send(users);
      }
    })
    .catch(next);
};

module.exports.createUser = async (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  const hash = await bcrypt.hash(password, 10).catch(next);
  const user = await User.create({
    email,
    name,
    about,
    avatar,
    password: hash,
  }).catch((err) => {
    if (err.code === 11000) {
      next(new ConflictError11000(errorMsg11000));
    } else if (err.name === 'ValidationError') {
      next(new WrongDataError400(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
    } else {
      next(err);
    }
  });

  const token = jwt.sign({ _id: user._id }, secret, {
    expiresIn: '7d',
  });
  res.send({ token });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const update = { name, about };
  User.findOneAndUpdate({ _id: req.user._id }, update, {
    runValidators: true,
    new: true,
  })
    .then(() => res.send(update))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new WrongDataError400(errorMsg400));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const update = { avatar: req.body.avatar };
  User.findOneAndUpdate({ _id: req.user._id }, update, {
    runValidators: true,
    new: true,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new WrongDataError400(errorMsg400));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then(async (user) => {
      if (!user) {
        throw new AuthorizationError401(errorMsg401);
      } else {
        const matched = await bcrypt.compare(password, user.password);
        if (!matched) {
          throw new AuthorizationError401(errorMsg401);
        } else {
          const token = jwt.sign({ _id: user._id }, secret, {
            expiresIn: '7d',
          });
          res.send({ token });
        }
      }
    })
    .catch(next);
};
