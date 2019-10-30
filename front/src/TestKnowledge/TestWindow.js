import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import Firebase from "firebase";
import {connect} from "react-redux";
//Material UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
//Mymodule
import Stats from "./statistics/Stats";
//firebase config
import {config} from "../firebase.config";
//style
import './TestWindow.scss';

const buttonStyle = {height: '40px', width: '60%', marginTop: '6%'};
const formStyle = {
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};
function answerAnimation(color) {
    let item = document.getElementsByClassName("test-window-container")[0];
    item.style.background = color;
    setTimeout(() => {
        item.style.background = '';
    }, 500)
};

function TestWindow(props) {
    let [wordsState, setWordsState] = useState({words: []});
    let [wordIndex, setWordIndex] = useState(0);
    let [textValue, setTextValue] = useState("");
    let [isShowStats, setShowStats] = useState(false);
    let [isStartTestig, setStartTesting] = useState(false);
    let [statValue, setStatValue] = useState(0);

    function useForceUpdate() {
        const [value, set] = useState(true); //boolean state
        return () => set(value => !value); // toggle the state to force render
    }

    useEffect(() => {
        if (Firebase.apps.length === 0) {
            Firebase.initializeApp(config);
        }
        props.store.isLogin && getDataFromDB();


    }, []);
    useEffect(() => {
        let newWords = [...wordsState.words];
        console.log("VALUE", props.isPrimaryLanguage);
        if (props.isPrimaryLanguage === false || props.isPrimaryLanguage === true) {
            newWords.map((element) => {
                let el = element.translate;
                element.translate = element.word;
                element.word = el;
            })
        }
        setWordsState({words: newWords});
    }, [props.isPrimaryLanguage])
    let textInput = React.createRef();

    function handleChange(e) {
        setTextValue(e.target.value);
    }

    function getDataFromDB() {
        let startUrl = props.store && props.store.email;
        startUrl = startUrl.match('([^@]+)');
        console.log("STORE TOKEN:",props.store.accessToken);
        fetch('http://localhost:3001/api/word/get', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'x-auth-token': props.store.accessToken,
            },
        }).then(res => {
            if (res.status === 401 || res.status === 400){
                throw new Error("Error session or server connection");
            }
            return res.json()

        }).then(response => {
            console.log("RESPONSE", response);
            createWordList(response);
        }).catch(function (error) {
            console.log("ERROR",error);
            return <Redirect to={"/login"} from={"/mywords"}/>
        });
    }

    function createWordList(data) {
        let wordList = [];
        let iterator = 0;
        if (Object.keys(data) !== 0) {
            for (let key in data) {
                wordList.push({
                    translate: data[key].translate,
                    word: data[key].word,
                    day: data[key].day,
                    month: data[key].month,
                    year: data[key].year
                })
            }
        }

        setWordsState({words: wordList});
        console.log("words:", wordList);

    }

    function handleButton(event) {
        if (wordIndex !== wordsState.words.length - 1) {
            setWordIndex(wordIndex + 1);
        } else {
            console.log("STATVALIE", statValue)
            setTimeout(() => {
                setShowStats(true);
            }, 1000)
        }
        if (textValue === wordsState.words[wordIndex].translate) {
            answerAnimation('green');
            setStatValue(statValue + 1);
        } else {
            answerAnimation('red');
        }
        setTextValue("");
        textInput.current.focus()
    }

    function handleButtonStartTest() {
        setStartTesting(true);
    }

    function handleKeyPress(e, handle) {
        handle();
        e.preventDefault();
    }

    return (<div className={"test-window"}>

        {isStartTestig ?
            <React.Fragment>
                {wordsState.words.length ?
                    <div className="test-window-container">
                        {isShowStats ?
                            <Stats rightStat={statValue * 100 / wordsState.words.length}/> : <React.Fragment>
                                <div>

                                    <h1>{wordsState.words[wordIndex].word}</h1>
                                </div>
                                <form className="form-container" style={formStyle}>
                                    <form className="w100 flex w-center h-center" onSubmit={(e) => {
                                        handleKeyPress(e, handleButton)
                                    }}>
                                        <TextField
                                            id="standard-name"
                                            style={{width: '50%'}}
                                            margin="normal"
                                            onChange={(e) => handleChange(e)}
                                            value={textValue}
                                            autoFocus={true}
                                            autoComplete={false}
                                            inputRef={textInput}
                                        />
                                    </form>
                                </form>
                            </React.Fragment>

                        }

                        {isShowStats ? null :
                            <Button variant="outlined" color="inherit" style={buttonStyle}
                                    onClick={handleButton}>Ответить</Button>
                        }
                    </div> : null}</React.Fragment> :
            <Button variant="outlined" color="inherit" style={buttonStyle} onClick={handleButtonStartTest}>Начать
                Тест</Button>

        }


    </div>)
}


export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        changeIsLogin: (value) => {
            dispatch({type: 'ISLOGIN', isLogin: value})
        }
    })
)(TestWindow);