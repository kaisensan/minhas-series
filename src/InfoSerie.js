import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Badge } from 'reactstrap';

const InfoSerie = ({ match }) => {
  const [form, setForm] = useState({});
  const [success, setSuccess] = useState(false);
  const [mode, setMode] = useState('INFO');
  const [data, setData] = useState({});
  const [genres, setGenres] = useState([]);

  const masterHeader = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }

  useEffect(() => {
    axios
      .get('/api/series/' + match.params.id)
      .then(res => {
        setData(res.data);
        setForm(res.data);
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
  }

  const update = () => {
    axios
      .put('/api/series/' + match.params.id, form)
      .then(res => setSuccess(true));
  }

  if (success) {
    return <Redirect to='/series' />
  }

  return (
    <div>
      <header style={masterHeader}>
        <div className='h-100' style={{ background: 'rgba(0, 0, 0, 0.7)' }}>
          <div className='h-100 container'>
            <div className='row h-100 align-items-center'>
              <div className='col-3'>
                <img className='img-fluid img-thumbnail' src={data.poster} alt='Poster' />
              </div>
              <div className='col-9'>
                <h1 className='font-weight-light text-white'>{data.name}</h1>
                <div className='lead text-white'>
                  { data.status === 'WATCHED' && <Badge className='mr-2' color='success'>Assistido</Badge> }
                  { data.status === 'PENDING' && <Badge className='mr-2' color='warning'>Para assistir</Badge> }
                  Gênero: {data.genre}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className='container'>
        <button className='btn btn-primary my-2' onClick={() => setMode('EDIT')}>Editar</button>
      </div>
      {
        mode === 'EDIT' &&
        <div className='container pb-2'>
          <h1>Editar Série</h1>
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
            <button className='btn btn-primary mr-2' onClick={() => setMode('INFO')}>Cancelar</button>
            <button type='button' className='btn btn-primary' onClick={update}>Atualizar</button>
          </form>
        </div>
      }
    </div>
  );
}

export default InfoSerie;
