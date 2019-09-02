import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('/api/series')
      .then(res => {
        const records = res.data.data;

        // Put the series that are pending to watch to appear first
        records.forEach((r, i, a) => {
          if (r.status === 'PENDING') {
            a.splice(i, 1);
            a.unshift(r);
          }
        });

        // records.sort((a, b) => {
        //   if (a.status === 'PENDING' && b.status === 'WATCHED') {
        //     return -1;
        //     }
          
        //   if (a.status === 'WATCHED' && b.status === 'PENDING') {
        //     return 1;
        //     }
        
        //   return 0;
        // });

        setData(records);
      });
  }, []);

  return (
    <div className='container'>
      <h1>Home</h1>
      <div className='row d-flex justify-content-around'>
        {data.map(record => (
          <div key={record.id} className='card my-4' style={{width: '18rem'}}>
            <Link to={'/series/' + record.id}>
              <img src={record.poster} className='card-img-top' alt='Poster' style={{ height: '429px'}} />
            </Link>
            <div className='card-body'>
              <p className='card-text lead'>{record.name}</p>
              {record.status === 'WATCHED' && <Badge className='mr-2' color='success'>Assistido</Badge>}
              {record.status === 'PENDING' && <Badge className='mr-2' color='warning'>Para assistir</Badge>}
              <p className='d-inline'>Gênero: {record.genre}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
