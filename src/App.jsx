// src/App.jsx
import React, { useState } from 'react';
import OrgChart from './components/OrgChart/OrgChart';
import './styles/App.css'; // Импортируем стили

const App = () => {
    const [employees, setEmployees] = useState([
        { id: 1, name: 'Иван Иванов', position: 'Менеджер', role: 'Руководитель проекта', managerId: null },
        { id: 2, name: 'Петр Петров', position: 'Разработчик', role: 'Frontend', managerId: 1 },
        { id: 3, name: 'Светлана Сидорова', position: 'Дизайнер', role: 'UI/UX', managerId: 1 },
        { id: 4, name: 'Алексей Смирнов', position: 'Разработчик', role: 'Backend', managerId: 2 },
        // ... добавьте других сотрудников
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [searchCriteria, setSearchCriteria] = useState({
        name: true,
        position: true,
        role: true,
    });

    const [newEmployee, setNewEmployee] = useState({
        name: '',
        position: '',
        role: '',
        managerId: '',
    });

    const handleCheckboxChange = (e) => {
        setSearchCriteria({
            ...searchCriteria,
            [e.target.name]: e.target.checked,
        });
    };

    const filteredEmployees = employees.filter(employee => {
        return (
            (searchCriteria.name && employee.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (searchCriteria.position && employee.position.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (searchCriteria.role && employee.role.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });

    const handleInputChange = (e) => {
        setNewEmployee({
            ...newEmployee,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddEmployee = (e) => {
        e.preventDefault();
        if (newEmployee.name && newEmployee.position && newEmployee.role) {
            setEmployees([
                ...employees,
                { id: employees.length + 1, ...newEmployee },
            ]);
            setNewEmployee({ name: '', position: '', role: '', managerId: '' }); // Сброс формы
        }
    };

    const handleDeleteEmployee = (id) => {
        setEmployees(employees.filter(employee => employee.id !== id));
    };

    return (
        <div className="App">
            <h1>Организационная структура</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Поиск"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <div className="criteria">
                    <label>
                        <input
                            type="checkbox"
                            name="name"
                            checked={searchCriteria.name}
                            onChange={handleCheckboxChange}
                        />
                        По имени
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="position"
                            checked={searchCriteria.position}
                            onChange={handleCheckboxChange}
                        />
                        По должности
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="role"
                            checked={searchCriteria.role}
                            onChange={handleCheckboxChange}
                        />
                        По роли
                    </label>
                </div>
            </div>

            <form onSubmit={handleAddEmployee} className="add-employee-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Имя"
                    value={newEmployee.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="position"
                    placeholder="Должность"
                    value={newEmployee.position}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="role"
                    placeholder="Роль"
                    value={newEmployee.role}
                    onChange={handleInputChange}
                    required
                />
                <select
                    name="managerId"
                    value={newEmployee.managerId}
                    onChange={handleInputChange}
                >
                    <option value="">Выберите руководителя</option>
                    {employees.map(employee => (
                        <option key={employee.id} value={employee.id}>
                            {employee.name} ({employee.position})
                        </option>
                    ))}
                </select>
                <button type="submit">Добавить сотрудника</button>
            </form>

            <OrgChart employees={filteredEmployees} onDelete={handleDeleteEmployee} />
        </div>
    );
};

export default App;