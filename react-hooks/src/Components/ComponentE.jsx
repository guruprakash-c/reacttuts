import React, { useContext } from 'react';
import ComponentF from "./ComponentF";
import { UserContext, ChannelContext } from "../App";


export default function ComponentE(){
    const user = useContext(UserContext);
    const channel = useContext(ChannelContext);
    return (
        <>
        <h1>Component E</h1>
        <p>{user} - {channel}</p>
        <ComponentF/>
        </>
    )
}