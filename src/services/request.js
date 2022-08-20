import axios from "axios";

async function fetchUser(nomeUsuarioFormatado) {
  if (nomeUsuarioFormatado && nomeUsuarioFormatado.length > 0) {
    const user = await axios.get(`https://api.github.com/users/${nomeUsuarioFormatado}`);
    
    return user.data.login
  }
}

async function fetchDadosUsuario(nomeUsuarioFormatado) {
  if (nomeUsuarioFormatado && nomeUsuarioFormatado.length > 0) {
    const user = await axios.get(`https://api.github.com/users/${nomeUsuarioFormatado}`);
    const repositorios = await axios.get(user.data.repos_url);
    const numeroSeguidores = user.data.followers;
    const numeroSeguindo = user.data.following;
    const numeroRepositorios = repositorios.data.length;
    const localizacao = user.data.location; 
    
    return [numeroSeguidores, numeroSeguindo, numeroRepositorios, localizacao];
  }
}

async function fetchFotoPerfil(nomeUsuarioFormatado) {
  if (nomeUsuarioFormatado && nomeUsuarioFormatado.length > 0) {
    const user = await axios.get(`https://api.github.com/users/${nomeUsuarioFormatado}`);
    const urlFotoPerfil = await user.data.avatar_url

    return urlFotoPerfil;
  }
}

export { fetchFotoPerfil, fetchUser, fetchDadosUsuario };