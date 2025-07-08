import React, { useEffect, useState } from 'react';

const columns = [
  { key: '경기명', label: '경기명' },
  { key: '일자', label: '일자' },
  { key: '장소', label: '장소' },
  { key: '최대인원', label: '최대인원' },
  { key: '신청시작일', label: '신청시작일' },
  { key: '신청마감일', label: '신청마감일' },
  { key: '신청자이메일', label: '신청자 이메일' },
  { key: '신청일자', label: '신청일자' },
];

function downloadExcel(data) {
  // 간단한 xlsx 다운로드 (csv로 저장)
  const header = columns.map(col => col.label).join(',');
  const rows = data.map(row => columns.map(col => row[col.key] || '').join(',')).join('\n');
  const csvContent = [header, rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', '신청자리스트.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const Applicants = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://hook.us2.make.com/dybevh4n1foq2ir5axguir7qhyod4r47')
      .then(res => res.text())
      .then(text => {
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          data = text;
        }
        if (typeof data === 'string') {
          try { data = JSON.parse(data); } catch {}
        }
        // 2차원 배열로 들어올 때 매핑
        let mapped = [];
        if (Array.isArray(data)) {
          mapped = data.map(arr => ({
            '경기명': arr[0] || '',
            '일자': arr[1] || '',
            '장소': arr[2] || '',
            '최대인원': arr[3] || '',
            '신청시작일': arr[4] || '',
            '신청마감일': arr[5] || '',
            '신청자이메일': arr[6] || '',
            '신청일자': arr[7] || '',
          }));
        } else if (data && typeof data === 'object' && Array.isArray(data.array)) {
          mapped = data.array.map(arr => ({
            '경기명': arr[0] || '',
            '일자': arr[1] || '',
            '장소': arr[2] || '',
            '최대인원': arr[3] || '',
            '신청시작일': arr[4] || '',
            '신청마감일': arr[5] || '',
            '신청자이메일': arr[6] || '',
            '신청일자': arr[7] || '',
          }));
        }
        setList(mapped);
        setLoading(false);
      })
      .catch(() => { setList([]); setLoading(false); });
  }, []);

  return (
    <div style={{ maxWidth: 1400, width: '100%', margin: '40px auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', padding: 32, border: '4px solid #ff8800', overflowX: 'auto' }}>
      <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24 }}>신청자 리스트</h2>
      <button onClick={() => downloadExcel(list)} style={{ marginBottom: 20, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 24px', fontWeight: 700, fontSize: 18, cursor: 'pointer' }}>
        엑셀 다운로드
      </button>
      {loading ? (
        <div style={{ textAlign: 'center', color: '#bbb', fontSize: 20, padding: 32 }}>로딩 중...</div>
      ) : list.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#bbb', fontSize: 20, padding: 32 }}>신청자가 없습니다.</div>
      ) : (
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={{ minWidth: 1200, width: '100%', borderCollapse: 'collapse', fontSize: 18 }}>
            <thead>
              <tr style={{ background: '#fff6e6' }}>
                {columns.map(col => (
                  <th key={col.key} style={{ padding: 12, fontWeight: 800, whiteSpace: 'nowrap' }}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1.5px solid #ffe0b2', height: 48 }}>
                  {columns.map(col => (
                    <td
                      key={col.key}
                      style={{
                        padding: 12,
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        maxWidth: col.key === '신청자이메일' || col.key === '신청일자' ? 220 : 120,
                        fontFamily: col.key === '신청자이메일' ? 'monospace' : undefined,
                      }}
                      title={row[col.key] || ''}
                    >
                      {row[col.key] || ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Applicants; 