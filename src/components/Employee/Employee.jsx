// src/components/Employee/Employee.jsx
import React from 'react';
import './Employee.css'; // Импортируем стили

const Employee = ({ employee }) => {
    return (
        <div className="employee">
            <h3>{employee.name}</h3>
            <p>Должность: {employee.position}</p>
            <p>Роль в проекте: {employee.role}</p>
        </div>
    );
};

export default Employee;