import React, { useEffect, useState } from 'react';
import { Message, User } from '../types/chat';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { initSocket } from '../socket/socket';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [userName, setUserName] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    const socket = initSocket();

    socket.on('message:received', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on('users:update', (updatedUsers: User[]) => {
      setUsers(updatedUsers);
    });

    return () => {
      socket.off('message:received');
      socket.off('users:update');
    };
  }, []);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      const socket = initSocket();
      socket.emit('user:join', userName);
      setIsJoined(true);
    }
  };

  if (!isJoined) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
        <form onSubmit={handleJoin} className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-bold text-purple-600">Join Chat</h2>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-2 mb-4 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Enter your name"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-lg shadow-md transition duration-300 hover:from-green-500 hover:via-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
          >
            Join
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
        <h1 className="text-xl font-bold">Chat Room</h1>
        <div className="text-sm">
          Online Users: {users.map(user => user.name).join(', ')}
        </div>
      </div>
      <div className="flex-1 flex flex-col bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50">
        <MessageList messages={messages} />
        <MessageInput />
      </div>
    </div>
  );
};

export default Chat;