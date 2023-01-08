import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

class AddPlacePopup extends React.Component {
  static contextType = CurrentUserContext;

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      link: "",
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.setState({ link: "", name: "" });
    }
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleLinkChange = (event) => {
    this.setState({ link: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onAddPlace({
      name: this.state.name,
      link: this.state.link,
    });
  };

  render() {
    return (
      <PopupWithForm
        buttonText="Создать"
        title="Добавить место"
        name="addPlacePopup"
        isOpen={this.props.isOpen}
        onClose={this.props.onClose}
        onSubmit={this.handleSubmit}
      >
        <input
          id="placeInput"
          className="popup__input popup__input_type_place-name"
          type="text"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <span className="span">Вы пропустили это поле</span>
        <input
          id="linkInput"
          className="popup__input popup__input_type_link"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
          value={this.state.link}
          onChange={this.handleLinkChange}
        />
        <span className="span">Введите адрес сайта</span>
      </PopupWithForm>
    );
  }
}

export default AddPlacePopup;
