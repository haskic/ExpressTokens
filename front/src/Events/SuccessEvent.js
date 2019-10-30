import React from 'react';

import success from './../icons/success.png';
//style
import './SuccessEvent.scss';

function Success(props){
    
    return(<div className="success-event">
        <img height="25px" width="25px" src={success}></img> <div>{props.text}</div>  
    </div>);

}


export default Success;