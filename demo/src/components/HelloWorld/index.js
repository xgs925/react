import React, { Component } from 'react';
import styles from './index.scss';
import {mergeClassName} from '../../util';

export default class HelloWorld extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (<div className={mergeClassName(styles.hw, 'test')}>
            Hello, {`gus`}
        </div>);
    }
}
