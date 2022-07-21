import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(card) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonDisplay = `${isOwn ? "inline-block" : "none"}`;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? "element__like-button_active" : ""
  }`;
  function handleClick() {
    card.onCardClick(card);
  }

  function handleLikeClick() {
    card.onCardLike(card);
  }

  function handleDeleteClick() {
    card.onCardDelete(card);
  }

  return (
    <article className="element__card">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__caption">
        <p className="element__title">{card.name}</p>
        <div className="element__like-group">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Поставить лайк"
            onClick={handleLikeClick}
          />
          <span className="element__like-count">{card.likes.length}</span>
        </div>
      </div>
      <button
        className="element__delete-button"
        type="button"
        aria-label="Удалить карточку"
        onClick={handleDeleteClick}
        style={{ display: cardDeleteButtonDisplay }}
      />
    </article>
  );
}

export default Card;
