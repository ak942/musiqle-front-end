import React from 'react'
import './signinpopup.css'

const Stats = ({closeStats, userData}) => {

    return (
    <div className="modal">
        <div className="modal_content">
            <span className="close" onClick = {closeStats}>
                &times;
            </span>
            <h2 className='stats-header'>Statistics For {userData.name.charAt(0).toUpperCase() + userData.name.slice(1)} </h2>
            <section className='stats-container'>
                <h5>Total Score Accumulated: {userData.totalScore}</h5>
                <h5>Best Overall Score: {userData.bestOverallScore}</h5>
                <h5>Streak: {userData.streak}</h5>
                <h5>Longest Streak: {userData.longestStreak}</h5>
                <h5>Best Score From Album: {userData.bestScoreAlbum}</h5>
                <h5>Best Score From Song: {userData.bestScoreSong}</h5>
            </section>
        </div>
    </div>
    );
}


export default Stats
