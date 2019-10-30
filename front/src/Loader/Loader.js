import React from 'react';
//style loader
import "./Loader.scss";

function Loader() {
    return (<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>);
}

export default Loader;