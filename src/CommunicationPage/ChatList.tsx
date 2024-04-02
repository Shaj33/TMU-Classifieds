import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const MsgListBar = styled.div`
    height: 100vh;
    width: 250px;
    padding-top: 40px;
    border: 2px solid black;
`

const MsgList = styled.div`
    display: block;
    width: 100%;
    margin-top: 5px;
    border: 1px solid black;
`

const ChatList = (props: { setCurrentWindow: Dispatch<SetStateAction<{postId: number, friendId: number}>>, refresh: boolean }): JSX.Element => {

    const userId = 100

    const [Messages, setMessages] = useState<any[]>([])

    const changeWindow = (postId: {postId: number, friendId: number}) => {
        props.setCurrentWindow(postId)
    }
    
    useEffect(() => {

        fetch(`http://127.0.0.1:8000/app/get_most_recent_all?userId=${userId}`)
            .then((response: any) => response.json())
            .then((data: any) => {
                console.log(data)
                setMessages(data)
            })

    }, [props.refresh])
    

    return (
        <MsgListBar>
            {Messages.map((msg, index) => {
                    return (
                        <MsgList key={index} onClick={() => changeWindow({postId: msg.postId, friendId: msg.friendId})}>{msg.postId + "+" + msg.friendId}</MsgList>
                    )
                })}

        </MsgListBar>
    )
}

export default ChatList;