import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Firebase from 'firebase';
//Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//MyModule
import SuccessEvent from './../Events/SuccessEvent';
//fireabase config
import {config} from "../config";
//style
import './WordAdder.scss';

const buttonStyle = {height: '40px', width: '60%', 'margin-top': '6%'};

function wordObjectToString(word) {
    let obj = {
        translate: word,
        day: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
    }
    return (obj);
}

function WordAdder(props) {
    let [state, setState] = useState({showSuccess: false});
    let textFieldRef2 = React.createRef();
    let inputs;
    function successAnimation() {
        let successElement = document.getElementsByClassName('success-event')[0];
        successElement.style.opacity = "0";
        setTimeout(() => {
            successElement.style.opacity = "1";
        }, 200);

        setTimeout(() => {
            successElement.style.opacity = "0";

        }, 3500);

        setTimeout(() => {
            setState({showSuccess: false});

        }, 5000);
    }

    function adderBoxAnimation() {
        let adderBox = document.getElementsByClassName('adder-box')[0];
        adderBox.style.width = "10%";
        adderBox.style.height = "10%";

        setTimeout(() => {
            adderBox.style.width = "40%";
            adderBox.style.height = "65%";
        }, 0);

        console.log("Addertbox", adderBox);
    }

    function addWord(word, translate) {

        let startUrl = props.store && props.store.email;
        startUrl = startUrl.match('([^@]+)');
        fetch(`${config.url}/api/word/add`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'x-auth-token': props.store.accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'word': word,
                'translate': translate,
                'language': 'rus',
                'translateLanguage': 'eng'
            })
        }).then(res => {
                if (res.status != 200){
                    throw new Error("Word was not added");
                }
                else {
                    setState({showSuccess: true});
                    inputs[0].value  = "";
                    inputs[1].value = "";
                    successAnimation();
                }
                return res.json()
            }
        ).then(response => {
            console.log("RESPONSE", response);
        }).catch(function (err) {
            console.log("ERROR",err);
        });
    }

    useEffect(() => {
        if (Firebase.apps.length === 0) {
            Firebase.initializeApp(config);
        }
        if (props.store.isLogin) {
            adderBoxAnimation();
        }
    });
    function handleButton(e) {
        inputs = document.getElementsByTagName('input');
        addWord(inputs[0].value, inputs[1].value);


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
    return (<div className="word-adder">
        {props.store.isLogin ? <div className="adder-box">
            <h2>ADD WORD</h2>
            <form className="form-container">
                <form onSubmit={(e) => {handleKeyPress(e,handdleTextField1)}}>
                    <TextField
                        id="standard-name"
                        label="Word"
                        style={{width: '70%'}}
                        margin="normal"
                        autoComplete={false}
                        autoFocus={true}
                    />

                </form>
                <form onSubmit={(e) => {handleKeyPress(e,handleTextField2)}}>
                    <TextField
                        id="standard-name"
                        label="Translate"
                        style={{width: '70%'}}
                        margin="normal"
                        inputRef={textFieldRef2}
                        autoComplete={false}

                    />
                </form>
            </form>
            <Button variant="outlined"
                    color="inherit"
                    onClick={handleButton}
                    style={buttonStyle}>Add</Button>
            {state.showSuccess ? <SuccessEvent text="Слово добавлено в словарь"/> : null}
        </div> : <h1>You not authorized</h1>}
    </div>)
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        //   changeIsLogin: (value) => {
        //       dispatch({ type: 'ISLOGIN', isLogin: value })
        //   },
        //   changeEmail: (value) => {
        //       dispatch({ type: 'AUTH_INFO', email: value })
        //   }
    })
)(WordAdder);
