import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

class EditAvatarPopup extends React.Component {
  static contextType = CurrentUserContext;

  constructor(props) {
    super(props);

    this.state = {
      link: "",
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.setState({ link: "" });
    }
  }

  handleAvatarChange = (event) => {
    this.setState({ link: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onUpdateAvatar(this.state.link);
  };

  render() {
    return (
      <PopupWithForm
        buttonText="Сохранить"
        title="Обновить аватар"
        name="avatarPopup"
        isOpen={this.props.isOpen}
        onClose={this.props.onClose}
        onSubmit={this.handleSubmit}
      >
        <input
          id="avatarInput"
          className="popup__input popup__input_type_link"
          type="url"
          name="link"
          value={this.state.link}
          placeholder="Ссылка на картинку"
          required
          onChange={this.handleAvatarChange}
        />
        <span className="span">Введите ссылку на аватар</span>
      </PopupWithForm>
    );
  }
}

export default EditAvatarPopup;
