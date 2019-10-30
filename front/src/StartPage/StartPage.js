import React from 'react';

//icons
import backgroundStartPage from './../backgroundStartPage.jpg';
import addWordIco from './../icons/font-size.png';
import removeWordIco from './../icons/file.png';
import listIco from './../icons/list.png';
import interfaceIco from './../icons/responsive.png';

import './StartPage.scss';

function StartPage() {
    return (<div className="start-page" style={{ background: `url(${backgroundStartPage})` }}>
        <h2>Zhakar Dictionary</h2>
        <div className="block-container">
            <div className="block"><div className="title-image"><img src={addWordIco}></img></div><div className="block-title">Add words</div></div>
            <div className="block"><div className="title-image"><img src={removeWordIco}></img></div><div className="block-title">Remove words</div></div>
            <div className="block"><div className="title-image"><img src={listIco}></img></div><div className="block-title">Own list</div></div>
            <div className="block"><div className="title-image"><img src={interfaceIco}></img></div><div className="block-title">Pleasure interface</div></div>
        </div>

    </div>);
}


export default StartPage;