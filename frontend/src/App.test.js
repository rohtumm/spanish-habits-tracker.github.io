import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import App from './App';
import HabitsPage from './HabitsPage';
import FeedbackPage from './FeedbackPage';
import PointsRankingPage from './PointsRankingPage';

// Mock the react-router-dom's useNavigate hook
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate,
}));

// Mock the Google Generative AI client
jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockReturnValue({
      generateContent: jest.fn().mockResolvedValue({
        response: { text: () => 'Mocked AI feedback' }
      })
    })
  }))
}));

describe('Habit Tracker App', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset navigation mock
    mockedUsedNavigate.mockReset();
  });

  describe('Login Page (App.js)', () => {
    test('renders login page with student selection and password input', () => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
      
      expect(screen.getByText('¡Bienvenido a tu Rastreador de Hábitos!')).toBeInTheDocument();
      expect(screen.getByText('Seleccione su nombre')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
    });

    test('successful login redirects to habits page', () => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );

      // Select a student and enter correct password
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Student 1' } });
      fireEvent.change(screen.getByPlaceholderText('Enter password'), { target: { value: 'password1' } });
      fireEvent.click(screen.getByText('Continuar'));

      expect(mockedUsedNavigate).toHaveBeenCalledWith('/habits');
      expect(localStorage.getItem('selectedStudent')).toBe('Student 1');
    });

    test('displays error for incorrect password', () => {
      const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
      
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );

      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Student 1' } });
      fireEvent.change(screen.getByPlaceholderText('Enter password'), { target: { value: 'wrongpassword' } });
      fireEvent.click(screen.getByText('Continuar'));

      expect(alertMock).toHaveBeenCalledWith('Incorrect password. Please try again.');
      alertMock.mockRestore();
    });
  });

  describe('Habits Page', () => {
    beforeEach(() => {
      localStorage.setItem('selectedStudent', 'Student 1');
    });

    test('renders habits table with correct number of habits and weeks', () => {
      render(
        <BrowserRouter>
          <HabitsPage />
        </BrowserRouter>
      );

      const habits = screen.getAllByRole('row');
      // 27 habits + 1 header row
      expect(habits).toHaveLength(28);
      
      const weeks = screen.getAllByRole('columnheader');
      // 10 weeks + 1 habits column header
      expect(weeks).toHaveLength(11);
    });

    test('saves habit completion to localStorage', () => {
      render(
        <BrowserRouter>
          <HabitsPage />
        </BrowserRouter>
      );

      const checkbox = screen.getAllByRole('checkbox')[0];
      fireEvent.click(checkbox);

      const savedData = JSON.parse(localStorage.getItem('Student 1'));
      expect(savedData['Hablar con amigos (15 min.)']['Semana 1']).toBe(true);
    });
  });

  describe('Feedback Page', () => {
    beforeEach(() => {
      localStorage.setItem('selectedStudent', 'Student 1');
      process.env.REACT_APP_GOOGLE_API_KEY = 'test-api-key';
    });

    test('renders feedback form and handles submission', async () => {
      render(
        <BrowserRouter>
          <FeedbackPage />
        </BrowserRouter>
      );

      expect(screen.getByText('Generador de Comentarios')).toBeInTheDocument();
      
      const textarea = screen.getByRole('textbox');
      fireEvent.change(textarea, { target: { value: 'Test feedback prompt' } });
      
      const submitButton = screen.getByText('Obtener Feedback');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Mocked AI feedback')).toBeInTheDocument();
      });
    });

    test('displays error message when API key is missing', async () => {
      process.env.REACT_APP_GOOGLE_API_KEY = '';
      
      render(
        <BrowserRouter>
          <FeedbackPage />
        </BrowserRouter>
      );

      const submitButton = screen.getByText('Obtener Feedback');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('No API key found. Check your .env file.')).toBeInTheDocument();
      });
    });
  });

  describe('Points Ranking Page', () => {
    beforeEach(() => {
      localStorage.setItem('selectedStudent', 'Student 1');
      // Simulate some habit completion data
      const mockData = {
        'Hablar con amigos (15 min.)': {
          'Semana 1': true,
          'Semana 2': true
        }
      };
      localStorage.setItem('Student 1', JSON.stringify(mockData));
    });

    test('calculates and displays points correctly', () => {
      render(
        <BrowserRouter>
          <PointsRankingPage />
        </BrowserRouter>
      );

      // For Student 1: 2 completions * 2 points each - 9 points penalty = -5 points
      expect(screen.getByText('-5 puntos')).toBeInTheDocument();
    });

    test('displays correct ranking position', () => {
      render(
        <BrowserRouter>
          <PointsRankingPage />
        </BrowserRouter>
      );

      expect(screen.getByText(/Estas en el lugar 15\/15/)).toBeInTheDocument();
    });
  });
});