import React from 'react';
import {render} from 'react-dom';

// 请重写Content render函数以完成路由渲染
class Content extends React.Component {
    constructor(){
        super();
        this.state = {
            color: 'red'
        };
    }
    componentDidMount(){
        setTimeout(()=>{
            console.log('fn componentDidMount--------------------');
            this.setState({color: 'blue'});
        }, 2000);
    }
    render(){
        return (
            <div>
                <h1>hh1</h1>
                <span>s1</span>
                <span style={{color: this.state.color}}>
                    <p>hello</p>
                </span>
            </div>
        );
    }
}

render(
    (<Content />),
    document.getElementById('app')
);
