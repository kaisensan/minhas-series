import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const NewSerie = () => {
  const [form, setForm] = useState({
    name: '',
    comments: '',
    genre_id: 1,
    status: 'WATCHED'
  });
  const [genres, setGenres] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get('/api/genres')
      .then(res => setGenres(res.data.data));
  }, []);

  const onChange = field => evt => {
    setForm({
      ...form,
      [field]: evt.target.value
    });
  };

  const save = () => {
    axios.post('/api/series', form)
    .then(res => setSuccess(true));
  }

  if (success) {
    return <Redirect to='/series' />
  }

  return (
    <div className='container'>
      <h1>Nova Série</h1>
      {/* <pre>{JSON.stringify(form)}</pre> */}
      <form>
        <div className='form-group'>
          <label htmlFor='name'>Nome</label>
          <input type='text' className='form-control' id='name' value={form.name} onChange={onChange('name')} placeholder='Nome da série' />
        </div>
        <div className='form-group'>
          <label htmlFor='comments'>Comentários</label>
          <input type='text' className='form-control' id='comments' value={form.comments} onChange={onChange('comments')} placeholder='Comentários' />
        </div>
        <div className='form-group'>
          <label htmlFor='genre'>Gênero</label>
          <select className='form-control' id='genre' onChange={onChange('genre_id')} value={form.genre_id}>
            { genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>) }
          </select>
        </div>
        <div className='form-group'>
          <div className='form-check'>
            <input type='radio' className='form-check-input' name='status' id='watched' value='WATCHED' onChange={onChange('status')} checked={form.status === 'WATCHED'} />
            <label className='form-check-label' htmlFor='watched'>Assitido</label>
          </div>
          <div className='form-check'>
            <input type='radio' className='form-check-input' name='status' id='pending' value='PENDING' onChange={onChange('status')} checked={form.status === 'PENDING'} />
            <label className='form-check-label' htmlFor='pending'>Para assistir</label>
          </div>
        </div>
        <button type='button' className='btn btn-primary' onClick={save}>Salvar</button>
      </form>
    </div>
  );
}

export default NewSerie;
