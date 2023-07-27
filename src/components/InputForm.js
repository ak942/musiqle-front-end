import React, { useState } from 'react';
import PropTypes from 'prop-types';


const InputForm = ({ inputAnswer }) => {
    const [formFields, setFormFields] = useState({
        answer: ''
    });

    const onFormSubmit = (event) => {
        event.preventDefault()

        inputAnswer(formFields)
        setFormFields({
            'answer': ''
        })
    }

    const onAnswerChange = (event) => {
        setFormFields({
            ...formFields,
            answer: event.target.value
        })
    };


    return (
        <div className="amswer-box">
            <form id="answer" onSubmit={onFormSubmit}>

                <div className="answer-input">
                    <input
                        name="answer"
                        value={formFields.answer}
                        onChange={onAnswerChange}
                        className="input-form"
                        placeholder='Type Here'
                        required
                    />
                </div>

                <div>
                    <button className="circular">
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
