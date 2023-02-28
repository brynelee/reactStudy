import React, {useEffect, useState} from 'react'

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

    //第二个是依赖数组，如果依赖数据的数据没有变化就不会被触发执行，
    //如果是个空数组，那么useEffect只会在首次加载时被执行一次。
    useEffect(() => {
            console.log(count, '更新后的count')
        }, []
    )

    //在回调函数里面如果return的话，会返回一个清理函数
    useEffect(() => {
            console.log('开始监听')
            return () => {
                console.log('取消监听')
            }
        }
    )

    const [tc, setTc] = useState({name: 'allen', age: 30})

    const handleClick1 = () => {
        console.log(count, '更新前的count')
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