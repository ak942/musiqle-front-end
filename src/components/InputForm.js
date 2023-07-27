import PropTypes from 'prop-types';


const InputForm = ({ albumName, inputAnswer, setInputAnswer }) => {
    const handleSubmit = (event) => {
        event.preventDefault()

        if (inputAnswer.trim().toLowerCase() === albumName.toLowerCase()) {
            setInputAnswer('')
            console.log("Correct!")
        } else {
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
