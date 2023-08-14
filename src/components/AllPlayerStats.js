import React from 'react'
import ScorePage from './ScorePage'
import './signinpopup.css'

const AllPlayerStats = ({ closeStats, allData }) => {

    const [page, setPage] = React.useState(1)
    
    const nextStats = () => {
        if (page !== 5) {
            setPage(page + 1)
        }
    }

    const prevStats = () => {
        if (page !== 1) {
            setPage(page - 1)
        }
    }

    const showPage = () => {
        if (page === 1) {
            return {playerScoreComponents}
        } else if (page === 2) {
            return {playerStreakComponents}
        } else if (page === 3) {
            return {playerTotalScoreComponents}
        } else if (page === 4) {
            return {playerAlbumScoreComponents}
        } else if (page === 5) {
            return {playerSongScoreComponents}
        }
    }

    const playerScoreComponents = allData.map(player => {
        return (
            <div>
                <ScorePage
                    statType={"Best Score"}
                    userName={player.name}
                    userScore={player.bestOverallScore}
                />
            </div>
        )
    })

    const playerStreakComponents = allData.map(player => {
        return (
            <div>
                <ScorePage
                    statType={"Longest Streak"}
                    userName={player.name}
                    userScore={player.longestStreak}
                />
            </div>
        )
    })

    const playerTotalScoreComponents = allData.map(player => {
        return (
            <div>
                <ScorePage
                    statType={"Total Score"}
                    userName={player.name}
                    userScore={player.totalScore}
                />
            </div>
        )
    })

    const playerAlbumScoreComponents = allData.map(player => {
        return (
            <div>
                <ScorePage
                    statType={"Best Album Score"}
                    userName={player.name}
                    userScore={player.bestScoreAlbum}
                />
            </div>
        )
    })

    const playerSongScoreComponents = allData.map(player => {
        return (
            <div>
                <ScorePage
                    statType={"Best Song Score"}
                    userName={player.name}
                    userScore={player.bestSongAlbum}
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