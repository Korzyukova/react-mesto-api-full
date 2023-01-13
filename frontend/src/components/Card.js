import React from "react";
import trash from "../images/Trash.png";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

class Card extends React.Component {
  static contextType = CurrentUserContext;

  render() {
    console.log('context', this.context)
    const canDelete = this.props.card ? this.props.card.owner._id === this.context.id : false;
    const cardDeleteButtonClassName = `trash ${canDelete ? "" : "hidden"}`;

    const isLiked = (this.props.card && this.props.card.likes) && this.props.card.likes.includes(this.context.id)
    const cardLikeButtonClassName = `${
      isLiked ? "photo-grid__heart_active" : "photo-grid__heart"
    }`;
    const likedCount = (this.props.card && this.props.card.likes) && this.props.card.likes.length;

    return (
      <li className="photo-grid__rectangle">
        <img
          src={trash}
          alt="мусорная корзинка"
          className={cardDeleteButtonClassName}
          onClick={this.handleDelete}
        />
        <img
          className="photo-grid__item"
          src={this.props.card.link}
          alt={this.props.card.name}
          onClick={this.handleClick}
        />
        <div className="photo-grid__bottom">
          <h2 className="photo-grid__name">{this.props.card.name}</h2>
          <div className="photo-grid__likeme">
            <button
              className={cardLikeButtonClassName}
              onClick={this.handleLikeClick}
            >
              {" "}
            </button>
            <span className="photo-grid__likes">{likedCount}</span>
          </div>
        </div>
      </li>
    );
  }

  handleClick = () => {
    this.props.onCardClick(this.props.card);
  };

  handleLikeClick = () => {
    this.props.onCardLike(this.props.card);
  };
  handleDelete = () => {
    this.props.onCardDelete(this.props.card);
  };
}

export default Card;
