import React from "react";
import './spotifypopup.css'

const SpotifyPopUp = ({closeCallBack}) => {

    return (
    <div className="modal">
        <div className="modal_content">
            <span className="close" onClick = {closeCallBack}>
                &times;
            </span>
            <form className="user-form">
                <h3 className="header">Sign In</h3>
                <input type="text" name="name" placeholder="name" className="popup-input"/>
                <br />
                <button
                    className="spotify-submit-btn"
                    // onClick={handleSubmit}
                    >
                    Enter
                </button>
            </form>
        </div>
    </div>
    );
}


export default SpotifyPopUp;