import React from 'react';
import { Message } from '../types/chat';

interface Props {
  messages: Message[];
}

const MessageList: React.FC<Props> = ({ messages }) => {
  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50 rounded-lg shadow-lg max-w-3xl mx-auto mt-6">
      {messages.map((message, index) => (
        <div key={index} className="mb-5 transition-transform transform hover:scale-105">
          <div className="flex items-center gap-2">
            <div className="font-semibold text-blue-600">{message.user}</div>
            <div className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleTimeString()}</div>
          </div>
          <div className="p-4 mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-md hover:bg-gray-100">
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;