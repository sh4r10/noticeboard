import React, {useState} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootswatch/dist/litera/bootstrap.min.css";
import "../css/App.css";

import Login from "./Login";
import NotesView from "./NotesView";
import Navbar from "./Navbar";
import CreateNote from "./CreateNote"
import EditNote from "./EditNote";

function App(props) {
  const [loggedIn, setLogin] = useState(sessionStorage.getItem("token") ? true : false);
  const [subscribed, setSub] = useState(localStorage.getItem("subbed") ? true : false);
  const Host = "https://munob.herokuapp.com";

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  
  const subscribe = async () => {
    const register = await navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/serviceWorker.js`, {
      scope: "/"
    });
    const publicVapidKey = "BGZpPKao_Ys-a6IwmeITyD5j2oqH3Oc74c3BbaEOeJ94Lm7pusHcepolWmrkWBJ9pVWuO0J6hCJ4-41uqbA79nQ";
    let sw = await navigator.serviceWorker.ready;
    let push = await sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
      })
    await fetch(Host+"/subscribe",{
      method: "POST",
      body: JSON.stringify(push),
      headers: {
        'content-type': 'application/json'
      }
    })
      localStorage.setItem("subbed", "yes");
      setSub(true);
      window.location = "/";
  }

  const clearStorage = () => {
    localStorage.removeItem("subbed");
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for(let registration of registrations) {
       registration.unregister()
     } });
  }

  
  return (
    <Router>
      {loggedIn ? <Navbar /> : null}
      {!subscribed ? <button onClick={subscribe}>Notifications on!</button> : null}
      <div className="container">
        <Route path="/" exact render={() => <NotesView host={Host} loggedIn={loggedIn}/>}/>
        <Route path="/login" exact render={()=> <Login host={Host} setLogin={setLogin}/>}/>
        <Route path="/create" exact render={()=> <CreateNote setLogin={setLogin} host={Host}/>}/>
        <Route path="/edit/:id" render={()=> <EditNote setLogin={setLogin} host={Host}/>}/>
      </div>
      <footer><p>Created By <a href="https://github.com/sh4r10" rel="noopener noreferrer" target="_blank">sh4r10</a>. All Rights <span onDoubleClick={clearStorage}>Reserved.</span></p></footer>
    </Router>
  );
}

export default App;
