import React, { useEffect, useState } from 'react';
import ChatList from './ChatList';
import styled from 'styled-components';
import { useAppSelector } from '../store/hooks';

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
    const postId = useAppSelector(state => state.messages.postId)
    const friendId = useAppSelector(state => state.messages.friendId)
    const [textContent, setTextContent] = useState<string>('')
    const [postTitle, setPostTitle] = useState<string>('')
    const [refreshTab, setRefreshTab] = useState<boolean>(true)
    //const [friendId, setFriendId] = useState<number>(0)

    const fetchMessages = () => {
        fetch(`http://127.0.0.1:8000/app/get_msgs_list?userId=${userId}&friendId=${friendId}&postId=${postId}`)
            .then((response: any) => response.json())
            .then((data: any) => setMessages(data))
    }

    const fetchPost = () => {
        fetch(`http://127.0.0.1:8000/app/get_single_ad_listing?postId=${postId}`)
            .then((response: any) => response.json())
            .then((data: any) => {
                data ? setPostTitle(data.title) : setPostTitle('')
                //data && data.user_id !== userId ? setFriendId(data.user_id) : setFriendId(0)
        })
    }

    useEffect(() => {
        fetchMessages()
        fetchPost()
    }, [postId, friendId])

    const submitText = () => {
        if (textContent.trim() === '') return;
        console.log("Submitted")

        const postOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: userId,
                friendId: friendId,
                content: textContent,
                date: Date.now(),
                postId: postId,
            })
        }

        fetch(`http://127.0.0.1:8000/app/send_txt_message`, postOptions)
            .then(async (response) => fetchMessages())
        
        setTextContent('')
        setRefreshTab(!refreshTab)
    }


    return (
        <CommWindow>
            <ChatList refresh={refreshTab}/>
            <div style={{ display: 'block', width: '100%' }}>
                <div style={{height: '10%', backgroundColor: 'red', border: '1px solid black'}}>
                    <h1>{postTitle}</h1>
                </div>
                <div style={{ height: '80%'}}>
                    {Messages.map((msg, index) => {
                        return (
                            <ChatBox key={index} $sender={msg.userId1 === userId}>{msg.content}</ChatBox>
                        )
                    })}
                </div>
                {postId !== 0 && friendId !== 0 && <div>
                    <input type="text" value={textContent} onChange={(e) => setTextContent(e.target.value)} />
                    <button onClick={submitText}>Submit</button>
                </div>}
            </div>
        </CommWindow>
    )
}

export default Communication;