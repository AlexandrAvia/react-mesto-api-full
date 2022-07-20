function ImagePopup({ card, onClose }) {
  return (
    <article
      className={`popup popup_type_photo ${card.link && "popup_opened"}`}
    >
      <div className="popup__container popup__container_photo">
        <img src={card.link} alt={card.name} className="popup__image" />
        <p className="popup__image-title">{card.name}</p>
        <button
          className="popup__close popup__close_photo"
          onClick={onClose}
          type="reset"
        />
      </div>
    </article>
  );
}

export default ImagePopup;
