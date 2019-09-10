import React, { useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

const LogIn = () => {
  const [form, setForm] = useState({ email: '' });
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState({});

  const onChange = field => evt => {
    setForm({
      [field]: evt.target.value
    });
  };

  const login = evt => {
    evt.preventDefault();

    axios.post('/api/login', {
      ...form
    })
    .then(res => {
      setUser(res.data);
      setSuccess(true);
    })
    .catch(err => {});
  }

  if (success) {
    return <Redirect to={{
      pathname: '/home',
      state: { user }
    }}/>
  }

  return (
    <div className='container'>
      <h1>Login</h1>
      <div className='row h-100 justify-content-center'>
        <form className='col-6' onSubmit={login}>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type='email' className='form-control' id='email' name='email' value={form.email} onChange={onChange('email')} placeholder='Email' />
          </div>
          <button type='submit' className='btn btn-success mr-2'>Entrar</button>
          <Link className='btn btn-primary' to='/signup'>Cadastrar</Link>
        </form>
      </div>
    </div>  
  );
}

export default LogIn;
