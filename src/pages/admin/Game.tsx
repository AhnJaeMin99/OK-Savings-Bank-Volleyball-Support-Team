import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

export default function Game() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    date: null,
    place: '',
    max: '',
    start: null,
    end: null,
  });
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch('https://hook.us2.make.com/fs9rpp37h56g2syfg0nthr96c1wpnax7')
      .then(res => res.text())
      .then(text => {
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          data = text;
        }
        if (typeof data === 'string') {
          try {
            data = JSON.parse(data);
          } catch {}
        }
        console.log('API 응답:', data);
        // operation이 2개로 오고, 각 operation의 array가 2차원 배열로 올 때 처리
        // 예시: { array: [["안재민", "2025-07-08", ...], ...] }
        // 또는 여러 operation이 배열로 올 수도 있음
        const keys = ["경기명", "일자", "장소", "최대인원", "신청시작일", "신청마감일"];
        let allGames = [];
        if (Array.isArray(data)) {
          // [{ array: [...] }, { array: [...] }] 형태도 처리
          data.forEach(op => {
            if (op && Array.isArray(op.array)) {
              allGames.push(...op.array.map(arr => {
                const obj = {};
                keys.forEach((k, i) => { obj[k] = arr[i] || ""; });
                obj["상태"] = op.상태 || "";
                return obj;
              }));
            }
          });
        } else if (data && typeof data === 'object') {
          if (Array.isArray(data.array)) {
            allGames = data.array.map(arr => {
              const obj = {};
              keys.forEach((k, i) => { obj[k] = arr[i] || ""; });
              obj["상태"] = data.상태 || "";
              return obj;
            });
          } else {
            allGames = [];
          }
        }
        setGames(allGames);
      })
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date, field) => {
    setForm(prev => ({ ...prev, [field]: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.date || !form.place || !form.max || !form.start || !form.end) {
      alert("모든 항목을 입력해 주세요");
      return;
    }
    // 서버로 전송할 데이터
    const dataToSend = {
      경기명: form.name,
      일자: form.date instanceof Date ? form.date.toISOString().slice(0, 10) : form.date,
      장소: form.place,
      최대인원: form.max,
      신청시작일: form.start instanceof Date ? form.start.toISOString().slice(0, 10) : form.start,
      신청마감일: form.end instanceof Date ? form.end.toISOString().slice(0, 10) : form.end,
      상태: '신청중',
    };
    try {
      const res = await fetch('https://hook.us2.make.com/21oir7bq71dgdb0m491s14cr5xp6vtx9', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });
      if (res.ok) {
        alert('추가 및 전송 완료');
      } else {
        alert('전송 실패');
      }
    } catch { alert('전송 실패'); }
    setGames(prev => [
      ...prev,
      {
        경기명: form.name,
        일자: form.date instanceof Date ? form.date.toISOString().slice(0, 10) : form.date,
        장소: form.place,
        최대인원: form.max,
        신청시작일: form.start instanceof Date ? form.start.toISOString().slice(0, 10) : form.start,
        신청마감일: form.end instanceof Date ? form.end.toISOString().slice(0, 10) : form.end,
        상태: '신청중',
      },
    ]);
    setForm({ name: '', date: null, place: '', max: '', start: null, end: null });
  };

  // input, datepicker 스타일 통일
  const inputStyle = {
    width: '100%',
    padding: 18,
    borderRadius: 12,
    border: '1px solid #ddd',
    fontSize: 20,
    marginBottom: 14,
    boxSizing: 'border-box' as const,
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>경기 설정</h2>
          <div style={{ color: '#888' }}>신청 가능한 경기를 관리하세요</div>
        </div>
      </div>
      <div style={{ background: '#fff', borderRadius: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: 32, width: '100%', padding: 40, border: '4px solid #ff8800', boxSizing: 'border-box' }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>새 경기 추가</h3>
        <form style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) 120px', gap: 18, alignItems: 'center', width: '100%' }} onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="경기명" style={inputStyle} />
          <DatePicker
            selected={form.date}
            onChange={(date: Date | null) => handleDateChange(date, 'date')}
            placeholderText="경기 일자"
            dateFormat="yyyy-MM-dd"
            className="custom-datepicker"
            customInput={<input style={inputStyle} />}
          />
          <input name="place" value={form.place} onChange={handleChange} placeholder="장소" style={inputStyle} />
          <input name="max" value={form.max} onChange={handleChange} placeholder="최대 인원" style={inputStyle} />
          <DatePicker
            selected={form.start}
            onChange={(date: Date | null) => handleDateChange(date, 'start')}
            placeholderText="신청 시작일"
            dateFormat="yyyy-MM-dd"
            className="custom-datepicker"
            customInput={<input style={inputStyle} />}
          />
          <DatePicker
            selected={form.end}
            onChange={(date: Date | null) => handleDateChange(date, 'end')}
            placeholderText="신청 마감일"
            dateFormat="yyyy-MM-dd"
            className="custom-datepicker"
            customInput={<input style={inputStyle} />}
          />
          <button type="submit" style={{ gridRow: '1 / span 3', gridColumn: 4, height: 48, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 20, cursor: 'pointer', width: '100%', padding: '0 32px' }}>+ 추가</button>
        </form>
      </div>
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', width: '100%', padding: 32, border: '4px solid #ff8800', boxSizing: 'border-box' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>경기 목록</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 20 }}>
          <thead>
            <tr style={{ background: '#fff6e6' }}>
              <th style={{ padding: 12, fontWeight: 800 }}>경기명</th>
              <th style={{ padding: 12, fontWeight: 800 }}>일자</th>
              <th style={{ padding: 12, fontWeight: 800 }}>장소</th>
              <th style={{ padding: 12, fontWeight: 800 }}>최대인원</th>
              <th style={{ padding: 12, fontWeight: 800 }}>신청시작일</th>
              <th style={{ padding: 12, fontWeight: 800 }}>신청마감일</th>
              <th style={{ padding: 12, fontWeight: 800 }}>상태</th>
              <th style={{ padding: 12, fontWeight: 800 }}>삭제</th>
            </tr>
          </thead>
          <tbody>
            {games.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', color: '#bbb', fontSize: 20, padding: 32 }}>
                  등록된 경기가 없습니다.
                </td>
              </tr>
            ) : (
              games.filter(g => g && g.경기명).length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', color: '#bbb', fontSize: 20, padding: 32 }}>
                    등록된 경기가 없습니다.
                  </td>
                </tr>
              ) : (
                games.map((g, i) => (
                  g && g.경기명 ? (
                    <tr key={i} style={{ borderBottom: '1.5px solid #ffe0b2', height: 56 }}>
                      <td style={{ padding: 12 }}>{g.경기명}</td>
                      <td style={{ padding: 12 }}>{g.일자}</td>
                      <td style={{ padding: 12 }}>{g.장소}</td>
                      <td style={{ padding: 12 }}>{g.최대인원}</td>
                      <td style={{ padding: 12 }}>{g.신청시작일}</td>
                      <td style={{ padding: 12 }}>{g.신청마감일}</td>
                      <td style={{ padding: 12 }}>
                        {(() => {
                          const today = new Date();
                          const start = new Date(g.신청시작일);
                          const end = new Date(g.신청마감일);
                          if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && today.getTime() >= start.getTime() && today.getTime() <= end.getTime()) {
                            return <span style={{ color: '#2563eb', fontWeight: 700 }}>진행중</span>;
                          }
                          return g.상태;
                        })()}
                      </td>
                      <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 56 }}>
                        <button
                          style={{ width: 32, height: 32, borderRadius: '50%', border: '1.5px solid #ff8800', background: '#fff', color: '#ff8800', fontWeight: 900, fontSize: 18, cursor: 'pointer', transition: 'all 0.2s' }}
                          onClick={async () => {
                            const deleted = games[i];
                            try {
                              await fetch('https://hook.us2.make.com/ntnrd4g419pj232okuo0mx30txgyse5d', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(deleted),
                              });
                            } catch {}
                            setGames(prev => prev.filter((_, index) => index !== i));
                          }}
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ) : null
                ))
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 