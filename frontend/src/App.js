import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const students = [
    'Student 1', 'Student 2', 'Student 3', 'Student 4', 'Student 5',
    'Student 6', 'Student 7', 'Student 8', 'Student 9', 'Student 10',
    'Student 11', 'Student 12', 'Student 13', 'Student 14', 'Student 15'
  ];

  // Sample passwords - in a real app, store these securely
  const studentPasswords = {
    'Student 1': 'password1',
    'Student 2': 'password2',
    'Student 3': 'password3',
    'Student 4': 'password4',
    'Student 5': 'password5',
    'Student 6': 'password6',
    'Student 7': 'password7',
    'Student 8': 'password8',
    'Student 9': 'password9',
    'Student 10': 'password10',
    'Student 11': 'password11',
    'Student 12': 'password12',
    'Student 13': 'password13',
    'Student 14': 'password14',
    'Student 15': 'password15'
  };

  const handleProceed = () => {
    if (selectedStudent && password) {
      const correctPassword = studentPasswords[selectedStudent];
      if (password === correctPassword) {
        localStorage.setItem('selectedStudent', selectedStudent);
        navigate('/habits');
      } else {
        alert('Incorrect password. Please try again.');
      }
    } else {
      alert('Please select a student and enter the password.');
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
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleProceed}>Continuar</button>
    </div>
  );
}

export default App;
