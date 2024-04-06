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
import Divider from '@mui/material/Divider';

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
    height: 12%;
    border: 1px solid none;
    display: flex;
`

const Title = styled.h1`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`

const Communication = (): JSX.Element => {

    const userId = localStorage.getItem('token')
    const [Messages, setMessages] = useState<any[]>([])
    const postId = useAppSelector(state => state.messages.postId)
    const friendId = useAppSelector(state => state.messages.friendId)
    const [friendUser, setFriendUser] = useState<string>('')
    const [user, setUser] = useState<number>(0)
    const [textContent, setTextContent] = useState<string>('')
    const [postTitle, setPostTitle] = useState<string>('')
    const [refreshTab, setRefreshTab] = useState<boolean>(true)
    const [openMessages, toggleOpenMessages] = useState<boolean>(false)
    const [isOwner, setOwner] = useState<boolean>(false)
    const [isOpen, setOpen] = useState<boolean>(false)

    const fetchMessages = () => {
        console.log(friendId)
        fetch(`http://127.0.0.1:8000/app/get_msgs_list/?userId=${userId}&friendId=${friendId}&postId=${postId}`)
            .then((response: any) => response.json())
            .then((data: any) => {
                console.log(data)
                setMessages(data.messages)
                setFriendUser(data.friendUser)
                setUser(data.user)
            })
            .catch(() => {
                setMessages([])
                setFriendUser('a')
                setUser(0)
            })
    }

    const fetchPost = () => {
        fetch(`http://127.0.0.1:8000/app/get_single_ad_listing/?userId=${userId}&postId=${postId}`)
            .then((response: any) => response.json())
            .then((data: any) => {
                setPostTitle(data.title)
                data.isOwner ? setOwner(true) : setOwner(false)
                setOpen(data.is_open)
            })
            .catch(() => {
                setPostTitle('')
                setOwner(false)
                setOpen(true)
            })
    }

    const CloseUserAd = (postId: number) => {
        try {
            fetch(`http://127.0.0.1:8000/app/close_ad/${postId}/`, {
                method: 'PUT'
            })
                .then(response => response.json())
                .then(() => setOpen(false))
                .catch(() => { throw new Error("Error closing ad") })
        } catch (error) {
            console.error("Error closing ad:", error);
        }
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

        fetch(`http://127.0.0.1:8000/app/send_txt_message/`, postOptions)
            .then(async (response) => fetchMessages())

        setTextContent('')
        setRefreshTab(!refreshTab)
    }

    if (!userId) return (
        <div>
            <h1>Please Log In</h1>
        </div>

    )

    return (
        <CommWindow>
            <Drawer open={openMessages} onClose={() => toggleOpenMessages(false)}>
                {<ChatList closeMenu={toggleOpenMessages} />}
            </Drawer>
            <div style={{ display: 'block', width: '100%', height: '90vh' }}>
                <TitleBar>
                    <IconButton onClick={() => toggleOpenMessages(true)}>
                        <MessageIcon />
                    </IconButton>
                    {postTitle !== '' && <Title>{friendUser} - {postTitle}</Title>}
                    <Box flexGrow={1} />
                    {isOwner && isOpen && <Box style={{ margin: "auto 20px" }}>
                        <Button variant='contained' color='error' onClick={() => CloseUserAd(postId)}>Close Ad</Button>
                    </Box>}
                </TitleBar>
                <Divider component="div" />
                <Box sx={{ overflow: 'auto', minHeight: '80%', maxHeight: '80%' }}>
                    {Messages.map((msg, index) => {
                        return (
                            <div style={{ display: 'flex' }}>
                                {msg.userId1 !== user && <Box flexGrow={1} />}
                                <ChatBox $sender={msg.userId1 === user} key={index}>{msg.content}</ChatBox>
                                {msg.userId1 === user && <Box flexGrow={1} />}
                            </div>
                        )
                    })}
                </Box>
                {postId !== 0 && friendId !== 0 && <div style={{ display: 'flex', padding: '10px', textAlign: 'center' }}>
                    {isOpen ? <>
                        <TextField fullWidth value={textContent} onChange={(e) => setTextContent(e.target.value)} />
                        <Button onClick={submitText}>Submit</Button>
                    </> : 
                    <>
                        <h1>This Post is Closed</h1>
                    </>}
                </div>}
            </div>
        </CommWindow>
    )
}

export default Communication;