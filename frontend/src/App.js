import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const [selectedStudent, setSelectedStudent] = useState('');
  const navigate = useNavigate();

  const students = [
    'Student 1', 'Student 2', 'Student 3', 'Student 4', 'Student 5',
    'Student 6', 'Student 7', 'Student 8', 'Student 9', 'Student 10',
    'Student 11', 'Student 12', 'Student 13', 'Student 14', 'Student 15'
  ];

  const handleProceed = () => {
    if (selectedStudent) {
      localStorage.setItem('selectedStudent', selectedStudent); // Save the selected student
      navigate('/habits'); // Navigate to the habits page
    } else {
      alert('Please select a student.');
    }
  };
  

  return (
    <div className="App">
      <h1>¡Bienvenido a tu Rastreador de Hábitos!</h1>
      <select 
        value={selectedStudent} 
        onChange={(e) => setSelectedStudent(e.target.value)}
      >
        <option value="" disabled>Seleccione su nombre</option>
        {students.map((student, index) => (
          <option key={index} value={student}>{student}</option>
        ))}
      </select>
      <br />
      <button onClick={handleProceed}>Continuar</button>
    </div>
  );
}

export default App;
