import React from 'react';
import {Route, Switch} from 'react-router-dom';
//Custom modules
import Menu from '../Menu/Menu';
import MyWords from '../MyWords/MyWords';
import Login from '../Authorization/Login/Login';
import Registration from '../Authorization/Registration/Registration';
import WordAdder from '../WordAdder/WordAdder';
import StartPage from '../StartPage/StartPage';
import Test from './../Test';
import LogChecker from '../LoginChecker/LogChecker';
import PageNotFound from '../PageNotFound/PageNotFound';
import TestPage from '../TestKnowledge/TestPage';
import MyProfile from "../MyProfile/MyProfile";

//style
import './Page.scss';
import ServerTest from "../ServerTest";

function Page() {
    return (<div className="page-container">
        <Route path="/:url" render={props => <LogChecker/>}/>
        <Switch>
            <Route path="/" exact render={props => <div className="page"><LogChecker/><Menu/><StartPage/></div>}/>
            <Route path="/login" render={props => <div className="page"><Menu/><StartPage/><Login/></div>}/>
            <Route path="/reg" render={props => <div className="page"><Menu/><StartPage/><Registration/></div>}/>
            <Route path="/mywords" render={props => <div className="page"><Menu/><MyWords/></div>}/>
            <Route path="/addword" render={props => <div className="page"><Menu/><WordAdder/></div>}/>
            <Route path="/test" render={props => <Test/>}/>
            <Route path="/mytest" render={props => <div className="page"><Menu/><TestPage/></div>}/>
            <Route path={"/profile:id"} render={props => <div className="page"><Menu/><MyProfile/></div>}/>
            <Route path={"/testing"} render={props => <ServerTest/>}/>
            <Route render={() => <PageNotFound/>}/>
        </Switch>
    </div>)
}

export default Page;