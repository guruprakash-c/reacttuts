import React from 'react'
import { UserContext, ChannelContext } from "../App";

export default function ComponentF(){
    return (
        <>
        <h1>Component F</h1>
        <UserContext.Consumer>
            {
                user => {
                    return (
                        <ChannelContext.Consumer>
                            {
                                channel =>{
                                    return <div>
                                            User Context value <mark>{user}</mark><br/>
                                            Channel Context value <mark>{channel}</mark>
                                           </div>
                                }
                            }
                        </ChannelContext.Consumer>
                    )
                }
            }
        </UserContext.Consumer>
        </>
    )
}