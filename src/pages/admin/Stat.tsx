import React from 'react';

export default function Stat() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ width: '100%', maxWidth: 1200 }}>
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>신청 통계</h2>
          <div style={{ color: '#888' }}>경기별 신청 현황을 확인하세요</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginBottom: 32, width: '100%' }}>
          <div style={{ textAlign: 'center', width: '100%', padding: 40, borderRadius: 24, border: '4px solid #ff8800', boxSizing: 'border-box' }}>
            <div style={{ fontSize: 20, color: '#888', marginBottom: 8 }}>총 신청자 수</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: '#2563eb' }}>128</div>
          </div>
          <div style={{ textAlign: 'center', width: '100%', padding: 40, borderRadius: 24, border: '4px solid #ff8800', boxSizing: 'border-box' }}>
            <div style={{ fontSize: 20, color: '#888', marginBottom: 8 }}>마감 임박 경기</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: '#f59e42' }}>2</div>
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', width: '100%', padding: 32, border: '4px solid #ff8800', boxSizing: 'border-box' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>경기별 신청 현황</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 20 }}>
            <thead>
              <tr>
                <th style={{ padding: 12, fontWeight: 800 }}>경기명</th>
                <th style={{ padding: 12, fontWeight: 800 }}>신청자 수</th>
                <th style={{ padding: 12, fontWeight: 800 }}>상태</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: 12 }}>배구 경기</td>
                <td style={{ padding: 12 }}>80</td>
                <td style={{ padding: 12 }}>신청중</td>
              </tr>
              <tr>
                <td style={{ padding: 12 }}>농구 경기</td>
                <td style={{ padding: 12 }}>48</td>
                <td style={{ padding: 12 }}>마감</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 