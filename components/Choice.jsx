"use client"

import './Choice.css';
// Import your CSS file here

const Choice = () => {
    const handleAdminClick = () => {
        // Navigate to the admin page
        window.location.href = "/admin";
    };

    const handleUserClick = () => {
        // Navigate to the user page
        window.location.href = "/map_user";
    };

    return (
        <div className="cent">
            <div className="choice">
                {/* Button for Admin */}
                <button className="admin" onClick={handleAdminClick}>
                    Admin
                </button>

                {/* Button for User */}
                <button className="user" onClick={handleUserClick}>
                    User
                </button>
            </div></div>
    );
}

export default Choice;
