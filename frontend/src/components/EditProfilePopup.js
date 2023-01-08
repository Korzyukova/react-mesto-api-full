import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

class EditProfilePopup extends React.Component {
  static contextType = CurrentUserContext;

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      about: "",
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.setState({ name: this.context.name, about: this.context.about });
    }
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleAboutChange = (event) => {
    this.setState({ about: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onUpdateUser({
      name: this.state.name,
      about: this.state.about,
    });
  };

  render() {
    return (
      <PopupWithForm
        buttonText="Сохранить"
        title="Редактировать профиль"
        name="profilePopup"
        isOpen={this.props.isOpen}
        onClose={this.props.onClose}
        onSubmit={this.handleSubmit}
      >
        <input
          id="nameInput"
          value={this.state.name}
          className="popup__input popup__input_type_name"
          type="text"
          name="name"
          placeholder="Введите имя"
          minLength="2"
          maxLength="40"
          required
          onChange={this.handleNameChange}
        />
        <span className="span"></span>
        <input
          id="aboutInput"
          value={this.state.about}
          className="popup__input popup__input_type_about"
          type="text"
          name="about"
          placeholder="Кто Вы?"
          minLength="2"
          maxLength="200"
          required
          onChange={this.handleAboutChange}
        />
        <span className="span"></span>
      </PopupWithForm>
    );
  }
}

export default EditProfilePopup;
