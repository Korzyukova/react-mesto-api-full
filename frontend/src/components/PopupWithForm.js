import React from "react";

class PopupWithForm extends React.Component {
  render() {
    let className = `popup popup_type_${this.props.name}`;
    if (this.props.isOpen) {
      className += " popup_opened";
    }

    return (
      <div className={className} id="profilePopup">
        <form
          className="popup__container popup__content"
          id="formProfile"
          name={`form_${this.props.name}`}
          onSubmit={this.props.onSubmit}
        >
          <button
            className="popup__closed"
            type="button"
            onClick={this.props.onClose}
          ></button>
          <h2 className="popup__title">{this.props.title}</h2>
          {this.props.children}

          <button className="popup__submit" id="submitProfile" type="submit">
            {this.props.buttonText}
          </button>
        </form>
      </div>
    );
  }
}

export default PopupWithForm;
