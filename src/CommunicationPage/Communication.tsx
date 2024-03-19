import React from 'react';
import ChatList from './ChatList';

import styled from 'styled-components';

const CommWindow = styled.div`
    display: flex;
`

const Communication = (): JSX.Element => {


    return (
        <CommWindow>
        <ChatList />
            <div>
                Hi
            </div>
        </CommWindow>
    )
}

export default Communication;