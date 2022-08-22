import React, {useRef, useState, useEffect} from 'react';
import BoxFoto from '../BoxFoto';
import Card from '../Card';
import Propriedades from '../Propriedades';
import {fetchUser, fetchDadosUsuario, fetchFotoPerfil} from '../../services/request';
import './style.css';
import { jsPDF } from "jspdf";

function CustomCard() {
  const nomeUsuario = useRef();
  const [promessaNomeUser, setPromessaNomeUser] = useState();
  const [promessaDadosUser, setPromessaDadosUser] = useState();
  const [promessaFotoUser, setPromessaFotoUser] = useState();
  const [urlFotoUser, setUrlFotoUser] = useState();
  const [nomeUser, setNomeUser] = useState();
  const [dadosUser, setDadosUser] = useState();
  const [molduraCard, setMolduraCard] = useState('');
  const [molduraFotoPerfil, setMolduraFotoPerfil] = useState('');
  
  window.onload = () => {
    setMolduraCard(document.querySelector('.box-card'))
    setMolduraFotoPerfil(document.querySelector('[data-js="foto-perfil"]'))
  }

  function downloadCard() {
    const doc = new jsPDF();
    
    if (window.matchMedia("(min-width: 500px)").matches) {
      doc.html(molduraCard, {
        callback: function (doc) {
          doc.save();
        },
        filename: 'CardGithub',
        x: 13,
        y: 2,
        width: 420,
        windowWidth: 1000
      });
   } else {
      doc.html(molduraCard, {
        callback: function (doc) {
          doc.save();
        },
        filename: 'CardGithub',
        x: 35,
        y: 0,
        width: 500,
        windowWidth: 1517
      });
   }
  }

  function obterNomeUsuario(event) {
    event.preventDefault();
    const nomeUsuarioFormatado = nomeUsuario.current.value.replace('@', '');
    molduraCard.style.left = '0%';
    molduraCard.addEventListener('touchmove', voltarPag);

    function voltarPag(event) {
      event.preventDefault();
      let touch = event.changedTouches[0];
      let touchHorizontal = touch.clientX
      let touchVertical = touch.clientY
     
      if(touchHorizontal < touchVertical) {
          if(touchHorizontal < 100) {
            molduraCard.style.left = '100%';
          } 
      }
    }

    setPromessaNomeUser(fetchUser(nomeUsuarioFormatado));
    setPromessaDadosUser(fetchDadosUsuario(nomeUsuarioFormatado));
    setPromessaFotoUser(fetchFotoPerfil(nomeUsuarioFormatado));
  }

  function mudarTema(event) {
    const temaEscolhido = event.target.classList;
    const temaUm = temaEscolhido.contains('tema-um');
    const temaDois = temaEscolhido.contains('tema-dois');
    const temaTres = temaEscolhido.contains('tema-tres');
    const temaQuatro = temaEscolhido.contains('tema-quatro');
    const temaCinco = temaEscolhido.contains('tema-cinco');

    if (molduraCard && molduraFotoPerfil) {
      if (temaUm) {
      molduraCard.style.borderColor = '#000000';
      molduraFotoPerfil.style.borderColor = '#000000';
      }
      if (temaDois) {
        molduraCard.style.borderColor = '#65BC26';
        molduraFotoPerfil.style.borderColor = '#65BC26';
      }
      if (temaTres) {
        molduraCard.style.borderColor = '#7B3E53';
        molduraFotoPerfil.style.borderColor = '#7B3E53';
      }
      if (temaQuatro) {
        molduraCard.style.borderColor = '#A8C188';
        molduraFotoPerfil.style.borderColor = '#A8C188';
      }
      if (temaCinco) {
        molduraCard.style.borderColor = '#8257E6';
        molduraFotoPerfil.style.borderColor = '#8257E6';
      }
    }
  }

  if (promessaFotoUser && promessaNomeUser && promessaDadosUser) {
    promessaFotoUser.then((response) => setUrlFotoUser(response));
    promessaNomeUser.then((response) => setNomeUser(response));
    promessaDadosUser.then((response) => setDadosUser(response));
  }

  BoxFoto(urlFotoUser);
  Card(nomeUser);
  Propriedades(dadosUser);

  return (
    <form className='form-card' onSubmit={obterNomeUsuario}>
      <label>
        Insira nome de usuario
        <input type='text' placeholder='@userName' ref={nomeUsuario}></input>
      </label>
      <button type='submit' className='botao-buscar-usuario'>Buscar Usuário</button>

      <div className='customizar-card'>
        <p>Customizar Rocktecard</p>
        <div className='box-temas' onClick={mudarTema}>
          <div className='tema tema-um'></div>
          <div className='tema tema-dois'></div>
          <div className='tema tema-tres'></div>
          <div className='tema tema-quatro'></div>
          <div className='tema tema-cinco'></div>
        </div>
      </div>
      <button onClick={downloadCard} className="botao-baixar-card">Baixar Card</button>
    </form>
  )
}

export { CustomCard };