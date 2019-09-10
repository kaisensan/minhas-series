import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';
import axios from 'axios';
import Header from './Header';

const Home = ({ location }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('/api/serieslists', {
        headers: {
          listid: location.state.user.list_id
        }
      })
      .then(res => {
        const records = res.data.data;

        records.sort((a, b) => {
          if (a.status === 'PENDING' && b.status === 'WATCHED') {
            return -1;
            }
          
          if (a.status === 'WATCHED' && b.status === 'PENDING') {
            return 1;
            }
        
          return 0;
        });

        setData(records);
      });
  }, [location.state.user.list_id]);

  if (data.length === 0) {
    return (
      <div>
        <Header user={location.state.user} />
        <div className='container'>
          <div className='d-flex align-items-center'>
            <h1 className='mr-auto'>Minha Lista</h1>
            <p>Olá, {location.state.user.name}!</p>
          </div>
          <Link className='btn btn-primary mb-2' to={{
            pathname: '/series',
            state: { user: location.state.user }
          }}>
            Adicionar Série
          </Link>
          <div className='alert alert-warning' role='alert'>
            Você não possui séries adicionadas nessa lista.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header user={location.state.user} />
      <div className='container'>
        <div className='d-flex align-items-center'>
          <h1 className='mr-auto'>Minha Lista</h1>
          <p>Olá, {location.state.user.name}!</p>
        </div>
        <Link className='btn btn-primary mb-2' to={{
          pathname: '/series',
          state: { user: location.state.user }
        }}>
          Adicionar Série
        </Link>
        <div className='row d-flex justify-content-around'>
          {data.map(record => (
            <div key={record.serie_id} className='card my-4' style={{width: '18rem'}}>
              <Link to={{
                pathname: `/serieslist/${record.serie_id}`,
                state: { user:  location.state.user }
              }}>
                <img src={record.poster} className='card-img-top' alt='Poster' style={{ height: '429px'}} />
              </Link>
              <div className='card-body'>
                <p className='card-text lead'>{record.name}</p>
                {record.status === 'WATCHED' && <Badge className='mr-2' color='success'>Assistido</Badge>}
                {record.status === 'PENDING' && <Badge className='mr-2' color='warning'>Para assistir</Badge>}
                <p className='d-inline'>Gênero: {record.genre}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
