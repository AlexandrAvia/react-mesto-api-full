import React from "react";
import { useState } from "react";

export default function Login({ handleLogin }) {
  const [formParams, setFormParams] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleLogin({
      email: formParams.email,
      password: formParams.password,
    });
  };
  return (
    <>
      <div className="form">
        <div className="form__container">
          <h2 className="form__title">Вход</h2>
          <form className="form__form" onSubmit={handleSubmit}>
            <div className="form__fieldset">
              <input
                className="form__input"
                type="email"
                name="email"
                aria-label="Электронная почта"
                placeholder="Email"
                required
                onChange={handleChange}
                value={formParams.email}
              />
            </div>
            <div className="form__fieldset">
              <input
                className="form__input"
                type="password"
                name="password"
                aria-label="Пароль"
                placeholder="Пароль"
                minLength="5"
                maxLength="15"
                required
                value={formParams.password}
                onChange={handleChange}
              />
              <span className="popup__error proffesion-error" />
            </div>
            <button type="submit" className="form__save-button">
              Войти
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
