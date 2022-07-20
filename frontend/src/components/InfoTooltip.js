import successImage from "../images/successImage.svg";
import errorImage from "../images/ErorrImage.svg";
import React from "react";

export default function InfoTooltip({ onClose, isOpen, succes }) {
  const successMessage = "Вы успешно зарегистрировались!";
  const errorMessage = "Что-то пошло не так! Попробуйте еще раз.";
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container_info">
        <button className="popup__close" type="reset" onClick={onClose} />
        <div
          className="popup__info-image"
          style={{
            backgroundImage: succes
              ? `url(${successImage})`
              : `url(${errorImage})`,
          }}
        ></div>
        <h2 className="popup__info-title">
          {succes ? successMessage : errorMessage}
        </h2>
      </div>
    </div>
  );
}
