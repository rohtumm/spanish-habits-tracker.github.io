import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HabitsPage.css';

function HabitsPage() {
  // Storing student's habit completion data
  const [studentData, setStudentData] = useState({});
  // Get the student's name
  const studentName = localStorage.getItem('selectedStudent');
  const navigate = useNavigate();

  // Initialize habits and weeks
  const habits = [
    'Hablar con amigos (15 min.)', 'Ir a tutoría', 'La mesa de conversación', 'Hablar con un Pen-Pal', 
    'Hablar con un hispano (15 min.)', 'Enseñar español', 'Leer las noticias', 'Lee un libro (Un capítulo)', 'Leer un artículo', 'Escuchar un podcast', 'Mirar videos en Youtube (20 m)',
    'Escuchar música (15 min.)', 'Escuchar la radio (15 min.)', 'Duolingo (15 min.)', 'Mirar una película',
    'Episodio de una serie', 'Mirar videos educativos', 'Escribir un diario', 'Estudio independiente', 
    'Estudiar en conjuguemos (15 min.)', 'Estudiar en Quizlet (15 min.)', 'Escribir un cuento', 
    'Escribir un correo electrónico', 'Ordenar comida en un restaurante', 'Cocinar', 'Jugar juegos de mesa', 
    'Ir a un museo de arte hispano'
  ];
  const weeks = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6', 'Semana 7', 'Semana 8', 'Semana 9', 'Semana 10'];

  // Load saved habit data from localStorage when student changes
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(studentName)) || {};
    setStudentData(savedData);
  }, [studentName]);

  // Updates the completion status of a habit for a specific week
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

  // Function to return a class for row grouping (this is for color coding)
  const getRowClass = (rowIndex) => {
    if (rowIndex < 6) return 'group1';
    if (rowIndex < 9) return 'group2';
    if (rowIndex < 17) return 'group3';
    if (rowIndex < 23) return 'group4';
    if (rowIndex < 27) return 'group5';
    return 'group6';
  };

  // Generating layout for page and buttons to go to following pages
  return (
    <div className="habits-page">
      <h1>Rastreador de Hábitos Para {studentName}</h1>
      <div className="scrollable-table">
        <table>
          <thead>
            <tr>
              <th>Hábitos</th>
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
        style={{ padding: '1rem 1rem', fontSize: '0.8rem', marginBottom: '0.5rem', marginTop: '0.5rem' }}
      >
        Ir a la Página de Feedback
      </button>

      <button
        className="ranking-button"
        onClick={() => navigate('/rankings')}
        style={{ padding: '1rem 1rem', fontSize: '0.8rem' }}
      >
        Ir a la Página de Puntos
      </button>

    </div>
  );
}

export default HabitsPage;
