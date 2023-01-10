import React from "react";
import { api } from "../utils/Api.js";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

class Main extends React.Component {
  static contextType = CurrentUserContext;
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      userDescription: "",
      userAvatar: "../images/image.jpg",
      cards: [],
    };
  }

  render() {
    return (
      <div>
        <section className="profile">
          <div className="profile__first-section">
            <div className="profile__picture">
              <img
                className="profile__picture-image"
                src={this.context.avatar}
                alt="Жак-Ив Кусто"
              />
              <div
                className="profile__picture-edit"
                onClick={this.props.onEditAvatar}
              ></div>
            </div>

            <div className="profile__info">
              <div className="profile__second-section">
                <h1 className="profile__name" id="profile_name">
                  {this.context.name}
                </h1>
                <button
                  className="profile__edit-button"
                  onClick={this.props.onEditProfile}
                ></button>
              </div>

              <p className="profile__description">{this.context.about}</p>
            </div>
          </div>

          <button
            className="profile__add-button"
            onClick={this.props.onAddPlace}
          ></button>
        </section>

        <ul className="photo-grid">
          { this.props.cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={this.props.onCardClick}
                onCardLike={this.props.onCardLike}
                onCardDelete={this.props.onCardDelete}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Main;
