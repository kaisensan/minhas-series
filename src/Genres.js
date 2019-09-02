import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Genres = () => {
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
  }

  const renderRow = record => {
    return (
      <tr key={record.id}>
        <td>{record.name}</td>
        <td>
          <button className='btn btn-danger mr-2' onClick={() => deleteGenre(record.id)}>Remover</button>
          <Link className='btn btn-warning' to={'/genres/' + record.id}>Editar</Link>
        </td>
      </tr>
    )
  }

  if (data.length === 0) {
    return (
      <div className='container'>
        <h1>Gêneros</h1>
        <Link className='btn btn-primary mb-2' to='/genres/new'>Novo Gênero</Link>
        <div className='alert alert-warning' role='alert'>
          Você não possui gêneros criados.
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <h1>Gêneros</h1>
      {/* <pre>{JSON.stringify(data)}</pre> */}
      <Link className='btn btn-primary mb-2' to='/genres/new'>Novo Gênero</Link>
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
  )
}

export default Genres;
