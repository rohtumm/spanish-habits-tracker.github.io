import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState(null);
  const [userPrompt, setUserPrompt] = useState('');

  const handlePromptChange = (event) => {
    setUserPrompt(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
      if (!apiKey) {
        throw new Error('No API key found. Check your .env file.');
      }

      const trimmedApiKey = apiKey.trim();
      const genAI = new GoogleGenerativeAI(trimmedApiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash"
      });

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: userPrompt + 'Responder en español y ofrecer sugerencias para ampliar este tema y explorar otros campos.' }] }],
        generationConfig: {
          temperature: 1,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
        }
      });

      const responseText = result.response.text();
      setFeedback(responseText);
    } catch (err) {
      console.error("Full Error Object:", err);
      setError(err.message || "Unknown error occurred");
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: '20px'
    }}>
      <h1>Generador de Comentarios</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
        <label htmlFor="prompt" style={{ marginBottom: '0.5rem' }}>Entregar un resumen de tu progreso en estos hábitos:</label>
          <textarea
            id="prompt"
            value={userPrompt}
            onChange={handlePromptChange}
            style={{ width: '445px', height: '150px', marginBottom: '0.5rem' }}
          />
        <button type="submit" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Obtener Feedback</button>
      </form>

      {error ? (
        <div style={{ color: 'red', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px' }}>
          <h2>Error Details:</h2>
          <p>{error}</p>
          <h3>Troubleshooting Tips:</h3>
          <ul>
            <li>Verify API key is correctly copied</li>
            <li>Ensure no extra spaces in .env file</li>
            <li>Restart development server</li>
            <li>Check Google AI Studio for key validity</li>
            <li>Confirm billing is enabled</li>
          </ul>
        </div>
      ) : (
        <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px' }}>
          <h2>Comentarios:</h2>
          <p>{feedback || 'Cargando...'}</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;