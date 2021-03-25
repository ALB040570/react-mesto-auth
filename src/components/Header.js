import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo"/>
      {props.buttonName==="Выйти"?<button className="header__button" onClick = {props.onClick}>{props.buttonName}</button>:<Link to={props.toLink} className="header__button">{props.buttonName}</Link>}
    </header>
  )
}
export default Header;