import PropTypes from 'prop-types';
import albuminfo from "../dummy_data_album.json"


const InputForm = ({ name, attempts, setAttempts, num, setNum, inputAnswer, setInputAnswer, getRandomAlbum, setRandomAlbum }) => {
    const handleSubmit = (event) => {
        event.preventDefault()

        if (inputAnswer.trim().toLowerCase() === name.toLowerCase()) {
            setInputAnswer('')
            console.log("Correct")
        } else {
            setAttempts(
                attempts--
            )
            setNum(
                num = num - 2
            )
            console.log("Incorrect!")
        }
    }

    const handleChange = (event) => {
        setInputAnswer(event.target.value);
    };


    return (
        <div className="amswer-box">
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
                </div>

            </form>
        </div>
    )
}

InputForm.propTypes = {
    inputAnswer: PropTypes.func.isRequired
};

export default InputForm;
