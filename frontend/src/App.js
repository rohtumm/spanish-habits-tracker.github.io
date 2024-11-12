import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  print("")

  const students = [
    'Student 1', 'Student 2', 'Student 3', 'Student 4', 'Student 5',
    'Student 6', 'Student 7', 'Student 8', 'Student 9', 'Student 10',
    'Student 11', 'Student 12', 'Student 13', 'Student 14', 'Student 15'
  ];

  // Sample passwords - in a real app, store these securely
  const studentPasswords = { 
    'Student 1': 'Password1',
    'Student 2': 'Password2',
    'Student 3': 'Password3',
    'Student 4': 'Password4',
    'Student 5': 'Password5',
    'Student 6': 'Password6',
    'Student 7': 'Password7',
    'Student 8': 'Password8',
    'Student 9': 'Password9',
    'Student 10': 'Password10',
    'Student 11': 'Password11',
    'Student 12': 'Password12',
    'Student 13': 'Password13',
    'Student 14': 'Password14',
    'Student 15': 'Password15'
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
