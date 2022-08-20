import React, {useRef, useState, useEffect} from 'react';
import { fetchFotoPerfil } from '../../services/request';
import { CustomCard } from '../CustomCard';
import fotoPerfilPlaceholder from '../../assets/perfilPlaceholder.png'
import './style.css';

function BoxFoto(fotoUser) {
  const imgPerfil = document.querySelector('[data-js="foto-perfil"]');
  const [fotoPerfil, setFotoPerfil] = useState(fotoPerfilPlaceholder);

  useEffect(() => {
    if (typeof fotoUser === 'string') {
      imgPerfil.setAttribute('src', fotoUser);
    }
  }, [fotoUser]);
  
  return (
    <div className='box-foto'>
      <div className='container-foto'>
        <img src={fotoPerfil} className="img-perfil" data-js="foto-perfil"/>
      </div>
    </div>
  )
  
};

export default BoxFoto;