import React from 'react'
// import Select from 'react-select'
import './Dropdown.css'

const Dropdown = ({ options, changed, selected }) => {

    const dropdownChanged = e => {
        changed(e.target.value)
    }

    return (
        <div className="dropdown-container">
            <select
                className="dropdown"
                value={selected}
                onChange={dropdownChanged}
            >
                {options.map((item, idx) =>
                    <option key={idx} value={item.id}>
                        {item.name}
                    </option>
                )}
            </select>
        </div>
    )
}

export default Dropdown