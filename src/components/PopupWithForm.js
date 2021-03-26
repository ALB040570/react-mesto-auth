import Form from "./Form";

function PopupWithForm(props) {
    return(
        <div className={props.isOpen? 'popup popup_opened': 'popup'} id={props.id}>
        <div className="popup__grid">
          <button type="button" className="popup__close" onClick={props.onClose}/>
          <Form
            name={props.name}
            onSubmit={props.onSubmit}
            title={props.title}
            children={props.children}
            id= {props.id}
          />
        </div>
      </div>
    )
}
export default PopupWithForm;
//