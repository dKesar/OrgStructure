// src/components/OrgChart/OrgChart.jsx
import React, { useState } from 'react';
import Tree from 'react-d3-tree';
import UserInfo from '../UserInfo/UserInfo'; // Импортируем компонент UserInfo
import './OrgChart.css'; // Импортируем стили

const OrgChartComponent = ({ employees, onDelete }) => {
    const [selectedUser, setSelectedUser] = useState(null); // Состояние для выбранного пользователя

    const getTreeData = (employees) => {
        const tree = {};
        employees.forEach(employee => {
            tree[employee.id] = { ...employee, children: [] };
        });
        employees.forEach(employee => {
            if (employee.managerId) {
                tree[employee.managerId].children.push(tree[employee.id]);
            }
        });
        return Object.values(tree).filter(node => !node.managerId);
    };

    const treeData = getTreeData(employees);

    const renderNode = (nodeData) => (
        <div className="node">
            <div className="node-content" onClick={() => setSelectedUser(nodeData)}>
                <h3 className="node-name">{nodeData.name}</h3>
                <div className="node-circle"></div>
                <p>Должность: {nodeData.position}</p>
                <p>Роль: {nodeData.role}</p>
                <button className="delete-button" onClick={(e) => { e.stopPropagation(); onDelete(nodeData.id); }}>Удалить</button>
            </div>
        </div>
    );

    const handleCloseUserInfo = () => {
        setSelectedUser(null); // Закрываем информацию о пользователе
    };

    return (
        <div className="org-chart-container">
            <Tree 
                data={treeData} 
                renderCustomNode={renderNode} 
                orientation="vertical" 
                translate={{ x: 200, y: 50 }} 
                nodeSize={{ x: 450, y: 200 }} // Увеличиваем расстояние между ветками
            />
            {selectedUser && <UserInfo user={selectedUser} onClose={handleCloseUserInfo} />}
        </div>
    );
};

export default OrgChartComponent;