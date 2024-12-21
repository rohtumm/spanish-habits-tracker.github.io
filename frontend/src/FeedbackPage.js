import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const FeedbackPage = () => {
  // State variables to manage feedback, errors, and user input
  const [feedback, setFeedback] = useState(''); // Stores the AI-generated feedback
  const [error, setError] = useState(null); // Stores any error messages
  const [userPrompt, setUserPrompt] = useState(''); // Stores the user's input for the AI prompt

  // Handle changes in the input field
  const handlePromptChange = (event) => {
    setUserPrompt(event.target.value); 
  };

  // Handle submission to generate AI feedback
  const handleSubmit = async (event) => {
    event.preventDefault(); 

    try {
      // Retrieve the API key from environment variables
      const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
      if (!apiKey) {
        // Throw an error if the API key is not found
        throw new Error('No API key found. Check your .env file.');
      }

      const trimmedApiKey = apiKey.trim(); // Take out any extra whitespace from the API key

      // Initialize the Google Generative AI client
      const genAI = new GoogleGenerativeAI(trimmedApiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash" // Specify the AI model to use
      });

      // Send the user prompt to the AI model 
      const result = await model.generateContent({
        contents: [{ 
          role: "user",
          parts: [{ text: userPrompt + ' Responder en español y ofrecer sugerencias para ampliar este tema y explorar otros campos.' }] // Append additional instructions to the user prompt
        }],
        // Configuration settings below
        generationConfig: {
          temperature: 1, 
          topP: 0.95, 
          topK: 40, 
          maxOutputTokens: 8192, 
        }
      });

      // Retrieve and store the AI's response text
      const responseText = result.response.text();
      setFeedback(responseText);
    } catch (err) {
      console.error("Full Error Object:", err); // Log the full error object for debugging
      setError(err.message || "Unknown error occurred"); // Update the error state with a message
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: '20px'
    }}>
      <h1>Generador de Comentarios</h1> {/* Page title */}

      {/* Form for submitting user input */}
      <form 
        onSubmit={handleSubmit} 
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}
      >
        <label htmlFor="prompt" style={{ marginBottom: '0.5rem' }}>
          Entregar un resumen de tu progreso en estos hábitos:
        </label>

        {/* Text area for the user to input their prompt */}
        <textarea
          id="prompt"
          value={userPrompt}
          onChange={handlePromptChange}
          style={{ width: '445px', height: '150px', marginBottom: '0.5rem' }}
        />

        {/* Submit button */}
        <button type="submit" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
          Obtener Feedback
        </button>
      </form>

      {/* Display error messages or the AI feedback, to help users who encounter difficulties with API */}
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
          <p>{feedback || 'Cargando...'}{/* Display the feedback or a loading message */}</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;
