import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

const EditSerie = ({ location, match }) => {
  const [data, setData] = useState({});
  const [form, setForm] = useState({ name: '' });
  const [success, setSuccess] = useState(false);
  const [genres, setGenres] = useState([]);

  const masterHeader = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  useEffect(() => {
    axios
      .get('/api/series/' + match.params.id)
      .then(res => {
        setData(res.data);
        setForm({
          name: res.data.name,
          genre_id: res.data.genre_id
        });
      });
  }, [match.params.id]);

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

  const update = evt=> {
    evt.preventDefault();

    axios
      .put('/api/series/' + match.params.id, form)
      .then(res => setSuccess(true));
  };

  if (success) {
    return <Redirect to={{
      pathname: '/series',
      state: { user: location.state.user }
    }}/>
  }

  return (
    <div>
      <Header user={location.state.user} />
      <header style={masterHeader}>
        <div className='h-100' style={{ background: 'rgba(0, 0, 0, 0.7)' }}>
          <div className='container h-100'>
            <div className='row h-100 align-items-center'>
              <div className='col-3'>
                <img className='img-fluid img-thumbnail' src={data.poster} alt='Poster' />
              </div>
              <div className='col-9'>
                <h1 className='font-weight-light text-white'>{data.name}</h1>
                <div className='lead text-white'>Gênero: {data.genre}</div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className='container'>
        <h1>Editar Série</h1>
        {/* <pre>{JSON.stringify(form)}</pre> */}
        <form onSubmit={update}>
          <div className='form-group'>
            <label htmlFor='name'>Nome</label>
            <input type='text' className='form-control' id='name' name='name' value={form.name} onChange={onChange('name')} placeholder='Nome da série' required />
          </div>
          <div className='form-group'>
            <label htmlFor='genre'>Gênero</label>
            <select className='form-control' id='genre' name='genre_id' value={form.genre_id} onChange={onChange('genre_id')}>
              {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
            </select>
          </div>
          <button type='submit' className='btn btn-primary'>Atualizar</button>
        </form>
      </div>
    </div>
  );
}

export default EditSerie;
