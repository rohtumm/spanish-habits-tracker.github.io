import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HabitsPage.css';

function HabitsPage() {
  const [studentData, setStudentData] = useState({});
  const studentName = localStorage.getItem('selectedStudent');
  const navigate = useNavigate();

  // Initialize habits and weeks
  const habits = [
    'Hablar con amigos (15 min.)', 'Ir a tutoría', 'La mesa de conversación', 'Hablar con un Pen-Pal', 
    'Hablar con un hispano (15 min.)', 'Enseñar español', 'Leer las noticias', 'Lee un libro (Un capítulo)',
    'Estudiar en Conjuguemos', 'Leer un artículo', 'Escuchar un podcast', 'Mirar videos en Youtube (20 m)',
    'Escuchar música (15 min.)', 'Escuchar la radio (15 min.)', 'Duolingo (15 min.)', 'Mirar una película',
    'Episodio de una serie', 'Mirar videos educativos', 'Escribir un diario', 'Estudio independiente', 
    'Estudiar en conjuguemos (15 min.)', 'Estudiar en Quizlet (15 min.)', 'Escribir un cuento', 
    'Escribir un correo electrónico', 'Ordenar comida en un restaurante', 'Cocinar', 'Jugar juegos de mesa', 
    'Ir a un museo de arte hispano'
  ];
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(studentName)) || {};
    setStudentData(savedData);
  }, [studentName]);

  const handleCheckboxChange = (habit, week) => {
    const updatedData = {
      ...studentData,
      [habit]: {
        ...studentData[habit],
        [week]: !studentData[habit]?.[week],
      },
    };
    setStudentData(updatedData);
    localStorage.setItem(studentName, JSON.stringify(updatedData));
  };

  // Function to return a class for row grouping
  const getRowClass = (rowIndex) => {
    if (rowIndex < 5) return 'group1';
    if (rowIndex < 10) return 'group2';
    if (rowIndex < 15) return 'group3';
    if (rowIndex < 20) return 'group4';
    if (rowIndex < 25) return 'group5';
    return 'group6';
  };

  return (
    <div className="habits-page">
      <h1>{studentName}'s Habits Page</h1>
      <div className="scrollable-table">
        <table>
          <thead>
            <tr>
              <th>Habits</th>
              {weeks.map((week, index) => (
                <th key={index}>{week}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {habits.map((habit, rowIndex) => (
              <tr key={rowIndex} className={getRowClass(rowIndex)}>
                <td>{habit}</td>
                {weeks.map((week, colIndex) => (
                  <td key={colIndex}>
                    <input
                      type="checkbox"
                      checked={studentData[habit]?.[week] || false}
                      onChange={() => handleCheckboxChange(habit, week)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        className="feedback-button"
        onClick={() => navigate('/feedback')}
      >
        Go to Feedback Page
      </button>
    </div>
  );
}

export default HabitsPage;
