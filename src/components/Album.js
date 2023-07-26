import React from 'react';
import "./Album.css"

const Album = ({ name, url, attempts = 4 }) => {

    return (
        <div className="center game">
            <h1>Guess the Album</h1>
            <p>Attempts Left: {attempts}</p>
            <img className="blur size image" src={url} alt="album cover" />
            <form>
                <input placeholder="Type here"></input>
                <button className="circular">Enter</button>
            </form>
        </div>
    )
}

export default Album;