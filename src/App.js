import React/*, { useState, useEffect }*/ from 'react';
// import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Genres from './Genres';
import NewGenre from './NewGenre';
import EditGenre from './EditGenre';
import Series from './Series';
import NewSerie from './NewSerie';
import InfoSerie from './InfoSerie';

function App() {
  // const [data, setData] = useState({});

  // useEffect(() => {
  //   axios.get('/api').then(res => setData(res.data));
  // }, []);

  return (
    <Router>
      <div>
        <Header />
        {/* <pre>{JSON.stringify(data)}</pre> */}
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/genres' exact component={Genres} />
          <Route path='/genres/new' exact component={NewGenre} />
          <Route path='/genres/:id' exact component={EditGenre} />
          <Route path='/series' exact component={Series} />
          <Route path='/series/new' exact component={NewSerie} />
          <Route path='/series/:id' exact component={InfoSerie} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
