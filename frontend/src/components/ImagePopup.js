import React from "react";

class ImagePopup extends React.Component {
  render() {
    let className = `popup popup_view`;
    if (this.props.card !== null) {
      className += " popup_opened";

      return (
        <div className={className} id="imagePopup">
          <div className="popup__container-image popup__content-image">
            <button
              className="popup__closed"
              type="button"
              onClick={this.props.onClose}
            ></button>
            <img
              className="popup__image"
              alt={this.props.card.name}
              src={this.props.card.link}
            />
            <div className="popup__image-name">{this.props.card.name}</div>
          </div>
        </div>
      );
    }
  }
}

export default ImagePopup;
