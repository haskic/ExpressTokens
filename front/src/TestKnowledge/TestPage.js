import React, {useState} from 'react'

import TestMenu from './TestMenu'
import TestWindow from "./TestWindow";

//style
import './TestPage.scss';
import {connect} from "react-redux";

function TestPage(props) {
    let [isPrimaryLanguage, setPrimaryLanguage] = useState(null);
    return (<div className="test-page">
        {props.store.isLogin ? <React.Fragment>
                <TestMenu setPrimaryLanguage={setPrimaryLanguage}></TestMenu>
                <TestWindow isPrimaryLanguage={isPrimaryLanguage}></TestWindow>
            </React.Fragment>
            : null
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
)(TestPage);