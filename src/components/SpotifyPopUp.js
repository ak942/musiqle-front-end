import {useState} from "react";
import './spotifypopup.css'

const SpotifyPopUp = ({closeCallBack, findUser}) => {
    const [user, setUser] = useState("")
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(user)
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
                <h3 className="header">Sign In</h3>
                <input
                        type="text"
                        name="answer"
                        value={user}
                        onChange={handleChange}
                        placeholder='username'
                        required
                        className="popup-input"/>
                <br />

                <button
                    className="spotify-submit-btn"
                    onClick={handleSubmit}
                    >
                    Enter
                </button>
            </form>
        </div>
    </div>
    );
}


export default SpotifyPopUp;