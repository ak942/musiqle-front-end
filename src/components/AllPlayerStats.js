import React from 'react'
import ScorePage from './ScorePage'
import './AllPlayerStats.css'

const AllPlayerStats = ({ closeStats, allData }) => {

    const [page, setPage] = React.useState(1)

    const nextStats = () => {
        if (page !== 5) {
            setPage(page + 1)
        } else if (page === 5) {
            setPage(1)
        }
    }

    const prevStats = () => {
        if (page !== 1) {
            setPage(page - 1)
        } else if (page === 1) {
            setPage(5)
        }
    }

    const showPage = () => {
        if (page === 1) {
            return (
                <div>
                    <h4 className="center">Best Scores:</h4>
                    {playerScoreComponents}
                </div>
            )
        } else if (page === 2) {
            return (
                <div>
                    <h4 className="center">Longest Streaks:</h4>
                    {playerStreakComponents}
                </div>
            )
        } else if (page === 3) {
            return (
                <div>
                    <h4 className="center">Total Scores:</h4>
                    {playerTotalScoreComponents}
                </div>
            )
        } else if (page === 4) {
            return (
                <div>
                    <h4 className="center">Best Artist Scores:</h4>
                    {playerArtistScoreComponents}
                </div>
            )
        } else if (page === 5) {
            return (
                <div>
                    <h4 className="center">Best Song Scores:</h4>
                    {playerSongScoreComponents}
                </div>
            )
        }
    }

    const sortData =(variable)=> { 
        const data = allData.map(player => {
            const dataObject= {"name": player.name}
            dataObject[variable] =player[variable]
            return dataObject})
        data.sort(function(a,b){
            return b[variable]-a[variable]
        })
        return data
    };

    const playerScoreComponents = sortData("bestOverallScore").slice(0,5).map(player => {
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

    const playerArtistScoreComponents = allData.map(player => {
        return (
            <div>
                <ScorePage
                    statType={"Best Artist Score"}
                    userName={player.name}
                    userScore={player.bestScoreArtist}
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
                    userScore={player.bestScoreSong}
                />
            </div>
        )
    })

    return (
        <div className="modal">
            <div className="modal_content">
                <span className="close" onClick={closeStats}>
                    &times;
                </span>
                <span className="page-arrow left-arrow" onClick={prevStats}>
                    {"←"} Previous
                </span>
                <h2 className='stats-header'>All Players' Stats</h2>
                <section className='stats-container'>
                    {showPage()}
                </section>
                <span className="page-arrow right-arrow" onClick={nextStats}>
                    Next {"→"}
                </span>
            </div>
        </div>
    )
}


export default AllPlayerStats