import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router-dom";
import * as auth from "../utils/Auth";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [InfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState();
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getProfile(), api.getInitialCards()])
        .then(([userData, card]) => {
          setCurrentUser(userData);
          setCards(card);
        })
        .catch(console.log);
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setInfoTooltipPopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function handleUpdateUser({ name, about }) {
    api
      .editProfile(name, about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .avatarUpdate(data.avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit({ title, link }) {
    api
      .addCard(title, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleRegister = ({ email, password }) => {
    return auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setIsRegistrationSuccess(true);
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsRegistrationSuccess(false);
      })
      .finally(() => {
        setInfoTooltipPopupOpen(true);
      });
  };

  const handleLogin = ({ email, password }) => {
    return auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setIsRegistrationSuccess(true);
          localStorage.setItem("token", data.token);
          tokenCheck();
        }
      })
      .catch((err) => {
        console.log(err);
        setIsRegistrationSuccess(false);
      })
  };

  const tokenCheck = () => {
    let jwt = localStorage.getItem("token");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            let userData = {
              email: res.email,
            };

            setLoggedIn(true);
            setUserData(userData);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUserData(null);
    history.push("/sign-in");
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn, history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Header
              onClick={signOut}
              nameLink="Выйти"
              userData={userData}
              toLink="/sign-up"
            />
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </ProtectedRoute>
          <Route path="/sign-in">
            <Header toLink="/sign-up" nameLink="Регистрация" />
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Header toLink="/sign-in" nameLink="Войти" />
            <Register handleRegister={handleRegister} />
          </Route>
          <Route path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
        {/* popup profile edit */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        {/* popup add gallery card  */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        {/* popup avatar update */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        {/* InfoTooltip popup */}
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={InfoTooltipPopupOpen}
          succes={isRegistrationSuccess}
        />
        {/* popup big photo */}
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        {/* popup with confirmation */}
        {/* <article className="popup popup_type_confirmation">
        <div className="popup__container">
          <h2 className="popup__title popup__title_confirmation">
            Вы уверены?
          </h2>
          <button className="popup__close" type="reset" />
          <form
            className="popup__form popup__form_confirmation"
            name="form__confirmation"
          >
            <button
              className="popup__submit popup__submit_confirmation"
              type="submit"
            >
              Да
            </button>
          </form>
        </div>
      </article> */}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
