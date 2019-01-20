import React, { Component } from 'react';
import styles from './index.scss';

export default class HelloWorld extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (<div>
            Hello, {`gus`}
        </div>);
    }
}
