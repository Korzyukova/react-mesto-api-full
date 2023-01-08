import logo from "../images/Vector.svg"; // Путь к изображению внутри сборки
import React from "react";

class Header extends React.Component {
  links; //Array of links
  constructor(props) {
    super(props);
    this.links = props.links;
  }
  render() {
    return (
      <header className="header">
        <img className="header__logo" alt="Надпись Место Россия" src={logo} />
        <div className="header__links">
          {this.links &&
            this.links.map((l) => {
              return (
                <a key={l.text} className="header__link" href={l.src}>
                  {l.text}
                </a>
              );
            })}
        </div>
      </header>
    );
  }
}

export default Header;
