import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Series = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('/api/series')
      .then(res => setData(res.data.data));
  }, []);

  const deleteSerie = id => {
    axios
      .delete('/api/series/' + id)
      .then(res => setData(data.filter(item => item.id !== id)));
  }

  const renderRow = record => {
    return (
      <tr key={record.id}>
        <th scope='row'>{record.id}</th>
        <td>{record.name}</td>
        <td>
          <button className='btn btn-danger mr-2' onClick={() => deleteSerie(record.id)}>Remover</button>
          <Link className='btn btn-warning' to={'/series/' + record.id}>Info</Link>
        </td>
      </tr>
    );
  }

  if (data.length === 0) {
    return (
      <div className='container'>
        <h1>Séries</h1>
        <Link className='btn btn-primary mb-2' to='/series/new'>Nova Série</Link>
        <div className='alert alert-warning' role='alert'>
          Você não possui séries criados.
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <h1>Séries</h1>
      <Link className='btn btn-primary mb-2' to='/series/new'>Nova Série</Link>
      <table className='table table-dark'>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Name</th>
            <th scope='col'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map(renderRow)}
        </tbody>
      </table>
      {/* <pre>{JSON.stringify(data)}</pre> */}
    </div>
  )
}

export default Series;
