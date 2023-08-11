import React from 'react'
import './deleteuser.css'

const DeleteUser = ({userData, closeDeleteUser, deleteUser}) => {
    return (
    <div className="modal">
        <div className="delete-modal">
            <span className="close" onClick = {closeDeleteUser}>
                &times;
            </span>
            <h2>Are you sure you want to delete {userData.name.charAt(0).toUpperCase() + userData.name.slice(1)}? </h2>
            <button className = 'delete-btn' onClick={deleteUser}>Yes</button>
            <button className= 'delete-btn' onClick ={closeDeleteUser}>No</button>
        </div>
    </div>
    )
}

export default DeleteUser
