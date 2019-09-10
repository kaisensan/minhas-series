import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

const Series = ({ location }) => {
  const [data, setData] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get('/api/series')
      .then(res => setData(res.data.data));
  }, []);

  const deleteSerie = id => {
    axios
      .delete('/api/series/' + id)
      .then(res => setData(data.filter(item => item.id !== id)))
      .catch(err => {});
  };

  const addSerie = id => {
    axios
      .post('/api/serieslists/' + id, {}, {
        headers: {
          listid: location.state.user.list_id
        }
      })
      .then(res => setSuccess(true))
      .catch(err => {});
  }

  if (success) {
    return <Redirect to={{
      pathname: '/home',
      state: { user: location.state.user }
    }}/>
  }

  const renderRow = record => {
    return (
      <tr key={record.id}>
        <td>{record.name}</td>
        <td>
          <button className='btn btn-success mr-2' onClick={() => addSerie(record.id)}>Adicionar</button>
          <Link className='btn btn-warning mr-2' to={{
            pathname: `/series/${record.id}`,
            state: { user: location.state.user }
          }}>
            Editar
          </Link>
          <button className='btn btn-danger' onClick={() => deleteSerie(record.id)}>Remover</button>
        </td>
      </tr>
    );
  };

  if (data.length === 0) {
    return (
      <div>
        <Header user={location.state.user} />
        <div className='container'>
          <h1>Séries</h1>
          <Link className='btn btn-primary mb-2' to={{
            pathname: '/series/new',
            state: { user: location.state.user }
          }}>
            Nova Série
          </Link>
          <div className='alert alert-warning' role='alert'>
            Você não possui séries criados.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header user={location.state.user} />
      <div className='container'>
        <h1>Séries</h1>
        {/* <pre>{JSON.stringify(data)}</pre> */}
        <Link className='btn btn-primary mb-2' to={{
          pathname: '/series/new',
          state: { user: location.state.user }
        }}>
          Nova Série
        </Link>
        <table className='table table-dark'>
          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map(renderRow)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Series;
