import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

const Genres = ({ location }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('/api/genres')
      .then(res => setData(res.data.data))
  }, []);

  const deleteGenre = id => {
    axios
      .delete('/api/genres/' + id)
      .then(res => setData(data.filter(item => item.id !== id)))
      .catch(err => {});
  }

  const renderRow = record => {
    return (
      <tr key={record.id}>
        <td>{record.name}</td>
        <td>
          <Link className='btn btn-warning mr-2' to={{
            pathname: `/genres/${record.id}`,
            state: { user: location.state.user }
          }}>
            Editar
          </Link>
          <button className='btn btn-danger' onClick={() => deleteGenre(record.id)}>Remover</button>
        </td>
      </tr>
    )
  }

  if (data.length === 0) {
    return (
      <div>
        <Header user={location.state.user} />
        <div className='container'>
          <h1>Gêneros</h1>
          <Link className='btn btn-primary mb-2' to={{
            pathname: '/genres/new',
            state: { user: location.state.user }
          }}>
            Novo Gênero
          </Link>
          <div className='alert alert-warning' role='alert'>
            Você não possui gêneros criados.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header user={location.state.user} />
      <div className='container'>
        <h1>Gêneros</h1>
        {/* <pre>{JSON.stringify(data)}</pre> */}
        <Link className='btn btn-primary mb-2' to={{
          pathname: '/genres/new',
          state: { user: location.state.user }
        }}>
          Novo Gênero
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
  )
}

export default Genres;
