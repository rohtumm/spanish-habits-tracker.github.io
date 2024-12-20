import { render, screen } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import HabitsPage from './HabitsPage';

test('renders habits page', () => {
  render(
    <BrowserRouter>
      <HabitsPage />
    </BrowserRouter>
  );
});