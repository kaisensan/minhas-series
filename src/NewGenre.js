import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Header from './Header';

const NewGenre = ({ location }) => {
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);

  const onChange = evt => setName(evt.target.value);

  const save = evt => {
    evt.preventDefault();

    axios.post('/api/genres', {
      name,
    })
    .then(res => setSuccess(true))
    .catch(err => {});
  }

  if (success) {
    return <Redirect to={{
      pathname: '/genres',
      state: { user: location.state.user }
    }} />
  }

  return (
    <div>
      <Header user={location.state.user} />
      <div className='container'>
        <h1>Novo Gênero</h1>
        <form onSubmit={save}>
          <div className='form-group'>
            <label htmlFor='name'>Nome</label>
            <input type='text' className='form-control' id='name' name='name' value={name} onChange={onChange} placeholder='Nome do gênero' required />
          </div>
          <button type='submit' className='btn btn-primary'>Salvar</button>
        </form>
      </div>
    </div>
  );
}

export default NewGenre;
