import React, {useState} from 'react'

function Counter(props) {

    const [count, setCount ] = useState(
        () => {
            if (props.initialState < 100){
                return props.initialState + 1
            } else {
                return props.initialState + 100
            }
        }
    )

    const [tc, setTc] = useState({name: 'allen', age: 30})

    const handleClick1 = () => {
        setCount (() => { 
            if (count < 3) {
                return count + 1
            }else {
                return count +2
            }
        })
    }

    const handleClick2 = () => {
        setTc(() => {
            return {
                ...tc,
                name: 'Kevin'
            }
        }
        )
    }

    return (
        <div>
            <p>hook</p>
            <p>{count}</p>
            <button onClick = {handleClick1}>计数按钮</button>
            <p>{tc.name}</p>
            <p>{tc.age}</p>
            <button onClick = {handleClick2}>更新名称</button>
        </div>
    )
}

export default Counter