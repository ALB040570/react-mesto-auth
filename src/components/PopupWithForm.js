import { Link } from 'react-router-dom';
function PopupWithForm(props) {
    return(
        <div
          className={props.type==='auth'?'popup popup_auth popup_opened':(props.isOpen? 'popup popup_opened': 'popup')}
          id={props.id}>
        <div className="popup__grid">
          {props.type!=='auth'&& <button type="button" className="popup__close" onClick={props.onClose}/>}
          <form
            name={props.name}
            id = {props.name}
            onSubmit={props.onSubmit}
            className={props.type==='auth'?'popup__form popup__form_view': 'popup__form'}
            noValidate >
            <fieldset className="popup__fieldset">
              <legend className={props.type==='auth'? 'popup__title popup__title_black': 'popup__title'}>
                {props.title}
              </legend>
                {props.children}
              <button type="submit" className={props.type==='auth'? 'popup__button popup__button_white': 'popup__button'}>
                {(props.id==="yes")?"Да":props.type==='auth'?props.title:"Сохранить"}
              </button>
              {props.id==="register"&&<Link to="/sign-in" className="popup__button popup__button_sing_in">Уже зарегистрированы? Войти</Link>}
            </fieldset>
          </form>
        </div>
      </div>
    )
}
export default PopupWithForm;
//