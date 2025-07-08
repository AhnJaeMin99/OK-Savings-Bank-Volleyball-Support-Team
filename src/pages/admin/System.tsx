import React, { useState } from 'react';

export default function System({ notice, setNotice }) {
  const [email, setEmail] = useState('okfngroup@naver.com');
  const [localNotice, setLocalNotice] = useState(notice || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotice(localNotice);
    alert('저장되었습니다.');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ background: '#fff', borderRadius: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', width: 480, padding: 48, border: '4px solid #ff8800', boxSizing: 'border-box' }}>
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>시스템 설정</h2>
          <div style={{ color: '#888' }}>관리자 시스템 환경을 설정하세요</div>
        </div>
        <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: '100%' }} onSubmit={handleSubmit}>
          <label style={{ fontWeight: 600 }}>
            관리자 이메일
            <input type="email" value={email} readOnly style={{ marginTop: 6, padding: '28px 24px', borderRadius: 18, border: '1.5px solid #ddd', width: '100%', fontSize: 28, height: 64, boxSizing: 'border-box', fontWeight: 700, background: '#faf8f6', letterSpacing: '-1px' }} />
          </label>
          <label style={{ fontWeight: 600, gridColumn: '1 / span 2' }}>
            공지사항
            <textarea value={localNotice} onChange={e => setLocalNotice(e.target.value)} placeholder="공지 내용을 입력하세요" style={{ marginTop: 6, padding: 20, borderRadius: 14, border: '1px solid #ddd', width: '100%', minHeight: 80, fontSize: 22 }} />
          </label>
          <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 10, padding: 24, fontWeight: 800, fontSize: 24, marginTop: 8, cursor: 'pointer', gridColumn: '1 / span 2' }}>저장</button>
        </form>
      </div>
    </div>
  );
} 