import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const NewGenre = () => {
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);

  const onChange = evt => setName(evt.target.value);

  const save = () => {
    axios.post('/api/genres', {
      name,
    })
    .then(res => setSuccess(true));
  }

  if (success) {
    return <Redirect to='/genres' />
  }

  return (
    <div className='container'>
      <h1>Novo Gênero</h1>
      <form>
        <div className='form-group'>
          <label htmlFor='name'>Nome</label>
          <input type='text' className='form-control' id='name' value={name} onChange={onChange} placeholder='Nome do gênero' />
        </div>
        <button type='button' className='btn btn-primary' onClick={save}>Salvar</button>
      </form>
    </div>
  );
}

export default NewGenre;
