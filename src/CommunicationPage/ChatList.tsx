import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const MsgListBar = styled.div`
    height: 100vh;
    width: 250px;
    padding-top: 40px;
    border-right: 2px solid black;
`

const ChatList = (props: { window:number }): JSX.Element => {




    return (
        <MsgListBar>
            

        </MsgListBar>
    )
}

export default ChatList;