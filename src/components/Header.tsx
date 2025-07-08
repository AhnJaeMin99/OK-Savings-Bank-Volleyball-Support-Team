import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header({ email, onLogout }) {
  const navigate = useNavigate();
  
  return (
    <header style={{
      width: '100%',
      height: 64,
      background: 'linear-gradient(90deg, #ff8800 0%, #ff6600 60%, #a259ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 40px',
      color: '#fff',
      fontWeight: 700,
      fontSize: 20,
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 150,
      boxShadow: '0 2px 12px rgba(255,102,0,0.10)'
    }}>
      <span style={{ marginRight: 32 }}>{email}</span>
      <button onClick={onLogout} style={{
        background: 'rgba(255,255,255,0.13)',
        color: '#fff',
        border: 'none',
        borderRadius: 10,
        padding: '10px 22px',
        fontWeight: 800,
        fontSize: 18,
        cursor: 'pointer',
        letterSpacing: '-1px',
      }}>
        로그아웃
      </button>
    </header>
  );
} 