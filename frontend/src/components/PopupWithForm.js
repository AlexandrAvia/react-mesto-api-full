function PopupWithForm(props) {
  return (
    <article
      className={`popup popup_type_${props.name} ${
        props.isOpen && "popup_opened"
      }`}
    >
      <div className="popup__container">
        <button className="popup__close" type="reset" onClick={props.onClose} />
        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`popup__form popup__form_${props.name}`}
          name={props.name}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            className={`popup__submit popup__submit_${props.name}`}
            type="submit"
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </article>
  );
}

export default PopupWithForm;
