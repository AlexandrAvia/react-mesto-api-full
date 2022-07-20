import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const linkAvatar = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: linkAvatar.current.value,
    });
  }

  React.useEffect(() => {
    linkAvatar.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      name="avatar"
      title="Обновить аватар"
      buttonText=" Сохранить"
    >
      <div className="popup__fieldset">
        <input
          className="popup__input popup__input_form_avatar"
          name="avatar"
          placeholder="Ссылка на аватар"
          type="url"
          defaultValue=""
          required=""
          id="avatar"
          ref={linkAvatar}
        />
        <span className="popup__error avatar-error" />
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
