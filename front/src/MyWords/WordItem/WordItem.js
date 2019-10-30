import React from 'react';
import deleteico from './../../icons/deleteIco.png';

//style
import './WordItem.scss';

function WordItem(props) {

    return (
        (props.header ? <React.Fragment className="zhakar">
                    <div className="col-word-list" id="col-header">{props.word}</div>
                    <div className="col-word-list" id="col-header">{props.translate}</div>
                    <div className="col-word-list">
                        <div className="delete-container"><img src={deleteico}></img></div>
                    </div>

                </React.Fragment>
                :
                <React.Fragment className="zhakar">

                    <div className="col-word-list">{props.word}</div>
                    <div className="col-word-list">{props.translate}</div>
                    <div className="col-word-list">
                        <div className="delete-container"><img src={deleteico}></img></div>
                    </div>
                </React.Fragment>
        )
    )
}

export default WordItem;