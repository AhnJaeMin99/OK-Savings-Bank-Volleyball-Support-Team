import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AdminLayout({ children, selectedMenu, onMenuSelect, email, onLogout, showSidebar, setShowSidebar, onMainClick }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #ff8800 0%, #fff3e0 40%, #ffb84d 80%, #ff8800 100%)',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      position: 'relative',
    }}>
      {/* showSidebar=false일 때 왼쪽 18px 핫존 클릭 시 오픈 */}
      {!showSidebar && (
        <div
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: 18,
            height: '100vh',
            zIndex: 201,
            background: 'transparent',
            cursor: 'pointer',
          }}
          onClick={() => setShowSidebar(true)}
        />
      )}
      {/* 오버레이: 사이드바 열려 있을 때만, 사이드바 바깥 클릭 시 닫힘 */}
      {showSidebar && (
        <div
          style={{
            position: 'fixed',
            left: sidebarExpanded ? 220 : 80,
            top: 0,
            width: `calc(100vw - ${sidebarExpanded ? 220 : 80}px)`,
            height: '100vh',
            zIndex: 199,
            background: 'rgba(0,0,0,0.15)',
          }}
          onClick={onMainClick}
        />
      )}
      {/* 사이드바: 슬라이드 애니메이션 */}
      <div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          zIndex: 200,
          transition: 'transform 0.35s cubic-bezier(.4,1.6,.4,1)',
          transform: showSidebar ? 'translateX(0)' : 'translateX(-100%)',
        }}
        onClick={e => e.stopPropagation()}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
      >
        <Sidebar selected={selectedMenu} onSelect={onMenuSelect} onLogout={onLogout} expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
      </div>
      {/* 메인 컨텐츠: marginLeft를 사이드바 너비에 맞춰 조정 */}
      <div
        style={{
          flex: 1,
          marginLeft: showSidebar ? (sidebarExpanded ? 220 : 80) : 0,
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          padding: 0,
          transition: 'margin-left 0.35s cubic-bezier(.4,1.6,.4,1)',
        }}
      >
        <Header email={email} onLogout={onLogout} />
        <main style={{
          marginTop: 64,
          padding: '0 24px',
          width: '100%',
          minHeight: 'calc(100vh - 64px)',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <div style={{
            width: '100%',
            maxWidth: 1200,
            maxHeight: '100%',
            overflow: 'auto',
          }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 