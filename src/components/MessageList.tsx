import React from 'react';
import { Message } from '../types/chat';

interface Props {
  messages: Message[];
}

const MessageList: React.FC<Props> = ({ messages }) => {
  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 rounded-lg shadow-lg max-w-3xl mx-auto mt-6">
      {messages.map((message, index) => (
        <div key={index} className="mb-5 transition-transform transform hover:scale-105">
          <div className="flex items-center gap-2">
            <div className="font-semibold text-purple-600">{message.user}</div>
            <div className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleTimeString()}</div>
          </div>
          <div className="p-4 mt-2 bg-white border-2 border-purple-200 rounded-lg shadow-md hover:bg-purple-100">
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;