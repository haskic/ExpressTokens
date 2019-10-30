import React, {createRef, useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Cookies from 'universal-cookie';

//style
import './Menu.scss';

const visibleSubMenu = {
    display: 'block',
    position: 'absolute',
    top: '100%',
    zIndex: 10,

}


const unVisibleSubMenu = {
    display: 'none'
}


function clearCooks() {
    let cookies = new Cookies();
    cookies.remove('token', {path: '/'});
}

function useForceUpdate() {
    const [value, set] = useState(true); //boolean state
    return () => set(value => !value); // toggle the state to force render
}

function Menu(props) {
    const forceUpdate = useForceUpdate();
    let [isShowMenu, setShowMenu] = useState(false);
    let Node = useRef();
    useEffect(() => {
        
        document.addEventListener('mousedown',handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown',handleOutsideClick);
        }
    },[])
    function handleOutsideClick(e) {
        if (Node.current != undefined){
            if (Node.current.contains(e.target)) {
                return;
            }
            setShowMenu(false);
        }
    }
    function showToggle() {
        if (isShowMenu) {
            setShowMenu(false);
        } else {
            setShowMenu(true);
        }

    }

    return (<div className="menu-block" >
        <div className="logo">ZHAKAR CORP.</div>
        <ul className="menu">
            {!props.store.isLogin ? <Link to="/login"><li>Войти</li></Link> : null}
            {!props.store.isLogin ?
                null
                :
                <li  onClick={showToggle} id={"subMenu"} ref={Node}> Профиль
                    {
                        isShowMenu ?
                            <ul>
                                <li>Мой профиль</li>
                                <li>Изменить</li>
                                <li>Настройки</li>
                                <Link onClick={() => {
                                    props.changeIsLogin(false);
                                    clearCooks();
                                    forceUpdate()
                                }} to="/">
                                    <li> Выйти</li>
                                </Link>
                            </ul> :
                            null
                    }
                </li>
            }

            {props.store.isLogin ?
                null
                : <Link to="/reg">
                    <li>
                        Регистрация
                    </li>
                </Link>}
            {props.store.isLogin ?
                <Link to="/mywords">
                    <li>
                        Мои слова
                    </li>
                </Link>
                : null}
            {props.store.isLogin ?
                <Link to="/addword">
                    <li>
                        Добавить слово
                    </li>
                </Link>
                : null}
            {props.store.isLogin ?
                <Link to="/mytest">
                    <li>
                        Тест знаний
                    </li>
                </Link>
                : null}
        </ul>
    </div>)
}


export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        changeIsLogin: (value) => {
            dispatch({type: 'ISLOGIN', isLogin: value})
        },
        changeEmail: (value) => {
            dispatch({type: 'AUTH_INFO', email: value})
        }
    })
)(Menu);