import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux';
import {Redirect,useParams} from 'react-router-dom';
import retoken from './../retoken/retoken';
import Firebase from 'firebase';
import Cookies from 'universal-cookie';
//import firebase config
import {config} from './../config';
function LogChecker(props){
    useEffect(() => {
        checkCooks();
    }, []);
    let [state,setState] = useState({login: false});
    let {url} = useParams();

    if (url == undefined){
        url = ""
    }
    const cookies = new Cookies();

    let redirectUrl = "/" + url;
    console.log("URL",url);
    function signIn(token, fingerPrint) {
        console.log("TRY LOG");
        console.log("COOKS",token);
        fetch(`${config.url}/api/login/co`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
            body: JSON.stringify({'fingerPrint': fingerPrint})
        }).then(res => {
            if (res.status === 401){
                console.log("EXIT LOGIN");
                throw new Error("Exit login");
            }
            return res.json()
        }).then(response => {
            console.log("RESPONSE", response);
            if (response.isLogin){
                console.log("TOKEN",response.refreshToken);
                console.log("ACCESSTOKEN",response.accessToken);
                setCookies(response.refreshToken);
                props.changeEmail(response.email);
                props.changeIsLogin(true);
                props.changeAccessToken(response.accessToken);
                retoken(response.accessToken);
                setState({isLogin: true});

            }
        }).catch(function (err) {
            return err;
        })
    }
    function setCookies(token) {
        cookies.set('token', token, {path: '/'});
        console.log("NEW COOKS:",cookies.get("token"));
    }
    function checkCooks() {
        if (cookies.get('token') !== undefined) {
            try {
                signIn(cookies.get('token'), 'zhakar');
            } catch (error) {
                console.error(error);
            }
        }
        
    }
    return(<div>
        {!props.store.isLogin?<Redirect to={redirectUrl}/>:null}
        {state.login?<Redirect to={redirectUrl}/>:null}

    </div>
    );
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        changeIsLogin: (value) => {
            dispatch({ type: 'ISLOGIN', isLogin: value })
        },
        changeEmail: (value) => {
            dispatch({ type: 'AUTH_INFO', email: value })
        },
        changeAccessToken: (value) => {
            dispatch({type: 'ACCESS_TOKEN', token: value})
        }
    })
)(LogChecker);