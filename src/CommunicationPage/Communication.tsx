import React, { useEffect, useState } from 'react';
import ChatList from './ChatList';

import styled from 'styled-components';

const CommWindow = styled.div`
    display: flex;
`

const Communication = (): JSX.Element => {

    const userId = 100

    useEffect(() => {
        const fetchMessages = async () => {
            fetch(`http://127.0.0.1:8000/app/get_msgs_list/`)
                .then((response: any) => { console.log(response)
                    return response.json()})
                .then((data:JSON) => {console.log(data)})
        }

        fetchMessages()
    }, [])

    const [currentWindow, setCurrentWindow] = useState(0);

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