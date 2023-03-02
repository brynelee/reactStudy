import React, {Component} from 'react'

class CounterAA extends Component {
    constructor (props) {
        super(props)
        this.state = {
            count: 0
        }
    }
    setCount = (count) => {
        this.setState({
            count: count + 1
        })
    }
    
    render(){
        return (
            <div>
                <p><h1>CounterClass</h1></p>
                <p>{this.state.count}</p>
                <button onClick = {() => {this.setCount(this.state.count)}}>按钮</button>
            </div>
        )
    }
}

export default CounterAA


