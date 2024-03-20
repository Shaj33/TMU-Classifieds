import React, { useEffect, useState } from 'react';
import ChatList from './ChatList';

import styled from 'styled-components';

const CommWindow = styled.div`
    width: auto;
    display: flex;
    background-color: red;
`

const ChatBox = styled.div<{ $sender: boolean; }>`
    float: ${props => props.$sender ? 'left' : 'right'};
    width: 80%;
    height: 25px;
    margin: 5px;
    border: 1px solid black;
`

const Communication = (): JSX.Element => {

    const userId = 100
    const friendId = 101

    const [Messages, setMessages] = useState<any[]>([])
    const [currentWindow, setCurrentWindow] = useState<number>(0);
    const [textContent, setTextContent] = useState<string>('')

    useEffect(() => {

        fetch(`http://127.0.0.1:8000/app/get_msgs_list?userId=${userId}&friendId=${currentWindow}`)
            .then((response: any) => response.json())
            .then((data: any) => setMessages(data))

    }, [currentWindow])

    const test = () => {
        console.log(Messages)
    }

    const submitText = () => {
        console.log("Submitted")
        setTextContent('')
    }


    return (
        <CommWindow>
            <ChatList setCurrentWindow={setCurrentWindow} />
            <div style={{ display: 'block', width: '100%' }}>
                <div style={{ height: '90%', backgroundColor: 'blue' }}>
                    {Messages.map((msg, index) => {
                        return (
                            <ChatBox key={index} $sender={msg.userId1 === userId}>{msg.content}</ChatBox>
                        )
                    })}
                </div>
                <div>
                    <input type="text" value={textContent} onChange={(e) => setTextContent(e.target.value)} />
                    <button onClick={submitText}>Submit</button>
                </div>
            </div>
        </CommWindow>
    )
}

export default Communication;