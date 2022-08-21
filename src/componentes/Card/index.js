import React, {useEffect, useState} from 'react';
import BoxFoto from '../BoxFoto';
import logo from '../../assets/logo.png';
import Propriedades from '../Propriedades';
import './style.css';

function Card(nomeUser) {
  const nomeUsuario = document.querySelector('[data-js="nome"]');
  
  useEffect(() => {
    if (typeof nomeUser === 'string') {
      nomeUsuario.textContent = nomeUser;
    }
  }, [nomeUser]);

  
  return (
    <div className='box-card'>
      <div className='box-logo'>
        <img src={logo} />
        <h1 data-js='nome'></h1>
      </div>

      <BoxFoto />
      <Propriedades />

      <div className='marca-rocketcard'>
        <img src={logo} />
        <h1>ROCKETCARD</h1>
      </div>
    </div>
  )
  
};

export default Card;