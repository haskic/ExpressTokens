import React, {useEffect, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Firebase from 'firebase';

//Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

//firebase config
import {config} from "../../config";
//style
import './Registration.scss';

const buttonStyle = {height: '40px', width: '60%', 'margin-top': '6%'};

function Registration(props) {
    function singUp(email, password) {
        fetch(`${config.url}/api/reg`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({name: "Alexander", email: email, password: password})
        }).then(res => res.json()).then(response => {
            console.log("RESPONSE", response);
            if (response.isRegistrated){
                setLoginRedirect(true);
            }
        });
    }

    function regBoxAnimation() {
        let regBox = document.getElementsByClassName('registration-box')[0];
        regBox.style.opacity = "1";
        regBox.style.width = "10%";
        regBox.style.height = "10%";

        setTimeout(() => {
            regBox.style.width = "40%";
            regBox.style.height = "65%";
        }, 0);
    }

    function closeAnimation() {
        let regBox = document.getElementsByClassName('registration-box')[0];
        setTimeout(() => {
            regBox.style.width = "10%";
            regBox.style.height = "10%";
            regBox.style.opacity = "0";
            console.log("Close");

        }, 0);
        setTimeout(() => {
            setState({isClose: true});
        }, 400);

    }

    useEffect(() => {
        if (Firebase.apps.length === 0) {
            Firebase.initializeApp(config)
        }
        ;regBoxAnimation()
    })
    let [state, setState] = useState({isRegistrated: false, isClose: false});
    let [isLoginRedirect,setLoginRedirect] = useState(false);

    return (<div className="registration">
        {state.isRegistrated ? <Redirect to="/login"/> : null}
        {state.isClose ? <Redirect to="/"/> : null}
        {isLoginRedirect? <Redirect to="/login"/>: null}
        <div className="registration-box">
            <Link class="close" onClick={() => {
                closeAnimation()
            }}/>
            <h2>Registration</h2>
            <form className="form-container">
                <form>
                    <TextField
                        id="standard-name"
                        label="Email"
                        style={{width: '60%'}}
                        margin="normal"
                        autoComplete={true}
                        type="email"
                    />

                </form>
                <form>
                    <TextField
                        id="standard-name"
                        label="Password"
                        style={{width: '60%'}}
                        margin="normal"
                        type="password"
                    />
                </form>
            </form>
            <Button variant="outlined" color="inherit" style={buttonStyle} onClick={() => {
                let inputs = document.getElementsByTagName("input");
                singUp(inputs[0].value, inputs[1].value);
            }}>SIGN UP</Button>
        </div>
    </div>)
}

export default Registration;