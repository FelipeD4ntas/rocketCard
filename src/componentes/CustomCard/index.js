import React, {useRef, useState} from 'react';
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
  

  function downloadCard() {
    const card = document.querySelector('.box-card');
    const doc = new jsPDF();
    
    if (window.matchMedia("(min-width: 500px)").matches) {
      doc.html(card, {
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
      doc.html(card, {
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

    setPromessaNomeUser(fetchUser(nomeUsuarioFormatado));
    setPromessaDadosUser(fetchDadosUsuario(nomeUsuarioFormatado));
    setPromessaFotoUser(fetchFotoPerfil(nomeUsuarioFormatado));
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

      <button type='submit'>Buscar Usuário</button>
      <button onClick={downloadCard}>Baixar Card</button>
    </form>
  )
}

export { CustomCard };