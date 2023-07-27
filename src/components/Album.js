import React from 'react';
import "./Album.css"
import InputForm from './InputForm';
import ScoreBoard from './ScoreBoard';

const Album = ({ name, url, attempts = 4, currentScore, totalScore, streak, inputAnswer, setInputAnswer }) => {

    // Get info from input form
    // while (attempts > 0) {
    //     if (answer !== name) {
    //         attempts--
    //     }
    // }



    return (
        <div className="center game">
            <h1>Guess the Album</h1>
            <ScoreBoard currentScore={currentScore} totalScore={totalScore} streak={streak} />
            <p>Attempts Left: {attempts}</p>
            <img className="blur size image" src={url} alt="album cover" />
            <InputForm albumName={name} inputAnswer ={inputAnswer} setInputAnswer={setInputAnswer} />
        </div>
    )
}

export default Album;