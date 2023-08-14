import React from 'react'
import ScorePage from './ScorePage'
import './signinpopup.css'
import StreakPage from './StreakPage'

const AllPlayerStats = ({ closeStats, allData }) => {



    const playerScoreComponents = allData.map(player => {
        return (
            <div>
                <ScorePage
                    userName={player.name}
                    userScore={player.bestOverallScore}
                />
            </div>
        )
    })

    const playerStreakComponents = allData.map(player => {
        return (
            <div>
                <StreakPage 
                    userName={player.name}
                    userScore={player.longestStreak}
                />
            </div>
        )
    })

    // const showScores = () => {
    //     if (allData) {
    //         return { playerScoreComponents }
    //     } else {
    //         return (<p>No stats available</p>)
    //     }
    // }

    return (
        <div className="modal">
            <div className="modal_content">
                <span className="close" onClick={closeStats}>
                    &times;
                </span>
                <h2 className='stats-header'>All Players' Stats</h2>
                <section className='stats-container'>
                    {playerScoreComponents}
                </section>
            </div>
        </div>
    )
}


export default AllPlayerStats