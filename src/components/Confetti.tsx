
import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  velocityX: number;
  velocityY: number;
  rotationSpeed: number;
}

export const Confetti = () => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  const colors = ['#3B82F6', '#F97316', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  useEffect(() => {
    // 초기 색종이 생성
    const initialConfetti: ConfettiPiece[] = [];
    for (let i = 0; i < 50; i++) {
      initialConfetti.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 6 + 4,
        velocityX: (Math.random() - 0.5) * 3,
        velocityY: Math.random() * 3 + 2,
        rotationSpeed: (Math.random() - 0.5) * 10,
      });
    }
    setConfetti(initialConfetti);

    // 애니메이션 루프
    const animateConfetti = () => {
      setConfetti(prev => 
        prev.map(piece => ({
          ...piece,
          x: piece.x + piece.velocityX,
          y: piece.y + piece.velocityY,
          rotation: piece.rotation + piece.rotationSpeed,
          velocityY: piece.velocityY + 0.1, // 중력 효과
        })).filter(piece => piece.y < window.innerHeight + 10) // 화면 밖으로 나간 것들 제거
      );
    };

    const interval = setInterval(animateConfetti, 16); // ~60fps

    // 5초 후 정리
    const cleanup = setTimeout(() => {
      clearInterval(interval);
      setConfetti([]);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(cleanup);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map(piece => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}px`,
            top: `${piece.y}px`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            borderRadius: '2px',
          }}
        />
      ))}
    </div>
  );
};
