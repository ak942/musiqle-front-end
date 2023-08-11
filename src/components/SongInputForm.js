import { useState } from 'react'
// import PropTypes from 'prop-types'

const SongInputForm = ({ compareInput, skipSong, giveAnswer }) => {

    const [inputAnswer, setInputAnswer] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        compareInput(inputAnswer)
        setInputAnswer('')
    }

    const handleSkip = (event) => {
        event.preventDefault()
        skipSong()
    }

    const handleChange = (event) => {
        giveAnswer ? setInputAnswer(giveAnswer) : setInputAnswer(event.target.value);
    };

    return (
        <div className="answer-box">
            <form id="answer" onSubmit={handleSubmit}>
                <div className="answer-input">
                    <input
                        type="text"
                        name="answer"
                        value={inputAnswer}
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
                    <button
                        className="circular"
                        onClick={handleSkip}
                    >
                        Skip
                    </button>
                </div>
            </form>
        </div>
    )
}

// SongInputForm.propTypes = {
//     // compareInput: PropTypes.func.isRequired,
//     // giveAnswer: PropTypes.func
// };

export default SongInputForm;
