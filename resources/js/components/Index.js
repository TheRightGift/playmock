import React,{Fragment, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import Home from './Home';
import Register from './auth/Register';

function App() {
    useEffect(()=>{
        // Init Materialize JS
        M.AutoInit();
    })
    return (
        <Fragment>
                <Routes>
                    <Route  path="/" element={<Home />} />  
                    <Route  path="/register" element={<Register />} />                  
                </Routes>  
        </Fragment>
    );
}

export default App;

if (document.getElementById('mainView')) {
    ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('mainView'));
}
