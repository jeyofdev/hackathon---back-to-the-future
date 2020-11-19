import './App.css';
import Home from './component/Home';
import { Switch, Route } from 'react-router-dom';
import Choice from './component/Choice';

function App() {
  return (
    <div className="App">
      <Home />

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/choice/:id" component={Choice} />
      </Switch>
    </div>
  );
}

export default App;
