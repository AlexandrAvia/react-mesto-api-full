import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [nameCard, setNameCard] = React.useState("");
  const [link, setLink] = React.useState(" ");

  function handleChangeName(e) {
    setNameCard(e.target.value);
  }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({ title: nameCard, link });
  }

  React.useEffect(() => {
    if (props.isOpen) {
      setNameCard("");
      setLink("");
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      name="gallery"
      title="Новое место"
      buttonText="Создать"
    >
      <div className="popup__fieldset">
        <input
          type="text"
          className="popup__input popup__input_form_image-title"
          name="place"
          placeholder="Название"
          required=""
          minLength={2}
          maxLength={30}
          id="place-name"
          onChange={handleChangeName}
          value={nameCard}
        />
        <span className="popup__error place-name-error" />
      </div>
      <div className="popup__fieldset">
        <input
          className="popup__input popup__input_form_image-src"
          name="url"
          placeholder="Ссылка на картинку"
          type="url"
          required=""
          id="place-url"
          onChange={handleChangeLink}
          value={link}
        />
        <span className="popup__error place-url-error" />
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
