import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import React from "react";
import ImagePopup from "./ImagePopup.js";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import { withRouter } from "react-router-dom";

class Home extends React.Component {
  static contextType = CurrentUserContext;
  headerLinks = [{ text: "Выход", src: "/logout" }];
  constructor(props) {
    super(props);
    this.headerLinks.unshift({ text: props.email, src: "/" });
    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: null,
      cards: [],
    };
  }
  componentDidMount() {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([userData, cards]) => {
        this.context.name = userData.name;
        this.context.about = userData.about;
        this.context.avatar = userData.avatar;
        this.context.id = userData._id;
        this.setState({ cards: cards });
      })
      .catch((err) => console.error(err));
  }

  handleEditProfileClick = () => {
    this.setState({ isEditProfilePopupOpen: true });
  };
  handleAddPlaceClick = () => {
    this.setState({ isAddPlacePopupOpen: true });
  };
  handleEditAvatarClick = () => {
    this.setState({ isEditAvatarPopupOpen: true });
  };

  handleCardClick = (card) => {
    this.setState({ selectedCard: card });
  };

  handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === this.context.id);

    if (isLiked) {
      api
        .unlikeCard(card._id)
        .then((data) => {
          this.setState({
            cards: this.state.cards.map((c) => (c._id === card._id ? data : c)),
          });
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      api
        .likeCard(card._id)
        .then((data) => {
          this.setState({
            cards: this.state.cards.map((c) => (c._id === card._id ? data : c)),
          });
        })
        .catch((data) => {
          console.log(data);
        });
    }
  };

  handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then((data) => {
        this.setState({
          cards: this.state.cards.filter((c) => c._id !== card._id),
        });
      })
      .catch((data) => {
        console.log(data);
      });
  };

  closeAllPopups = () => {
    this.setState({ isEditProfilePopupOpen: false });
    this.setState({ isAddPlacePopupOpen: false });
    this.setState({ isEditAvatarPopupOpen: false });
    this.setState({ selectedCard: null });
  };

  handleUpdateUser = (data) => {
    api
      .patchProfile(data)
      .then(() => {
        this.context.name = data.name;
        this.context.about = data.about;
        this.closeAllPopups();
      })
      .catch((data) => {
        console.log(data);
      });
  };

  handleUpdateAvatar = (data) => {
    api
      .patchAvatar(data)
      .then(() => {
        this.context.avatar = data;
        this.closeAllPopups();
      })
      .catch((data) => {
        console.log(data);
      });
  };

  handleAddPlace = (data) => {
    api
      .postInitialCards(data)
      .then((card) => {
        const cards = this.state.cards;
        console.log(cards)
        // cards.splice(0, 0, card);
        this.setState({ cards: cards });
        this.closeAllPopups();
      })
      .catch((data) => {
        console.log(data);
      });
  };

  render() {
    return (
      <div className="page">
        <div className="page__content">
          <Header links={this.headerLinks} />
          <Main
            onEditProfile={this.handleEditProfileClick}
            onAddPlace={this.handleAddPlaceClick}
            onEditAvatar={this.handleEditAvatarClick}
            onCardClick={this.handleCardClick}
            cards={this.state.cards}
            onCardLike={this.handleCardLike}
            onCardDelete={this.handleCardDelete}
          />
          <Footer />

          <EditProfilePopup
            isOpen={this.state.isEditProfilePopupOpen}
            onClose={this.closeAllPopups}
            onUpdateUser={this.handleUpdateUser}
          />

          <AddPlacePopup
            title="Новое место"
            name="placePopup"
            isOpen={this.state.isAddPlacePopupOpen}
            onClose={this.closeAllPopups}
            onAddPlace={this.handleAddPlace}
          />

          <EditAvatarPopup
            isOpen={this.state.isEditAvatarPopupOpen}
            onClose={this.closeAllPopups}
            onUpdateAvatar={this.handleUpdateAvatar}
          />

          <ImagePopup
            card={this.state.selectedCard}
            onClose={this.closeAllPopups}
          />
        </div>

        <div className="popup" id="deletePopup">
          <form className="popup__container popup__content-delete">
            <button className="popup__closed" type="button"></button>
            <h2 className="popup__title">Почему так жесток снег?</h2>
            <button
              className="popup__submit-delete"
              id="submitDelete"
              type="submit"
            >
              Да
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
