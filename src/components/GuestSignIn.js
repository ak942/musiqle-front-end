import { useState } from 'react'
import Popup from 'reactjs-popup'
import './guestsignin.css'

const GuestSignIn = () => {

    const [user, setUser] = useState("")
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(user)
        setUser("")
    }

    const handleChange = (event) => {
        setUser(event.target.value);
    };

    return (
        <div className="popup-container">
            <Popup trigger=
                {<button className="circular signin"> Sign In As Guest </button>}
                position="left down">
                <div className="user-submit-container">
                    <input
                        type="text"
                        name="answer"
                        value={user}
                        onChange={handleChange}
                        className="score-input-form"
                        placeholder='username'
                        required
                    />
                    <button
                        type="submit"
                        className="user-submit-btn"
                        onClick={handleSubmit}
                        >
                        Enter
                    </button>
                </div>
            </Popup>            
        </div>
    )
}

export default GuestSignIn