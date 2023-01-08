import React from "react";
import Header from "./Header";

class Register extends React.Component {
  headerLinks = [{ text: "Войти", src: "/sign-in" }];

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.state = {
      email: "",
      password: "",
    };
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.props.handleRegister(this.state.email, this.state.password);
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <>
        <div className="page">
          <Header links={this.headerLinks} />
          <div className="page__auth">
            <form className="page__auth_form" onSubmit={this.handleSubmit}>
              <div className="page__auth_input">
                <h1 className="page__auth_prompt">Регистрация</h1>
                <input
                  id="email"
                  placeholder="Email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                ></input>
                <input
                  placeholder="Пароль"
                  type="password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                ></input>
              </div>
              <button className="page__auth_button" type="submit">
                Зарегистрироваться
              </button>
              <a className="page__auth_link" href="/sign-in">
                Уже зарегистрированы?Войти
              </a>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Register;
