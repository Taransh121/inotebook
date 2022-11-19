// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route,} from "react-router-dom";
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { About } from './components/About';
import NoteState from './context/NoteState';
import { Alert } from './components/Alert';

function App() {
  return (
    <>
    <NoteState>  {/*We have wrapped our entire application inside this NoteState as we want that all the components to get access to the states. */}
      <Router>
        <Navbar />
        <Alert alertMessage={"This is a Primary Alert"}/>
        <div className="container">
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
