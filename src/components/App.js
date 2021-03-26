import Main from './Main.js';
import api from '../utils/api.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import {useState, useEffect} from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [userData,setUserData] = useState({
    email: ''
    });
  const history = useHistory();
  const[isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const[TypeInfo, setTypeInfo] = useState(null);
  const[currentUser, setCurrenUser]=useState({name: '', about: '', avatar: ''});
  const[isEditProfilePopupOpen,handleEditProfileClick] = useState(false);
  const[isAddPlacePopupOpen,handleAddPlaceClick] = useState(false);
  const[isEditAvatarPopupOpen,handleEditAvatarClick] = useState(false);
  const[selectedCard,handleCardClick]=useState(null);
  const[cards, setCards]=useState([]);


  useEffect(()=>{
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn, history])


  useEffect(()=>{
    const cardsFromSer= api.getCards();
    cardsFromSer
      .then((cardsFromSer) => {
        setCards(cardsFromSer);
      })
      .catch((err) => {console.log(err);});
    },[]);

  useEffect(()=>{
    const userInfoFromServer = api.getUsersInfo();
    userInfoFromServer
    .then((userInfo) => {
      setCurrenUser(userInfo);
      })
    .catch((err) => {console.log(err);});
  },[]);

  const onSignOut =() => {

    setLoggedIn(false);
    localStorage.removeItem('jwt');
  }

  const onLogin = (email, password) => {
    api
      .authorize(email, password)
      .then((data) => {
        if (data.token){
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          setInfoTooltipOpen(false);
          setUserData({email: email})
        }
        if (data.statusCode===400){
          setInfoTooltipOpen(true);
          setTypeInfo('fail');
          throw new Error ('не передано одно из полей');
        }
      })
      .catch((err) => {
        console.log('пользователь с email не найден');
        setInfoTooltipOpen(true);
        setTypeInfo('fail');
      });
  }

  const onRegister = (email, password) =>{
    api
      .register(email, password).then((res) => {
        if (res.statusCode !== 400) {
          history.push('/sing-in');
        }else {
          throw new Error ('Что-то пошло не так!');
        }
        console.debug(res);
        setInfoTooltipOpen(true);
        setTypeInfo('success');
      })
      .catch((e) => console.log());
  }
  useEffect(()=>{

      const jwt = localStorage.getItem('jwt');
      if (jwt){
        api
          .getContent(jwt)
          .then((res) => {

            if (res){
              setUserData({
                email: res.data.email
              })
              setLoggedIn(true);
            }
          })
          .catch (e=>console.error(e))
        } else {
          setLoggedIn(false);
        }

  },[])





  if (loggedIn===null) {
    return 'Загрузка...'
  }


    //ставит или удаляет лайки
  const handleCardLike=(card) =>{
    //  проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
    // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
    const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    })
    .catch((err) => {console.log(err);});
  }

  //handleCardDelete удаляет карточку
  const handleCardDelete=(card) =>{
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.deleteCard(card._id).then((newCard) => {
    // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
    const newCards = cards.filter((c,i,cards) => c._id !== card._id ? newCard : false);
      // Обновляем стейт
      setCards(newCards);
    })
    .catch((err) => {console.log(err);});
  }




  function closeAllPopups() {
    handleEditProfileClick(false);
    handleAddPlaceClick(false);
    handleEditAvatarClick(false);
    handleCardClick(null);
    setInfoTooltipOpen(false);
  }

  const handleUpdateUser=(data)=> {
    const userInfoFromForm = api.patchUsersInfo(data);
    userInfoFromForm
    .then((userInfo) => {
      setCurrenUser(userInfo);
      closeAllPopups();
      })
    .catch((err) => {console.log(err);});

  }

  const handleUpdateAvatar=(data)=> {
    const avatarFromForm = api.patchAvatar(data);
    avatarFromForm
    .then((userInfo) => {
      setCurrenUser(userInfo);
      closeAllPopups();
      })
    .catch((err) => {console.log(err);});

  }

  const handleAddPlaceSubmit=(data)=> {
    const cardFromForm = api.postCard(data);
    cardFromForm
    .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
    .catch((err) => {console.log(err);});

  }

  return (

    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <ProtectedRoute exact path="/"
          loggedIn={loggedIn}
          userEmail={userData.email}
          component={Main}
          onSignOut={onSignOut}
          onEditProfile={()=>{handleEditProfileClick(true)}}
          onAddPlace={()=>{handleAddPlaceClick(true)}}
          onEditAvatar={()=>{handleEditAvatarClick(true)}}
          onCardClick={selectedCard=>handleCardClick(selectedCard)}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          />

        <Route path="/sign-in">
          <Login  onLogin={onLogin}
          data={userData}
          />

        </Route>

        <Route path="/sign-up">
          <Register onRegister = {onRegister}/>
        </Route>

        <Route>
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
        </Route>

      </Switch>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onUpdateCards={handleAddPlaceSubmit}
        />

      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        TypeInfo={TypeInfo}
        onClose={closeAllPopups}
        />



    </CurrentUserContext.Provider>

  );
}

export default App;


