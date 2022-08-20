import React, {useRef, useState} from 'react';
import BoxFoto from '../BoxFoto';
import Card from '../Card';
import Propriedades from '../Propriedades';
import {fetchUser, fetchDadosUsuario, fetchFotoPerfil} from '../../services/request'
import './style.css';

function CustomCard() {
  const nomeUsuario = useRef();
  const [promessaNomeUser, setPromessaNomeUser] = useState();
  const [promessaDadosUser, setPromessaDadosUser] = useState();
  const [promessaFotoUser, setPromessaFotoUser] = useState();
  
  const [urlFotoUser, setUrlFotoUser] = useState();
  const [nomeUser, setNomeUser] = useState();
  const [dadosUser, setDadosUser] = useState();

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
    </form>
  )
}

export { CustomCard };