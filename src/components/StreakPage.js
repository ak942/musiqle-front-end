import React from 'react'

const StreakPage = ({ userName, userStreak }) => {
    return (
        <div>
            <span>
                Player: {userName}
            </span>
            <span>
                Best Score: {userStreak}
            </span>
        </div>
    )
}

export default StreakPage