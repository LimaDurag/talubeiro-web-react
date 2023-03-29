import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../global.css';
import './styles.css';

import auth from "../../services/auth.js";

export default function Menu() {

  const handleSignOff = () => {
    auth.singOutUser();
    window.location.reload();
  }

  return (
    <main className="container">
      <div className="menu-box">
        <h1 className="menu-title">Talubeiro</h1>
        <div className="div-buttons">
          <button className="button">CRIAR NOVA SALA</button>
          <button className="button">JUNTAR-SE Á SALA</button>
          <button className="button">
            <Link to="/userprofile"> GERENCIAR PERFI </Link>
          </button>
        </div>
        <button className="disconnect-button" onClick={handleSignOff}>
          <Link to="/"> Sair da minha conta </Link>
        </button>
      </div>
    </main>
  );
}
