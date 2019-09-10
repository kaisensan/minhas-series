import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Badge } from 'reactstrap';
import axios from 'axios';
import Header from './Header';

const InfoSerie = ({ location, match }) => {
  const [data, setData] = useState({});
  const [form, setForm] = useState({});
  const [success, setSuccess] = useState(false);
  const [mode, setMode] = useState('INFO');

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
      .get('/api/serieslists/' + match.params.id, {
        headers: {
          listid: location.state.user.list_id
        }
      })
      .then(res => {
        setData(res.data);
        setForm({
          status: res.data.status,
          comments: res.data.comments
        });
      });
  }, [match.params.id, location.state.user.list_id]);

  const onChange = field => evt => {
    setForm({
      ...form,
      [field]: evt.target.value
    });
  };

  const update = evt => {
    evt.preventDefault();

    axios
      .put('/api/serieslists/' + match.params.id, {
        ...form
      }, {
        headers: {
          listid: location.state.user.list_id
        }
      })
      .then(res => setSuccess(true));
  };

  const deleteSerie = () => {
    axios
      .delete('/api/serieslists/' + match.params.id, {
        headers: {
          listid: location.state.user.list_id
        }
      })
      .then(res => setSuccess(true));
  };

  if (success) {
    return <Redirect to={{
      pathname: '/home',
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
                <div className='lead text-white'>
                  {data.status === 'WATCHED' && <Badge className='mr-2' color='success'>Assistido</Badge>}
                  {data.status === 'PENDING' && <Badge className='mr-2' color='warning'>Para assistir</Badge>}
                  <p className="d-inline">Gênero: {data.genre}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className='container'>
        <button className='btn btn-primary my-2' onClick={() => setMode('EDIT')}>Info</button>
        <button className='btn btn-danger my-2 ml-2' onClick={deleteSerie}>Retirar</button>
      </div>
      {
        mode === 'EDIT' &&
        <div className='container pb-2'>
          <h1>Anotações</h1>
          {/* <pre>{JSON.stringify(form)}</pre> */}
          <form onSubmit={update}>
            <div className='form-group'>
              <label htmlFor='comments'>Comentários</label>
              <input type='text' className='form-control' id='comments' name='comments' value={form.comments} onChange={onChange('comments')} placeholder='Comentários' />
            </div>
            <div className='form-group'>
              <div className='form-check'>
                <input type='radio' className='form-check-input' id='watched' name='status' value='WATCHED' onChange={onChange('status')} checked={form.status === 'WATCHED'} />
                <label className='form-check-label' htmlFor='watched'>Assitido</label>
              </div>
              <div className='form-check'>
                <input type='radio' className='form-check-input' id='pending' name='status' value='PENDING' onChange={onChange('status')} checked={form.status === 'PENDING'} />
                <label className='form-check-label' htmlFor='pending'>Para assistir</label>
              </div>
            </div>
            <button type='submit' className='btn btn-primary mr-2'>Atualizar</button>
            <button className='btn btn-primary' onClick={() => setMode('INFO')}>Cancelar</button>
          </form>
        </div>
      }
    </div>
  );
}

export default InfoSerie;
