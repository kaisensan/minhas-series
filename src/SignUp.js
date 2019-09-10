import React, { useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

const SignUp = () => {
  const [form, setForm] = useState({ name: '', email: '' });
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState({});

  const onChange = field => evt => {
    setForm({
      ...form,
      [field]: evt.target.value
    });
  };

  const signup = evt => {
    evt.preventDefault();

    axios.post('/api/signup', {
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
      <h1>Sign up</h1>
      <div className='row h-100 justify-content-center'>
        <form className='col-6' onSubmit={signup}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input type='text' className='form-control' id='name' name='name' value={form.name} onChange={onChange('name')} placeholder='Nome' required />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type='email' className='form-control' id='email' name='email' value={form.email} onChange={onChange('email')} placeholder='Email' required />
          </div>
          <button type='submit' className='btn btn-success mr-2'>Cadastrar</button>
          <Link className='btn btn-primary' to='/'>Cancelar</Link>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
