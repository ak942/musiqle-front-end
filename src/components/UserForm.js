import { useState } from 'react'
import Popup from 'reactjs-popup'
import './userform.css'

const UserForm = () => {

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
                {<button className="score-btn"> Submit Score </button>}
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

export default UserForm