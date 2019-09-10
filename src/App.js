import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Home from './Home';
import InfoSerie from './InfoSerie';
import Genres from './Genres';
import NewGenre from './NewGenre';
import EditGenre from './EditGenre';
import Series from './Series';
import NewSerie from './NewSerie';
import EditSerie from './EditSerie';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={LogIn} />
        <Route path='/signup' exact component={SignUp} />
        <Route path='/home' exact component={Home} />
        <Route path='/serieslist/:id' exact component={InfoSerie} />
        <Route path='/genres' exact component={Genres} />
        <Route path='/genres/new' exact component={NewGenre} />
        <Route path='/genres/:id' exact component={EditGenre} />
        <Route path='/series' exact component={Series} />
        <Route path='/series/new' exact component={NewSerie} />
        <Route path='/series/:id' exact component={EditSerie} />
      </Switch>
    </Router>
  );
}

export default App;
