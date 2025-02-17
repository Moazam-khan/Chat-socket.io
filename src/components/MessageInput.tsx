import React, { useState } from 'react';
import { getSocket } from '../socket/socket';

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      getSocket().emit('message:send', message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 mt-4 mx-auto max-w-2xl flex items-center gap-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-3 text-gray-700 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Type your message here..."
      />
      <button
        type="submit"
        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-md transition duration-300 hover:bg-indigo-600 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
