import React from 'react';
import './style.scss';

const ChatWindow: React.FC = () => {
    return (
        <div className="chat"><p>Coming Soon</p></div>
    );
}

const ChatSidebar: React.FC = () => {
    return (
        <div/>
    );
}

const Chat: React.FC = () => {
    return (
        <div className="page">
            <ChatSidebar />
            <ChatWindow />
        </div>
    );   
}

export default Chat;
