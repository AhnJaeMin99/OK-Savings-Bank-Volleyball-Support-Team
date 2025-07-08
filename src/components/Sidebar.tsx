import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 아이콘 라이브러리 import 예시(실제 프로젝트에 맞게 조정)
import { FaCalendarAlt, FaGift, FaUsers } from 'react-icons/fa';

const menus = [
  { key: 'game', name: '경기 설정', icon: <FaCalendarAlt size={22} /> },
  { key: 'draw', name: '추첨 관리', icon: <FaGift size={22} /> },
  { key: 'applicants', name: '신청자 리스트', icon: <FaUsers size={22} /> },
];

export default function Sidebar({ selected, onSelect, expanded, setExpanded, onLogout }) {
  const navigate = useNavigate();
  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{
        width: expanded ? 220 : 80,
        height: '100vh',
        background: 'linear-gradient(135deg, #ff8800 0%, #ff6600 60%, #a259ff 100%)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: expanded ? 'center' : 'flex-start',
        padding: '32px 0',
        boxShadow: '2px 0 16px rgba(255,102,0,0.10)',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 200,
        transition: 'width 0.2s',
      }}
    >
      {/* 로고/타이틀 */}
      <button
        onClick={() => navigate('/')}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          margin: 0,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          marginBottom: 36,
          width: '100%',
          justifyContent: expanded ? 'center' : 'flex-start',
          paddingLeft: expanded ? 16 : 16, // 항상 16px
        }}
        aria-label="홈으로 이동"
      >
        <img src="/lovable-uploads/144.svg" alt="OK 로고" style={{ width: 48, height: 48, marginRight: expanded ? 14 : 0 }} />
        {expanded && <div style={{ fontWeight: 900, fontSize: 24, letterSpacing: '-1px' }}>OK 배구단</div>}
      </button>
      <div style={{ width: '100%', flex: 1 }}>
        {menus.map(menu => (
          <button
            key={menu.key}
            onClick={() => onSelect(menu.key)}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              background: selected === menu.key ? 'rgba(255,255,255,0.13)' : 'none',
              color: selected === menu.key ? '#fff' : '#f3e9e0',
              border: 'none',
              borderRadius: 14,
              padding: expanded ? '18px 32px' : '18px 0 18px 16px',
              fontSize: 20,
              fontWeight: selected === menu.key ? 900 : 600,
              marginBottom: 8,
              cursor: 'pointer',
              transition: 'background 0.15s, color 0.15s',
              justifyContent: expanded ? 'flex-start' : 'center',
            }}
          >
            <span style={{ marginRight: expanded ? 16 : 0 }}>{menu.icon}</span>
            {expanded && menu.name}
          </button>
        ))}
      </div>
    </aside>
  );
} 