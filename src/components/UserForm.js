import React from 'react'
import { useState } from 'react'

const UserForm = () => {

    const [user, setUser] = useState("")
    const handleSubmit = (event) => {
        event.preventDefault()

        setUser("")
    }

    const handleChange = (event) => {
        setUser(event.target.value);
    };

    return (
        <div>
            <form id="answer" onSubmit={handleSubmit}>
                <div className="create-user">
                    <input
                        type="text"
                        name="answer"
                        value={user}
                        onChange={handleChange}
                        className="input-form"
                        placeholder='Type Here'
                        required
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="circular"
                        onClick={handleSubmit}
                    >
                        Enter
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UserForm