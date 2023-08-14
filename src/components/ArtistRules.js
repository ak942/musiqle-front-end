import React from 'react'

const ArtistRules = ({ closeCallBack }) => {
    return (
        <div className="modal">
            <div className="modal_content">
                <span className="close" onClick={closeCallBack}>
                    &times;
                </span>
                <br></br>
                <h2 className="header green">RULES</h2>
                <h5>You can select a Genre and Playlist or use our default playlist. <i>(Must hit RESET after selection)</i></h5>
                <h5>You will have 4 chances to guess the ARTIST of the shown album. <i>(Not case-sensitive and only alpha-characters)</i></h5>
                <h5>Album cover will be blurred and will decrease in blur for every wrong guess.</h5>
                <h5>Score and streak will reset if SKIPPED or not guessed correctly.</h5>
            </div>
        </div>
    )
}

export default ArtistRules