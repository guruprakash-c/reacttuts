import React,{useReducer} from 'react'

const initialState = 0;

const ButtonAction = (state, action) =>{
switch (action) {
    case 'increment':
        return state + 1
        break;
    case 'decrement':
        return state - 1
        break;
    case 'reset':
        return initialState
        break;
}
}

function ReducerEg() {
    const [count,setCount] = useReducer(ButtonAction, initialState);
    return (
        <>
        <p>Count { count }</p>
        <button onClick={() => setCount('increment')}>Increment</button>
        <button onClick={() => setCount('decrement')}>Decrement</button>
        <button onClick={() => setCount('reset')}>Reset</button>
        </>
    )
}

export default ReducerEg
