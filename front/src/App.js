import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer/reducer';

//My Modules
import Page from './Page/Page';

//style
import './App.css';

const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Page/>
        </Router>
      </div>
    </Provider>

  );
}


// store.dispatch({ type: 'ISLOGIN', isLogin: true })
// store.dispatch({ type: 'AUTH_INFO', email: "kot3sany@gmail.com" })

export default App;
