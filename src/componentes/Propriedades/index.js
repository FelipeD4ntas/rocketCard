import React, {useEffect, useRef} from 'react';
import { fetchDadosUsuario } from '../../services/request';
import iconeSeguidores from '../../assets/followers.png';
import iconeSeguindo from '../../assets/following.png';
import iconeRepositorios from '../../assets/repository.png';
import iconeLocalizacao from '../../assets/location.png';
import './style.css';

function Propriedades(dadosUser) {
  const seguidores = document.querySelector('[data-js="seguidores"]');
  const seguindo = document.querySelector('[data-js="seguindo"]');
  const repositorios = document.querySelector('[data-js="repositorios"]');
  const localizacaoUsuario = document.querySelector('[data-js="localizacao"]');

  useEffect(() => {
    if (dadosUser !== undefined) {
      if(dadosUser.length > 0) {
        const numeroSeguidores = dadosUser[0];
        const numeroSeguindo = dadosUser[1];
        const numeroRepositorios = dadosUser[2];
        const localizacao = dadosUser[3];

        seguidores.textContent = numeroSeguidores;
        seguindo.textContent = numeroSeguindo;
        repositorios.textContent = numeroRepositorios;
        localizacaoUsuario.textContent = localizacao;
      }
    }
  }, [dadosUser])


  return (
    <div className='box-propriedades'>
      <div className='propriedade'>
        <img src={iconeSeguidores} />
        <p><span data-js="seguidores"></span> Seguidores</p>
      </div>

      <div className='propriedade'>
        <img src={iconeSeguindo} />
        <p><span data-js="seguindo"></span> Seguindo</p>
      </div>

      <div className='propriedade'>
        <img src={iconeRepositorios} />
        <p><span data-js="repositorios"></span> Repositórios</p>
      </div>
      
      <div className='propriedade'>
        <img src={iconeLocalizacao} />
        <p><span data-js="localizacao"></span></p>
      </div>
  </div>
  )
};

export default Propriedades;