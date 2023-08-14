import React from 'react'

const SongRules = ({ closeCallBack }) => {
    return (
        <div className="modal">
            <div className="modal_content">
                <span className="close" onClick={closeCallBack}>
                    &times;
                </span>
                <br></br>
                <h3 className="header green">RULES</h3>
                <h5>You can select a Genre and Playlist or use our default playlist. <i>(Must hit RESET after selection)</i></h5>
                <h5>You will have 4 chances to guess the SONG TITLE. <i>(Not case-sensitive and only alpha-characters)</i></h5>
                <h5>You will start with one line of lyrics and gain 1 additional line for every wrong guess.</h5>
                <h5>Score and streak will reset if SKIPPED or not guessed correctly.</h5>
            </div>
        </div>
    )
}

export default SongRules