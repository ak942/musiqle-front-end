import React from 'react'

const Stats = ({closeStats, userData}) => {

    return (
    <div className="modal">
        <div className="modal_content">
            <span className="close" onClick = {closeStats}>
                &times;
            </span>
            <h2>Statistics For {userData.name} </h2>
            <section>
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
