import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo"/>
      <div className="header__conteiner">
        {props.buttonName==="Выйти"&&<p className="header__email">{props.userEmail}</p>}
        {props.buttonName==="Выйти"?<button className="header__button header__button_grey" onClick = {props.onClick}>{props.buttonName}</button>:<Link to={props.toLink} className="header__button">{props.buttonName}</Link>}
      </div>

    </header>
  )
}
export default Header;