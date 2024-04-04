import React, { useEffect, useState } from 'react';
import ChatList from './ChatList';
import styled from 'styled-components';
import { useAppSelector } from '../store/hooks';
import { useTheme } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import MessageIcon from '@mui/icons-material/Message';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const CommWindow = styled.div`
    width: auto;
    display: flex;
`

const ChatBox = styled.div<{ $sender: boolean; }>`
    border-radius: ${props => props.$sender ? '15px 15px 15px 0px' : '15px 15px 0px 15px'};
    margin: 5px;
    padding: 8px;
    border: 1px solid none;
    background-color: ${props => props.$sender ? '#2196f3' : '#3f51b5'};
    color: white;
`

const TitleBar = styled.div`
    height: 10%;
    border: 1px solid none;
    background-color: #1976d2;
    display: flex;
`

const Title = styled.h1`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`

const Communication = (): JSX.Element => {

    const userId = 100
    const [Messages, setMessages] = useState<any[]>([])
    const postId = useAppSelector(state => state.messages.postId)
    const friendId = useAppSelector(state => state.messages.friendId)
    const [textContent, setTextContent] = useState<string>('')
    const [postTitle, setPostTitle] = useState<string>('')
    const [refreshTab, setRefreshTab] = useState<boolean>(true)
    const [openMessages, toggleOpenMessages] = useState<boolean>(false)
    const [isOwner, setOwner] = useState<boolean>(false)

    const fetchMessages = () => {
        fetch(`http://127.0.0.1:8000/app/get_msgs_list?userId=${userId}&friendId=${friendId}&postId=${postId}`)
            .then((response: any) => response.json())
            .then((data: any) => setMessages(data))
    }

    const fetchPost = () => {
        fetch(`http://127.0.0.1:8000/app/get_single_ad_listing?postId=${postId}`)
            .then((response: any) => response.json())
            .then((data: any) => {
                console.log(data)
                data ? setPostTitle(data.title) : setPostTitle('')
                data && data.user_id == userId ? setOwner(true) : setOwner(false)
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
            <Drawer open={openMessages} onClose={() => toggleOpenMessages(false)}>
                {<ChatList closeMenu={toggleOpenMessages}/>}
            </Drawer>
            <div style={{ display: 'block', width: '100%', height: '100vh' }}>
                <TitleBar>
                    <IconButton onClick={() => toggleOpenMessages(true)}>
                        <MessageIcon />
                    </IconButton>
                    <Title>{friendId} - {postTitle}</Title>
                    <Box flexGrow={1} />
                    {isOwner && <Box style={{margin: "auto 20px"}}>
                        <Button variant='contained' color='error'>Close Ad</Button>
                    </Box>}
                </TitleBar>
                <Box sx={{ overflow: 'auto', minHeight: '80%', maxHeight: '80%' }}>
                    {Messages.map((msg, index) => {
                        return (
                            <div style={{ display: 'flex' }}>
                                {msg.userId1 !== userId && <Box flexGrow={1} />}
                                <ChatBox $sender={msg.userId1 === userId} key={index}>{msg.content}</ChatBox>
                                {msg.userId1 === userId && <Box flexGrow={1} />}
                            </div>
                        )
                    })}
                </Box>
                {postId !== 0 && friendId !== 0 && <div style={{display: 'flex', padding: '10px'}}>
                    <TextField fullWidth value={textContent} onChange={(e) => setTextContent(e.target.value)} />
                    <Button onClick={submitText}>Submit</Button>
                </div>}
            </div>
        </CommWindow>
    )
}

export default Communication;