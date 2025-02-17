
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleJoin} className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-bold">Join Chat</h2>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            placeholder="Enter your name"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Join
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 bg-blue-500 text-white">
        <h1 className="text-xl font-bold">Chat Room</h1>
        <div className="text-sm">
          Online Users: {users.map(user => user.name).join(', ')}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <MessageList messages={messages} />
        <MessageInput />
      </div>
    </div>
  );
};

export default Chat;
