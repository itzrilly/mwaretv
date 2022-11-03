import React from 'react';
import Header from '../components/Header';
import './Message.css';

function Message() {
    return (
        <>
            <Header/>
            <div className='message-container'>
                <div className='msg-content'>
                    <div><h2>Votre code d'activation est le suivant:</h2></div>
                    <div><h1>348600</h1></div>
                </div>
            </div>
        </>
    );
}

export default Message;