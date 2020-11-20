import './App.css';
import Home from './component/Home';
import { Switch, Route } from 'react-router-dom';
import Choice from './component/Choice';
import Button from './component/Button';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/choice/:id" component={Choice} />
        <Route path="/button/:id/" component={Button} />
      </Switch>
    </div>
  );
}

export default App;
