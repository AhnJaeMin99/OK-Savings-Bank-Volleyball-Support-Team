import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [rightPanelActive, setRightPanelActive] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    code: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);
  const [authStep, setAuthStep] = useState<'signup' | 'verify'>('signup');
  const [timer, setTimer] = useState(180); // 3분(180초)
  const [timerActive, setTimerActive] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'confirmPassword' || name === 'password') {
      setPasswordError('');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // 관리자 계정은 바로 이동
    if (formData.email === 'okfngroup@naver.com' && formData.password === 'okfngroup') {
      navigate('/admin');
      return;
    }
    try {
      const res = await fetch('https://hook.us2.make.com/r67d69rdvawwe49we1p8ckmfu2thv48x', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        localStorage.setItem('ok_user_email', formData.email);
        navigate('/events');
      } else {
        alert(data.message || '로그인에 실패했습니다.');
      }
    } catch (error) {
      alert('네트워크 오류로 로그인에 실패했습니다.');
      console.error('로그인 전송 실패:', error);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }
    setIsRequesting(true);
    try {
      // 인증요청(회원가입 정보 전송)
      const res = await fetch('https://hook.us2.make.com/15w0iw8cxook72jf5b90jxxyrgsbvm3r', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
      // 응답 대기
      let data: any = {};
      try {
        data = await res.json();
      } catch (err) {
        // JSON 파싱 실패 시 무시
      }
      setIsRequesting(false);
      // 응답에 따라 다음 단계로
      if (res.ok && (data.success === undefined || data.success)) {
        setAuthStep('verify');
      }
    } catch (error) {
      setIsRequesting(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifyMessage('');
    try {
      const response = await fetch('https://hook.us2.make.com/utxra1hqjyq20vnccoywu7vbhxgmuczk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          code: formData.code,
        }),
      });
      const data = await response.json();
      setVerifyMessage(data.message || '알 수 없는 오류가 발생했습니다.');
      if (data.message && data.message.includes('성공')) {
        setIsVerified(true); // 인증 성공 상태 저장
        setTimerActive(false); // 타이머 멈춤
        setRightPanelActive(false); // 로그인 패널로 전환
      }
    } catch (error) {
      setVerifyMessage('네트워크 오류가 발생했습니다.');
    }
  };

  // 인증 단계 진입 시 타이머 시작
  useEffect(() => {
    if (authStep === 'verify') {
      setTimer(180);
      setTimerActive(true);
    } else {
      setTimerActive(false);
    }
  }, [authStep]);

  // 타이머 감소
  useEffect(() => {
    if (!timerActive) return;
    if (timer <= 0) {
      setTimerActive(false);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  // 인증 성공 시 자동 로그인
  useEffect(() => {
    if (isVerified) {
      handleLogin({ preventDefault: () => {} } as React.FormEvent);
    }
    // eslint-disable-next-line
  }, [isVerified]);

  const userEmail = localStorage.getItem('ok_user_email');

  if (userEmail) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(/lovable-uploads/baegu-neteu.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '32px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          padding: '48px 36px',
          minWidth: '340px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <img src="/lovable-uploads/144.svg" alt="읏맨" style={{ width: 90, height: 90, marginBottom: 16 }} />
          <h2 className="text-2xl font-bold text-center mt-4 mb-2">로그인된 이메일</h2>
          <div style={{
            fontSize: '1.2rem',
            fontWeight: 700,
            color: '#2563eb',
            background: 'rgba(37,99,235,0.07)',
            borderRadius: '12px',
            padding: '12px 24px',
            marginBottom: 12,
            marginTop: 8,
            wordBreak: 'break-all',
          }}>{userEmail}</div>
          <button onClick={() => { localStorage.removeItem('ok_user_email'); window.location.reload(); }}
            style={{
              marginTop: 12,
              background: '#ff8800',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 24px',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
          로그아웃
        </button>
      </div>
    </div>
  );
}

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: 'url(/lovable-uploads/baegu-neteu.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      {/* 홈으로 가기 버튼 - 화면 좌상단 고정 */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 10,
          padding: '12px 24px',
          background: 'rgba(255, 255, 255, 0.9)',
          color: '#ff8800',
          border: '2px solid #ff8800',
          borderRadius: '12px',
          fontWeight: 700,
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'all 0.2s',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}
        onMouseOver={(e) => {
          (e.target as HTMLButtonElement).style.background = '#ff8800';
          (e.target as HTMLButtonElement).style.color = '#fff';
        }}
        onMouseOut={(e) => {
          (e.target as HTMLButtonElement).style.background = 'rgba(255, 255, 255, 0.9)';
          (e.target as HTMLButtonElement).style.color = '#ff8800';
        }}
      >
        🏠 홈으로
      </button>
      {/* 뒤로 가기 버튼 - 카드 왼쪽 상단 고정 */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className={`ok-container${rightPanelActive ? ' right-panel-active' : ''}`} style={{ minHeight: '420px', maxHeight: '650px', height: '70vh', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
          {/* 회원가입 폼 */}
          <div className="ok-container__form ok-container--signup">
            {authStep === 'signup' && (
              <form className="ok-form" onSubmit={handleSignup}>
                <h2 className="ok-form__title">회원가입</h2>
                <input 
                  type="text" 
                  name="name"
                  placeholder="이름" 
                  className="ok-input" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <input 
                  type="email" 
                  name="email"
                  placeholder="이메일 (예: yourname@okfngroup.com)" 
                  className="ok-input" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  pattern="^[a-zA-Z0-9._%+-]+@okfngroup.com$"
                  title="사내 이메일(yourname@okfngroup.com)만 입력 가능합니다."
                />
                <input 
                  type="password" 
                  name="password"
                  placeholder="비밀번호" 
                  className="ok-input" 
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="비밀번호 확인"
                  className="ok-input"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                {passwordError && (
                  <div style={{ color: 'red', marginTop: '0.5rem', fontSize: '0.95rem' }}>{passwordError}</div>
                )}
                <button type="submit" className="ok-btn" disabled={isRequesting}>회원가입</button>
              </form>
            )}
            {authStep === 'verify' && (
              <form className="ok-form" onSubmit={handleVerify}>
                <h2 className="ok-form__title">이메일 인증</h2>
                <input
                  type="text"
                  name="code"
                  placeholder="인증코드 입력"
                  className="ok-input"
                  value={formData.code || ''}
                  onChange={handleInputChange}
                  required
                  disabled={timer <= 0}
                />
                <div style={{ margin: '0.5rem 0', color: timer <= 30 ? 'red' : '#888', fontWeight: 600 }}>
                  {timer > 0
                    ? `남은 시간: ${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}`
                    : '인증 시간이 만료되었습니다. 다시 시도해 주세요.'}
                </div>
                {verifyMessage && (
                  <div style={{ color: '#d97706', marginBottom: '0.5rem', fontWeight: 600 }}>{verifyMessage}</div>
                )}
                <button type="submit" className="ok-btn" disabled={timer <= 0}>인증하기</button>
              </form>
            )}
          </div>
          {/* 로그인 폼 */}
          <div className="ok-container__form ok-container--signin">
            <form className="ok-form" onSubmit={handleLogin}>
              <h2 className="text-2xl font-bold text-center mt-4">OK저축은행 읏맨</h2>
              <p className="text-center text-gray-500 mb-6">읏맨은 OK저축은행의 공식 마스코트입니다.</p>
              <input 
                type="email" 
                name="email"
                placeholder="이메일" 
                className="ok-input" 
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input 
                type="password" 
                name="password"
                placeholder="비밀번호" 
                className="ok-input" 
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button type="submit" className="ok-btn">로그인</button>
            </form>
          </div>
          {/* 오버레이 패널 */}
          <div className="ok-container__overlay">
            <div className="ok-overlay">
              <div className="ok-overlay__panel ok-overlay--left">
                <h2>읏맨 회원이신가요?</h2>
                <p>신뢰의 금융, 열정의 배구단, 읏맨과 함께 특별한 경험을 시작하세요!</p>
                <button 
                  className="ok-btn ok-ghost" 
                  onClick={() => setRightPanelActive(false)}
                  type="button"
                >
                  로그인
                </button>
              </div>
              <div className="ok-overlay__panel ok-overlay--right">
                <h2>처음이신가요?</h2>
                <p>OK저축은행 읏맨의 다양한 서비스와<br/>배구단 이벤트를 경험해보세요!</p>
                <button 
                  className="ok-btn ok-ghost" 
                  onClick={() => setRightPanelActive(true)}
                  type="button"
                >
                  회원가입
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
