import logo from "../images/logo.svg";
import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  let { email } = props.userData || {};
  return (
    <header className="header">
      <img
        src={logo}
        alt="Логотип проекта с надписью Mesto Russia"
        className="header__logo"
      />
      <div className="header__info">
        <p className="header__email">{email}</p>
        <Link
          onClick={props.onClick}
          to={props.toLink}
          className="header__link"
        >
          {props.nameLink}
        </Link>
      </div>
    </header>
  );
}

export default Header;
