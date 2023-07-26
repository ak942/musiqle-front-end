import React from 'react';
import songinfo from "../dummy_data.json"
import "./Album.css"

const Album = ({ attempts = 0 }) => {

    return (
        <div className="center game">
            <h1>Guess the Album</h1>
            <p>Attempts Left: {attempts}</p>
            <img className="blur size image" src={songinfo[0].album.images[0].url} alt="album cover" />
            <form>
                <input></input>
                <button className="circular">Enter</button>
            </form>
        </div>
    )
}

export default Album;