// src/components/UserInfo/UserInfo.jsx
import React from 'react';
import './UserInfo.css'; // Импортируем стили

const UserInfo = ({ user, onClose }) => {
    return (
        <div className="user-info-overlay">
            <div className="user-info-card">
                <h2>{user.name}</h2>
                <p><strong>Должность:</strong> {user.position}</p>
                <p><strong>Роль:</strong> {user.role}</p>
                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default UserInfo;