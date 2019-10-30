function reducer(state = {}, action) {
    let newState = Object.assign({},state);
    if (action.type == "ADD_WORD") {
        if (newState.words == undefined){
            newState.words = [];
        }
        Object.assign(newState, { words: [...newState.words, { word: action.word, translate: action.translate }] });
        return newState;
    }
    if (action.type == "ISLOGIN") {
        Object.assign(newState, { isLogin: action.isLogin });
        return newState;
    }
    if (action.type == "AUTH_INFO") {
        Object.assign(newState, { email: action.email });
        return newState;
    }
    if (action.type == "ACCESS_TOKEN"){
        Object.assign(newState, { accessToken: action.token });
        console.log("AHAHAHAHAHHAAHHAHAHA")
        return newState;
    }
    
    return newState;
}

export default reducer;