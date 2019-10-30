import React, {useEffect, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Firebase from 'firebase';
import {connect} from 'react-redux';
import Cookies from 'universal-cookie';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {config} from './../../firebase.config';
import Loader from './../../Loader/Loader';
import "./Login.scss";

const buttonStyle = {height: '40px', width: '60%', 'margin-top': '6%'};
const errorStyle = {background: 'rgba(200,0,0,0.6)',color: 'white',height: '40px', width: '60%',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    marginTop: '3%'
                    }

function Login(props) {
    let [state, setState] = useState({isLogin: false, checkCookies: false, loader: false, isClose: false});
    let [isError,setError] = useState(false);
    let cookies;
    const InvalidError = <div style={errorStyle}>Invalid login or password</div>;
    let textFieldRef2 = React.createRef();
    function signIn(email, password) {
        fetch('http://localhost:3001/api/login', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email, password: password, fingerPrint: "zhakar"})
        }).then(res => {
            if (res.status === 401){
                console.log("EXIT LOGIN");
                setError(true);
                throw new Error("Exit login");
            }
            return res.json()

        }).then(response => {
            console.log("RESPONSE", response);
            if (response.isLogin){
                console.log("TOKEN",response.refreshToken);
                console.log("ACCESSTOKEN",response.accessToken);
                props.changeEmail(email);
                props.changeIsLogin(true);
                props.changeAccessToken(response.accessToken);
                if (state.checkCookies){
                    setCookies(response.refreshToken);
                }
                setState({isLogin: true});
            }
        }).catch(function (err) {
            return err;
        })
    }
    function setCookies(token) {
        cookies = new Cookies();
        cookies.set('token', token, {path: '/'});
    }
    function logBoxAnimation() {
        let logBox = document.getElementsByClassName('login-box')[0];
        logBox.style.opacity = "1";
        logBox.style.width = "10%";
        logBox.style.height = "10%";
        setTimeout(() => {
            logBox.style.width = "40%";
            logBox.style.height = "65%";
        }, 0);
    }
    function closeAnimation() {
        let logBox = document.getElementsByClassName('login-box')[0];
        setTimeout(() => {
            logBox.style.width = "10%";
            logBox.style.height = "10%";
            logBox.style.opacity = "0";
        }, 0);
        setTimeout(() => {
            setState({isClose: true});
        }, 400);
    }

    useEffect(() => {
        logBoxAnimation()
    }, [])
    function handleChangeCheckBox() {
        state.checkCookies ? setState({checkCookies: false}) : setState({checkCookies: true});
    }
    function handleKeyPress(e,handle) {
        e.preventDefault();
        handle();
    }
    function handdleTextField1() {
        textFieldRef2.current.focus();
    }
    function handleTextField2() {
        handleButton();
    }
    function handleButton() {
        let inputs = document.getElementsByTagName("input");
        signIn(inputs[0].value, inputs[1].value)
    }
    return (<div className="login">
        {state.isLogin ? <Redirect to="/mywords"/> : null}
        {state.isClose ? <Redirect to="/"/> : null}
        {state.loader ? <Loader/> : <div className="login-box">
            <Link class="close" onClick={() => {
                closeAnimation()
            }}/>
            <h2>Login</h2>
            <form className="form-container">
                <form onSubmit={(e) => {
                    handleKeyPress(e, handdleTextField1)
                }}>
                    <TextField
                        id="standard-name"
                        label="Email"
                        style={{width: '60%'}}
                        margin="normal"
                        autoComplete={true}
                    />
                </form>
                <form onSubmit={(e) => {
                    handleKeyPress(e, handleTextField2)
                }}>
                    <TextField
                        id="standard-name"
                        label="Password"
                        type="password"
                        style={{width: '60%'}}
                        margin="normal"
                        inputRef={textFieldRef2}

                    />
                </form>
                <form id="checkbox-memory">

                    <FormControlLabel
                        control={
                            <Checkbox checked={state.checkCookies} onChange={handleChangeCheckBox}/>
                        }
                        label="Запомнить меня"
                    />

                </form>
            </form>
            <Button variant="outlined" color="inherit" style={buttonStyle} onClick={handleButton} >SIGN IN</Button>
            {isError? InvalidError:null}
        </div>}
    </div>)
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        changeIsLogin: (value) => {
            dispatch({type: 'ISLOGIN', isLogin: value})
        },
        changeEmail: (value) => {
            dispatch({type: 'AUTH_INFO', email: value})
        },
        changeAccessToken: (value) => {
            dispatch({type: 'ACCESS_TOKEN', token: value})
        }
    })
)(Login);