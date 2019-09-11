import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Header from './Header';

const NewSerie = ({ location }) => {
  const [form, setForm] = useState({ name: '' });
  const [genres, setGenres] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get('/api/genres')
      .then(res => {
        setGenres(res.data.data);
        setForm(f => {
          return {
            ...f,
            genre_id: res.data.data[0].id
          }
        })
      });
  }, []);

  const onChange = field => evt => {
    setForm({
      ...form,
      [field]: evt.target.value
    });
  };

  const save = evt => {
    evt.preventDefault();

    axios.post('/api/series', form)
    .then(res => setSuccess(true))
    .catch(err => {});
  }

  if (success) {
    return <Redirect to={{
      pathname: '/series',
      state: { user: location.state.user }
    }}/>
  }

  return (
    <div>
      <Header user={location.state.user} />
      <div className='container'>
        <h1>Nova Série</h1>
        {/* <pre>{JSON.stringify(form)}</pre> */}
        <form onSubmit={save}>
          <div className='form-group'>
            <label htmlFor='name'>Nome</label>
            <input type='text' className='form-control' id='name' name='name' value={form.name} onChange={onChange('name')} placeholder='Nome da série' required />
          </div>
          <div className='form-group'>
            <label htmlFor='genre'>Gênero</label>
            <select className='form-control' id='genre' name='genre_id' value={form.genre_id} onChange={onChange('genre_id')}>
              { genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>) }
            </select>
          </div>
          <button type='submit' className='btn btn-primary'>Salvar</button>
        </form>
      </div>
    </div>
  );
}

export default NewSerie;
