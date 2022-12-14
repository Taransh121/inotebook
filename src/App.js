// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route,} from "react-router-dom";
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { About } from './components/About';
import NoteState from './context/NoteState';
import { Alert } from './components/Alert';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert=(message,type)=>{
    setAlert({message,type})
    setTimeout(()=>{
      setAlert(null)
    },2000);

  }
  return (
    <>
    <NoteState>  {/*We have wrapped our entire application inside this NoteState as we want that all the components to get access to the states. */}
      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
        <Switch>
          <Route exact path="/">
            <Home showAlert={showAlert} />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/login">
            <Login showAlert={showAlert}/>
          </Route>
          <Route exact path="/signup">
            <Signup showAlert={showAlert}/>
          </Route>
          
        </Switch>
        </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
