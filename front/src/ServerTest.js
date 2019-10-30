import React from "react";


export default class ServerTest extends React.Component{
    constructor(props){
        super(props);
    }
    buttonHandle = () => {
        let data = {
            name: "Alexander"
        }
        fetch('http://localhost:3001/request',{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

            body: JSON.stringify(data),
        }).then(res => res.json()).then(response => {
            console.log(response.answer)});
    }
    render() {
        return(<div>
            <button onClick={this.buttonHandle}>Send Request</button>
        </div>)
    }

}