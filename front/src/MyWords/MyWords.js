import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Firebase from 'firebase';
import {config} from './../firebase.config';
import './MyWord.scss';
import Table from '../UtilComponents/Table/Table';
import Loader from '../Loader/Loader';

//Table Styles ================================================
const LoaderContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh'
}
const TableContainerStyle = {
    boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
    width: '100%'
}
const ColStyles = []
const HeaderStyles = [{
    background: 'rgb(79, 195, 161)',
},
    {
        background: 'rgb(50, 73, 96)',
    },
    {
        background: 'rgb(79, 195, 161)',
    }
]

function MyWords(props) {
    let [state, setState] = useState({words: [], emptyList: false});

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
        wordList.push("Номер");
        wordList.push("Слово");
        wordList.push("Перевод");
        if (data) {
            data.forEach(element => {
                wordList.push(++iterator);
                wordList.push(element.word);
                wordList.push(element.translate);
            })
        }
        setState({words: wordList});
    }

    useEffect(() => {
        if (Firebase.apps.length === 0) {
            Firebase.initializeApp(config);
        }
        props.store.isLogin && getDataFromDB();
    }, [props.store.isLogin])

    return (<div className="my-words">
        {props.store.isLogin ?
            <div className="my-words-container">
                {state.words.length ? <Table
                    style={TableContainerStyle}
                    sizes={{width: ["10%", "45%", "45%"], height: '50px'}}
                    content={state.words}
                    cols={3}
                    firstRowHeader={true}
                    headerStyle={HeaderStyles}
                    colStyles={ColStyles}
                /> : <div style={LoaderContainerStyle}><Loader/></div>}
            </div> : <h1>You not authorized</h1>}
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
)(MyWords);