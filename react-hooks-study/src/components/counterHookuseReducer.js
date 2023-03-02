import React, {useReducer} from 'react'

function CounterUseReducer(props) {

    const [stateCount, dispatch] = useReducer(reducer, 1, init)

    function reducer(state, action) {
        switch (action.type) {
            case 'increment':
                return {count: state.count + 1};
            case 'decrement':
                return {count: state.count - 1};
            case 'reset':
                return init(action.payload);
            default:
                throw new Error();
        }
    }

    function init(initialCount) {
        return {count: initialCount};
    }

    return (
        <div>
            <p>{stateCount.count}</p>
            <button onClick = {() => dispatch({type: 'reset', payload: 1})}>
                Reset
            </button>
            <button onClick={() => dispatch({type: 'decrement'})} >-</button>
            <button onClick={() => dispatch({type: 'increment'})} >+</button>
        </div>
    )
}

export default CounterUseReducer