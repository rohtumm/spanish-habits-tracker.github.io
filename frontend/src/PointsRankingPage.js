import React, { useState, useEffect } from 'react';

function PointsRankingPage() {
  const [points, setPoints] = useState(0);
  const [allStudentsPoints, setAllStudentsPoints] = useState([]);
  const studentName = localStorage.getItem('selectedStudent');

  useEffect(() => {
    // Retrieve all students' data from localStorage
    const allStudentData = {};
    for (let i = 1; i <= 15; i++) {
      const studentName = `Student ${i}`;
      const studentData = JSON.parse(localStorage.getItem(studentName)) || {};
      allStudentData[studentName] = studentData;
    }

    // Calculate total points for each student based on the provided point system
    const studentsPointsArray = Object.entries(allStudentData).map(([name, data]) => {
      let totalPoints = 0;
      if (studentName == 'Student 1') {
        totalPoints -= 9;
      }
      Object.entries(data).forEach(([habit, weeks]) => {
        const pointsPerHabit = getPointsPerHabit(habit);
        totalPoints += Object.values(weeks).filter((checked) => checked).length * pointsPerHabit;
      });
      return { name, points: totalPoints };
    });

    // Sort the students' points in descending order
    const sortedStudentsPoints = studentsPointsArray.sort((a, b) => b.points - a.points);
    setAllStudentsPoints(sortedStudentsPoints);

    // Find the index of the current student in the sorted array
    const currentStudentIndex = sortedStudentsPoints.findIndex((student) => student.name === studentName);
    setPoints(sortedStudentsPoints[currentStudentIndex].points);
  }, [studentName]);

  // Helper function to get the points per habit
  const getPointsPerHabit = (habit) => {
    switch (habit) {
      case 'Hablar con amigos (15 min.)':
        return 2;
      case 'Ir a tutoría':
        return 3;
      case 'La mesa de conversación':
        return 3;
      case 'Hablar con un Pen-Pal':
        return 3;
      case 'Hablar con un hispano (15 min.)':
        return 3;
      case 'Enseñar español':
        return 3;
      case 'Leer las noticias':
        return 2;
      case 'Lee un libro (Un capítulo)':
        return 4;
      case 'Leer un artículo':
        return 3;
      case 'Escuchar un podcast':
        return 2;
      case 'Mirar videos en Youtube (20 m)':
        return 3;
      case 'Escuchar música (15 min.)':
        return 2;
      case 'Escuchar la radio (15 min.)':
        return 2;
      case 'Duolingo (15 min.)':
        return 2;
      case 'Mirar una película':
        return 5;
      case 'Episodio de una serie':
        return 3;
      case 'Mirar videos educativos':
        return 3;
      case 'Escribir un diario':
        return 3;
      case 'Estudio independiente':
        return 3;
      case 'Estudiar en conjuguemos (15 min.)':
        return 2;
      case 'Estudiar en Quizlet (15 min.)':
        return 2;
      case 'Escribir un cuento':
        return 5;
      case 'Escribir un correo electrónico':
        return 3;
      case 'Ordenar comida en un restaurante':
        return 2;
      case 'Cocinar':
        return 3;
      case 'Jugar juegos de mesa':
        return 3;
      case 'Ir a un museo de arte hispano':
        return 5;
      default:
        return 0;
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '24px' }}>
      <h1>Tus Puntos</h1>
      <p>
        <strong>{studentName}</strong> tiene:
      </p>
      <h2>{points} puntos</h2>
      <p>
        Estas en el lugar {allStudentsPoints.findIndex((student) => student.name === studentName) + 1}/{allStudentsPoints.length}
      </p>
    </div>
  );
}

export default PointsRankingPage;