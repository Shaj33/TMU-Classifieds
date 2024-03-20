import React, { useEffect, useState } from 'react';
import ChatList from './ChatList';

import styled from 'styled-components';

const CommWindow = styled.div`
    width: auto;
    display: flex;
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

    const [Messages, setMessages] = useState<any[]>([])
    const [currentWindow, setCurrentWindow] = useState<number>(0);
    const [textContent, setTextContent] = useState<string>('')

    const fetchMessages = () => {
        fetch(`http://127.0.0.1:8000/app/get_msgs_list?userId=${userId}&friendId=${currentWindow}`)
            .then((response: any) => response.json())
            .then((data: any) => setMessages(data))
    }
    useEffect(() => {
        fetchMessages()
    }, [currentWindow])

    const test = () => {
        console.log(Messages)
    }

    const submitText = () => {
        console.log("Submitted")

        const postOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: userId,
                friendId: currentWindow,
                content: textContent,
                date: Date.now()
            })
        }

        fetch(`http://127.0.0.1:8000/app/send_txt_message`, postOptions)
            .then(async (response) => fetchMessages())
        
        setTextContent('')
    }


    return (
        <CommWindow>
            <ChatList setCurrentWindow={setCurrentWindow} />
            <div style={{ display: 'block', width: '100%' }}>
                <div style={{ height: '90%'}}>
                    {Messages.map((msg, index) => {
                        return (
                            <ChatBox key={index} $sender={msg.userId1 === userId}>{msg.content}</ChatBox>
                        )
                    })}
                </div>
                {currentWindow !== 0 && <div>
                    <input type="text" value={textContent} onChange={(e) => setTextContent(e.target.value)} />
                    <button onClick={submitText}>Submit</button>
                </div>}
            </div>
        </CommWindow>
    )
}

export default Communication;