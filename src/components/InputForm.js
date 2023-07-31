import PropTypes from 'prop-types';
import { useState } from 'react';


const InputForm = ({ compareInput, giveAnswer }) => {

    const [inputAnswer, setInputAnswer] = useState("")
    const handleSubmit = (event) => {
        event.preventDefault()

        compareInput(inputAnswer)
        setInputAnswer('')
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
                    <button className="circular">Skip</button>
                </div>
            </form>
        </div>
    )
}

InputForm.propTypes = {
    inputAnswer: PropTypes.func.isRequired
};

export default InputForm;
