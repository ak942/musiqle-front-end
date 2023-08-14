import React from 'react'
import './Dropdown.css'

const Dropdown = ({ options, changed, selected, callBack, defaultValueName}) => {

    const dropdownChanged = e => {
        changed(e.target.value)
        callBack()
    }

    const dropdownOptions = (options.length > 0) ?
        options.map((item, idx) =>
            <option key={idx} value={item.id}>
                {item.name}
            </option>)
        : <option>
            No options available
        </option>

    return (
        <div className="dropdown-container">
            <select
                className="dropdown"
                value={selected}
                onChange={dropdownChanged}
            >   
                {defaultValueName()}
                {dropdownOptions}
            </select>
        </div>
    )
}

export default Dropdown