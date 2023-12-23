import React, { useState } from 'react';

export const Interview = () => {
  const API_URL = 'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions';
  const API_KEY = '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';

  const [conversation, setConversation] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const generate = async () => {
    const trimmedConversation = conversation.trim();

    if (!trimmedConversation) {
      alert('Please start a conversation.');
      return;
    }

    setLoading(true);
    setResult('Generating...');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          prompt: trimmedConversation,
          max_tokens: 100,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.choices[0].text.trim());
      } else {
        setResult(`Error: ${data.error.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setResult('An error occurred while generating.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div >
      <textarea
        value={conversation}
        onChange={(e) => setConversation(e.target.value)}
        rows={10}
        cols={50}
        placeholder="Start a conversation..."
      ></textarea>
      <button onClick={generate} disabled={loading}>
        Generate
      </button>
      <div>{loading ? 'Generating...' : result}</div>
    </div>
  );
};

