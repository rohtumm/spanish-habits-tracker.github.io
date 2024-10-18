import React from 'react';

const FeedbackPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
      <h1>Feedback Page</h1>
      <p>This is where feedback will be displayed below:</p>

      {/* wrapping iframe with a responsive div */}
      <div style={{ width: '100%', height: '80vh', overflow: 'auto' }}>
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/Zj8Cc6Z19OgEC21Fft27-"
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="Chatbase Feedback Bot"
        ></iframe>
      </div>
    </div>
  );
};

export default FeedbackPage;
