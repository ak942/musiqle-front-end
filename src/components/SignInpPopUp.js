import {useState, useEffect} from "react";
import './signinpopup.css'

const SignInpPopUp = ({closeCallBack, findUser}) => {
    const [user, setUser] = useState("")
    const handleSubmit = (event) => {
        event.preventDefault()
        findUser(user)
        setUser("")
        closeCallBack()
    }

    const handleChange = (event) => {
        setUser(event.target.value);
    };

    return (
    <div className="modal">
        <div className="modal_content">
            <span className="close" onClick = {closeCallBack}>
                &times;
            </span>
            <form className="user-form">
                <h3 className="header">LOGIN</h3>
                <h4>Enter Your Name</h4>
                <input
                        type="text"
                        name="answer"
                        value={user}
                        onChange={handleChange}
                        placeholder='write your name here'
                        className="popup-input"
                        />
                <br />
                <h6>If you are a new user, register your name to save your progress</h6>
                <button
                    className="enter-submit-btn"
                    onClick={handleSubmit}
                    >
                    Enter
                </button>
            </form>
        </div>
    </div>
    );
}


export default SignInpPopUp;