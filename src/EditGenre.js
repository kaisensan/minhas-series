import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Header from './Header';

const EditGenre = ({ location, match }) => {
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get('/api/genres/' + match.params.id)
      .then(res => setName(res.data.name))
  }, [match.params.id]);

  const onChange = evt => setName(evt.target.value);

  const update = evt => {
    evt.preventDefault();

    axios.put('/api/genres/' + match.params.id, {
      name,
    })
    .then(res => setSuccess(true));
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
        <h1>Editar Gênero</h1>
        <form onSubmit={update}>
          <div className='form-group'>
            <label htmlFor='name'>Nome</label>
            <input type='text' className='form-control' id='name' name='name' value={name} onChange={onChange} placeholder='Nome do gênero' required />
          </div>
          <button type='submit' className='btn btn-primary'>Atualizar</button>
        </form>
      </div>
    </div>
  );
}

export default EditGenre;
