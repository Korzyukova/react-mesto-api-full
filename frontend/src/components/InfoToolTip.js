import React from "react";
import successImg from "../images/LogedIn.png";
import notSuccessImg from "../images/NotLoggedIn.png";

class InfoToolTip extends React.Component {
  render() {
    return (
      <div className="popup popup_view popup_opened">
        <div className="popup__container-imag popup__content-image">
          <button
            className="popup__closed"
            type="button"
            onClick={this.props.onClose}
          />
          <div className="popup__infotooltip">
            {this.props.isSuccessful ? (
              <>
                <img
                  className="popup__infotooltip_success"
                  src={successImg}
                  alt="login success"
                />
                <p className="popup__infotooltip_text">
                  Вы успешно зарегистрировались!
                </p>
              </>
            ) : (
              <>
                <img
                  className="popup__infotooltip_notsuccess"
                  src={notSuccessImg}
                  alt="login failed"
                />
                <p className="popup__infotooltip_text">
                  Что-то пошло не так! Попробуйте еще раз.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default InfoToolTip;
