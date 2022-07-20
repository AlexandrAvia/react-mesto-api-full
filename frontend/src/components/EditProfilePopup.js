import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
    >
      <div className="popup__fieldset">
        <input
          type="text"
          className="popup__input popup__input_form_name"
          name="name"
          placeholder="Имя"
          required=""
          minLength={2}
          maxLength={40}
          id="name"
          value={name || ""}
          onChange={handleNameChange}
        />
        <span className="popup__error name-error" />
      </div>
      <div className="popup__fieldset">
        <input
          type="text"
          className="popup__input popup__input_form_profession"
          name="profession"
          placeholder="Профессия"
          required=""
          minLength={2}
          maxLength={200}
          id="proffesion"
          value={description || ""}
          onChange={handleDescriptionChange}
        />
        <span className="popup__error proffesion-error" />
      </div>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
