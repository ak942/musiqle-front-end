import React from 'react'
// import Select from 'react-select'
import './Dropdown.css'

const Dropdown = ({ genreOptions, genreChanged, selectedGenre, playlistOptions, selectedPlaylist, playlistChanged }) => {
    
    const genreDropDownChanged = e => {
        genreChanged(e.target.value)
    }

    const playlistDropDownChanged = e => {
        playlistChanged(e.target.value)
    }

    const playlistButton = () => {
        
    }

    const showPlaylistButton = selectedGenre !== '' ? playlistButton() : selectedGenre

    return (
        <div className="dropdown-container">
            <h3>First, pick a genre...</h3>
            <select 
                className="dropdown"
                value={selectedGenre} 
                onChange={genreDropDownChanged}
            >
                <option key={0}>
                    Select a Genre
                </option>
                {genreOptions.map((item, idx) => 
                    <option key={idx + 1} value={item.id}>
                        {item.name}
                    </option>
                )}
            </select>
            {showPlaylistButton}
            <h3>Now, pick a playlist...</h3>
            <select 
                className="dropdown"
                value={selectedPlaylist} 
                onChange={playlistDropDownChanged}
            >
                <option key={0}>
                    Select a Playlist
                </option>
                {playlistOptions.map((item, idx) => 
                    <option key={idx + 1} value={item.id}>
                        {item.name}
                    </option>
                )}
            </select>
        </div>
    )
}

export default Dropdown