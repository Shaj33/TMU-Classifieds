import React, { useEffect, useState } from 'react';
import ChatList from './ChatList';

import styled from 'styled-components';

const CommWindow = styled.div`
    display: flex;
`

const ChatBox = styled.div<{ $sender: boolean; }>`
    float: ${props => props.$sender ? 'left' : 'right'};
    width: 500px;
    height: 25px;
    border: 1px solid black;
`

const Communication = (): JSX.Element => {

    const userId = 100

    const [Messages, setMessages] = useState<any[]>([])

    useEffect(() => {

        fetch(`http://127.0.0.1:8000/app/get_msgs_list?userId=${userId}`)
            .then((response: any) => response.json())
            .then((data: any) => {
                console.log(data)
                setMessages(data)
            })

    }, [])

    const test = () => {
        console.log(Messages)
    }

    const [currentWindow, setCurrentWindow] = useState(0);

    return (
        <CommWindow>
            <ChatList window={currentWindow} />
            <div style={{width: '100%'}}>
                {Messages.map((msg, index) => {
                    return (
                        <ChatBox key={index} $sender={msg.userId1 === userId}>{msg.content}</ChatBox>
                    )
                })}
            </div>
        </CommWindow>
    )
}

export default Communication;