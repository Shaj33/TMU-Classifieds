import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../store/hooks';
import { setFriendId, setPostId } from '../store/messagesSlice';
import { useAppSelector } from '../store/hooks';

const MsgListBar = styled.div`
    padding: 5px;
`


const MsgList = styled.div<{ $current: boolean; }>`
    background-color: ${props => props.$current ? 'gray' : 'white'};;
    display: block;
    margin: 5px;
    padding: 5px;
    border: 1px solid black;
    border-radius: 10px;
    overflow: hidden;
`

const PostTitleP = styled.p`
    
`

const ChatList = (props: { closeMenu: React.Dispatch<React.SetStateAction<boolean>> }): JSX.Element => {

    const userId = localStorage.getItem('token')
    const [Messages, setMessages] = useState<any[]>([])
    const dispatch = useAppDispatch()
    const postId = useAppSelector(state => state.messages.postId)
    const friendId = useAppSelector(state => state.messages.friendId)

    const changeWindow = (vars: {postId: number, friendId: number}) => {
        dispatch(setPostId(vars.postId))
        dispatch(setFriendId(vars.friendId))
        props.closeMenu(false)
    }
    
    useEffect(() => {

        fetch(`https://tmu-classifieds.onrender.com/app/get_most_recent_all/?userId=${userId}`)
            .then((response: any) => response.json())
            .then((data: any) => {
                console.log(data)
                setMessages(data)
            })

    }, [])
    

    return (
        <MsgListBar>
            {Messages.map((msg, index) => {
                    return (
                        <MsgList $current={msg.postId == postId && msg.friendId == friendId} key={index} onClick={() => changeWindow({postId: msg.postId, friendId: msg.friendId})}>
                            {msg.postTitle}
                            <br/>
                            {msg.friendUser}
                        </MsgList>
                    )
                })}

        </MsgListBar>
    )
}

export default ChatList;