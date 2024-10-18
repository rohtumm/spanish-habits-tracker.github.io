import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import HabitsPage from './HabitsPage';
import FeedbackPage from './FeedbackPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/habits" element={<HabitsPage />} />
      <Route path="/feedback" element={<FeedbackPage />} />
    </Routes>
  </Router>
);



