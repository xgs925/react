import React from 'react';
import {render} from 'react-dom';
import {Router, Route, Switch} from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import './index.css';
// 引入路由
import HomePage from './routers/HomePage';

const history = createHashHistory();

const routeData = [
    {
        route: '/',
        content: (<HomePage />),
        props: {exact: true}
    }
];

// 请重写Content render函数以完成路由渲染
class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [...(props.data)]
        };
    }
    render(){
        const routeArr = this.state.data.map(({route, content, props}, index)=>{
            return (<Route key={`route${index}`} path={route} {...props} component={()=>{
                return (content);
            }}/>);
        });
        return (<div className="wrapper">
            <Switch>
                {routeArr}
                <Route component={()=>{
                    return (<div>404 Not Found!</div>);
                }} />
            </Switch>
        </div>);
    }
}

render(
    (<Router history={history}>
        <Content data={routeData} history={history}/>
    </Router>),
    document.getElementById('app')
);
