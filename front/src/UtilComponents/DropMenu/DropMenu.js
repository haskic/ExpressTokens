import React, { useState, useEffect } from 'react'
import './DropMenu.scss';


function DropMenu(props) {
    let itemAnimationStyle = {
        height: '0px'
    }
    let dropMenuStyle = {
        display: "flex",
        flexDirection: 'column',
        border: "1px solid black",
    }
    let dropMenuItemStyle = {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }

    let dropMenuPointItemStyle = {
        display: "flex",
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    }
    let dropMenuItemAnimaStyle = {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
    let menuObject = {
        privet: {
            text: "mainPoint",
            scalable: true,
            childs: {
                hello: { text: '1 point' },
                hello2: { text: '2 point' }
            }
        }
    }
    let [state, setState] = useState({ textShow: false,objMenuArray:[] });
    for (let key in props.dropMenuStyle) {
        dropMenuStyle[key] = props.dropMenuStyle[key];
    }
    Object.assign(dropMenuStyle, props.dropMenuStyle);
    Object.assign(dropMenuItemStyle, props.dropMenuItemStyle);
    Object.assign(dropMenuPointItemStyle, props.dropMenuItemStyle);
    Object.assign(dropMenuItemAnimaStyle, props.dropMenuItemStyle, itemAnimationStyle);
    const className = props.className;
    let objMenuArray = [];

    function childsParse(obj, mass) {
        setState({ [obj.id]: true });
        for (let key in obj) {
            if (key == "childs") {
                console.log(obj[key].name);
                for (let cKey in obj[key]) {
                    console.log("CHILD",obj[key][cKey].text);
                    mass.push(
                        <DropMenuItem text={obj[key][cKey].text} style={dropMenuItemAnimaStyle}
                            className={className} textShow={true} ></DropMenuItem>,
                    )
                }
                childsParse(obj[key], mass);
            }
        }

    }

    function parseObject(obj, mass) {
       childsParse(obj,mass);
        // for (let key in obj) {
        //     console.log("CKEY = ",key)
        //     childsParse(obj[key], mass);
        // }
    }
    useEffect(() => {
        for (let key in menuObject) {
            console.log("KEY=",key)
            if (!menuObject[key].scalable) {
            console.log("XUY")
                objMenuArray.push(
                    <DropMenuItem text="test by days" style={dropMenuItemAnimaStyle} className={className} textShow={state.textShow} ></DropMenuItem>,
                )
            }
            else {
            console.log("XUY SCALABLE");
                let childs = [];
                parseObject(menuObject[key], childs);
                console.log("LENGTH=", childs);
                objMenuArray.push(
                    <DropMenuPointItem text={menuObject[key].text} style={dropMenuPointItemStyle} classNameItem={className} showText={showOn} hideText={showOff}
                        items={childs}>
                    </DropMenuPointItem>)
            }

        }; setState({objMenuArray: objMenuArray});
        console.log("OBJ=", objMenuArray);
    }, []);

    function showOff() {
        setState({ textShow: false });
        console.log("XUYESOS OFF")
    }
    function showOn() {
        setState({ textShow: true });
        console.log("XUYESOS ON");
    }
   
    return (<div style={dropMenuStyle}>
        <ul style={{ width: "100%" }}>
            {/* <DropMenuPointItem text="extand" style={dropMenuPointItemStyle} classNameItem={className} showText={showOn} hideText={showOff} items={[
                <DropMenuItem text="test by days" style={dropMenuItemAnimaStyle} className={className} textShow={state.textShow} ></DropMenuItem>,
                <DropMenuItem text="test by days" style={dropMenuItemAnimaStyle} className={className} textShow={state.textShow} ></DropMenuItem>,
                <DropMenuItem text="test by days" style={dropMenuItemAnimaStyle} className={className} textShow={state.textShow} ></DropMenuItem>
            ]}></DropMenuPointItem>
            <DropMenuPointItem text="extand" style={dropMenuPointItemStyle} classNameItem={className + "1"} showText={showOn} hideText={showOff} items={[
                <DropMenuItem text="test by days" style={dropMenuItemAnimaStyle} className={className + "1"} textShow={state.textShow}></DropMenuItem>,
                <DropMenuItem text="test by days" style={dropMenuItemAnimaStyle} className={className + "1"} textShow={state.textShow}></DropMenuItem>,
                <DropMenuItem text="test by days" style={dropMenuItemAnimaStyle} className={className + "1"} textShow={state.textShow}></DropMenuItem>
            ]}></DropMenuPointItem> */}
            {state.objMenuArray}
        </ul>
    </div>)

}

function DropMenuPointItem(props) {
    const className = props.classNameItem;
    function animationOpen() {
        console.log("OPENED");
        setTimeout(() => {
            let element = document.getElementsByClassName(className);
            for (let i = 0; i < element.length; i++) {
                element[i].style.height = "50px";
            }
        }, 0);
        // setTimeout(() => {
        //     props.showText();
        // }, 10000);
    }
    function animationClose() {
        // props.hideText();
        setTimeout(() => {
            let element = document.getElementsByClassName(className);

            for (let i = 0; i < element.length; i++) {
                element[i].style.height = "0";
            }
            setTimeout(() => {
                setState({ show: false });

            }, 600);
        }, 100);
    }
    let [state, setState] = useState({ show: false });
    const toggleShow = () => {
        if (state.show) {
            console.log("WILL CLOSED")
            animationClose();
        }
        else {
            console.log("WILL OPEN")

            animationOpen();
            setState({ show: true });
        }
    }
    return (<React.Fragment>
        <li style={props.style} onClick={() => { toggleShow(); }} >{props.text}</li>
        {state.show ?// style={{display: 'flex',flexDirection: "column",width:"100%"}}
            <ul >
                {props.items}
            </ul>
            : null}
    </React.Fragment>


    )
}

function DropMenuItem(props) {
    return (
        <li className={props.className} style={props.style}>{props.textShow ? props.text : null}</li>
    )
}


export default DropMenu;