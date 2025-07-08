import React, { useRef, useEffect, useState } from "react";

const BASE_WIDTH = 900;
const BASE_HEIGHT = 800;
const BASE_BALL_RADIUS = 20;
const BASE_FLIPPER_LENGTH = 220;
const BASE_FLIPPER_Y = BASE_HEIGHT - 70;
const BASE_BUMPER_RADIUS = 40;
const BASE_BUMPERS = [
  { x: 200, y: 220 },
  { x: 700, y: 220 },
  { x: 450, y: 400 },
  { x: 300, y: 600 },
  { x: 600, y: 600 },
];

function maskEmail(email) {
  return email.replace(/(.{3}).*(@.*)/, "$1***$2");
}

export default function Draw({ applicationList = [] }) {
  // 동적 크기 계산
  const [canvasSize, setCanvasSize] = useState({ w: BASE_WIDTH, h: BASE_HEIGHT });
  const canvasRef = useRef(null);
  const [balls, setBalls] = useState([]);
  const [flipperAngle, setFlipperAngle] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [particles, setParticles] = useState([]);
  const [winner, setWinner] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // 반응형 크기 조정
  useEffect(() => {
    function handleResize() {
      const w = Math.min(window.innerWidth * 0.9, 1000);
      const h = Math.min(window.innerHeight * 0.8, 900);
      setCanvasSize({ w, h });
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 버튼 클릭 시 공 생성 및 게임 시작
  const handleStart = () => {
    setWinner(null);
    setShowConfetti(false);
    const { w, h } = canvasSize;
    const scaleX = w / BASE_WIDTH;
    const scaleY = h / BASE_HEIGHT;
    setBalls(
      applicationList.map((row, i) => ({
        x: w / 2 + (i - applicationList.length / 2) * 60 * scaleX,
        y: 100 * scaleY,
        vx: (Math.random() - 0.5) * 0.12 * scaleX,
        vy: 0.08 * scaleY + Math.random() * 0.08 * scaleY,
        color: `hsl(${(i * 360) / (applicationList.length || 1)}, 85%, 60%)`,
        alive: true,
        email: row.email,
        bounceCount: 0,
        maxBounce: 35 + Math.floor(Math.random() * 6),
        glow: 0,
      }))
    );
    setGameStarted(true);
  };

  useEffect(() => {
    if (!gameStarted) return;
    let animation;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { w, h } = canvasSize;
    const scaleX = w / BASE_WIDTH;
    const scaleY = h / BASE_HEIGHT;
    const BALL_RADIUS = BASE_BALL_RADIUS * scaleX;
    const FLIPPER_LENGTH = BASE_FLIPPER_LENGTH * scaleX;
    const FLIPPER_Y = BASE_FLIPPER_Y * scaleY;
    const BUMPER_RADIUS = BASE_BUMPER_RADIUS * scaleX;
    const BUMPERS = BASE_BUMPERS.map(b => ({ x: b.x * scaleX, y: b.y * scaleY }));

    function draw() {
      ctx.clearRect(0, 0, w, h);
      // 배경 그라데이션
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "#fbbf24");
      grad.addColorStop(1, "#f59e42");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      // 범퍼
      BUMPERS.forEach((b, i) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(b.x, b.y, BUMPER_RADIUS, 0, 2 * Math.PI);
        ctx.fillStyle = i % 2 === 0 ? "#fff" : "#ffe082";
        ctx.shadowColor = "#facc15";
        ctx.shadowBlur = 32 * scaleX;
        ctx.fill();
        ctx.lineWidth = 5 * scaleX;
        ctx.strokeStyle = "#f59e42";
        ctx.stroke();
        ctx.restore();
      });
      // 플리퍼
      ctx.save();
      ctx.translate(w / 2, FLIPPER_Y);
      ctx.rotate((flipperAngle * Math.PI) / 180);
      ctx.fillStyle = "#2563eb";
      ctx.shadowColor = "#60a5fa";
      ctx.shadowBlur = 24 * scaleX;
      ctx.fillRect(-FLIPPER_LENGTH / 2, -14 * scaleY, FLIPPER_LENGTH, 28 * scaleY);
      ctx.restore();
      // 공 + 이메일
      balls.forEach((ball) => {
        if (!ball.alive) return;
        ctx.save();
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, 2 * Math.PI);
        ctx.fillStyle = ball.color;
        ctx.shadowColor = ball.glow > 0 ? "#fff" : ball.color;
        ctx.shadowBlur = ball.glow > 0 ? 32 * scaleX : 10 * scaleX;
        ctx.fill();
        ctx.lineWidth = 2 * scaleX;
        ctx.strokeStyle = "#fff";
        ctx.stroke();
        ctx.restore();
        // 이메일 표시
        ctx.save();
        ctx.font = `bold ${15 * scaleX}px Pretendard, sans-serif`;
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.shadowColor = "#000";
        ctx.shadowBlur = 6 * scaleX;
        ctx.fillText(maskEmail(ball.email), ball.x, ball.y - BALL_RADIUS - 10 * scaleY);
        ctx.restore();
      });
      // 파티클
      particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, (5 + 6 * p.spark) * scaleX, 0, 2 * Math.PI);
        ctx.fillStyle = p.spark ? "#fff176" : "#fbbf24";
        ctx.fill();
        ctx.restore();
      });
      // 남은 공
      ctx.save();
      ctx.font = `bold ${16 * scaleX}px 'Pretendard', sans-serif`;
      ctx.fillStyle = "#fff";
      ctx.fillText(`남은 공: ${balls.filter((b) => b.alive).length}`, 24 * scaleX, 70 * scaleY);
      ctx.restore();
      // 1등 캔버스 표시
      if (winner) {
        ctx.save();
        ctx.font = `bold ${36 * scaleX}px 'Pretendard', sans-serif`;
        ctx.fillStyle = "#fff";
        ctx.shadowColor = "#f59e42";
        ctx.shadowBlur = 18 * scaleX;
        ctx.textAlign = "center";
        ctx.fillText(`🎉 1등! ${maskEmail(winner)} 🎉`, w / 2, h / 2);
        ctx.font = `bold ${20 * scaleX}px 'Pretendard', sans-serif`;
        ctx.fillText("축하합니다!", w / 2, h / 2 + 40 * scaleY);
        ctx.font = `bold ${60 * scaleX}px 'Pretendard', sans-serif`;
        ctx.shadowColor = "#ff8800";
        ctx.shadowBlur = 24 * scaleX;
        ctx.fillStyle = "#ff8800";
        ctx.globalAlpha = 0.92;
        ctx.fillText("읏:", w / 2, h / 2 + 120 * scaleY);
        ctx.restore();
      }
    }

    function update() {
      if (winner) return;
      setBalls((prevBalls) => {
        let aliveBalls = prevBalls.filter((b) => b.alive);
        let updated = prevBalls.map((ball) => {
          if (!ball.alive) return ball;
          let { x, y, vx, vy, bounceCount, maxBounce, glow } = ball;
          vy += 0.006 * scaleY;
          vx *= 0.9997;
          // 벽 충돌
          if (x < BALL_RADIUS && vx < 0) vx = -vx * 0.93;
          if (x > w - BALL_RADIUS && vx > 0) vx = -vx * 0.93;
          if (y < BALL_RADIUS && vy < 0) vy = -vy * 0.93;
          // 플리퍼 충돌
          if (
            y > FLIPPER_Y - BALL_RADIUS &&
            Math.abs(x - w / 2) < FLIPPER_LENGTH / 2 &&
            vy > 0
          ) {
            vy = -Math.abs(vy) * (1.1 + flipperAngle / 60);
            vx += flipperAngle / 8;
            spawnParticles(x, y, true, scaleX);
            glow = 1.5;
          }
          // 범퍼 충돌
          BUMPERS.forEach((b) => {
            const dx = x - b.x;
            const dy = y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < BUMPER_RADIUS + BALL_RADIUS) {
              const angle = Math.atan2(dy, dx);
              vx = Math.cos(angle) * Math.abs(vx) + (Math.random() - 0.5) * 1.2 * scaleX;
              vy = Math.sin(angle) * Math.abs(vy) - 1.2 * scaleY;
              spawnParticles(x, y, false, scaleX);
              glow = 2.5;
            }
          });
          // 바닥에 닿으면 튕김, 일정 횟수 넘으면 죽음
          if (y > h - BALL_RADIUS) {
            if (bounceCount < maxBounce) {
              y = h - BALL_RADIUS;
              vy = -Math.abs(vy) * 0.7;
              bounceCount += 1;
              glow = 2.5;
              spawnParticles(x, y, true, scaleX);
            } else {
              return { ...ball, alive: false };
            }
          }
          // glow 감소
          glow = Math.max(0, glow - 0.08);
          return { ...ball, x: x + vx, y: y + vy, vx, vy, bounceCount, glow };
        });
        // 1등 결정
        const stillAlive = updated.filter((b) => b.alive);
        if (stillAlive.length === 1 && aliveBalls.length > 1) {
          setWinner(stillAlive[0].email);
          setShowConfetti(true);
        }
        return updated;
      });
      // 파티클
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.025,
          }))
          .filter((p) => p.life > 0)
      );
    }

    function spawnParticles(x, y, spark = false, scaleX = 1) {
      setParticles((prev) => [
        ...prev,
        ...Array.from({ length: spark ? 24 : 12 }).map(() => ({
          x,
          y,
          vx: (Math.random() - 0.5) * (spark ? 7 : 4) * scaleX,
          vy: (Math.random() - 0.5) * (spark ? 7 : 4) * scaleX,
          life: 1,
          spark,
        })),
      ]);
    }

    update();
    draw();
    animation = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animation);
    // eslint-disable-next-line
  }, [balls, flipperAngle, gameStarted, particles, winner, canvasSize]);

  // 키보드 플리퍼 조작
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") setFlipperAngle(38); // FLIPPER_ANGLE 대신 38 사용
    };
    const handleKeyUp = (e) => {
      if (e.code === "Space") setFlipperAngle(0);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  // 터치 플리퍼 조작
  useEffect(() => {
    const handleTouchStart = () => setFlipperAngle(38); // FLIPPER_ANGLE 대신 38 사용
    const handleTouchEnd = () => setFlipperAngle(0);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // confetti 애니메이션 (간단한 CSS)
  useEffect(() => {
    if (!showConfetti) return;
    const timer = setTimeout(() => setShowConfetti(false), 3500);
    return () => clearTimeout(timer);
  }, [showConfetti]);

  return (
    <div className="w-full flex flex-col items-center justify-center py-6">
      <div className="w-full max-w-[1000px] mx-auto bg-gradient-to-b from-orange-400 to-yellow-200 rounded-2xl shadow-2xl p-2 relative">
        <canvas
          ref={canvasRef}
          width={canvasSize.w}
          height={canvasSize.h}
          className="w-full h-auto rounded-xl bg-black"
        />
        <div className="flex justify-center items-center mt-4">
          <button
            className="bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold px-10 py-4 rounded-full text-xl shadow-xl hover:scale-105 hover:brightness-110 transition-all duration-200"
            onClick={handleStart}
          >
            핀볼 추첨!
          </button>
        </div>
        {winner && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 animate-fade-in">
            {/* 캐릭터 이미지로 1등 연출 */}
            <img
              src="/lovable-uploads/144.svg"
              alt="읏 캐릭터"
              className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[120px] h-[120px] md:w-[170px] md:h-[170px] drop-shadow-2xl animate-eut"
              style={{ zIndex: 10, filter: 'drop-shadow(0 8px 32px #ff8800cc)' }}
            />
            {/* 상자 애니메이션 */}
            <div className="relative flex flex-col items-center">
              {/* 상자 본체 (충분히 크게, 반응형) */}
              <div className="w-[90vw] max-w-[500px] h-[220px] bg-yellow-200 border-4 border-orange-400 rounded-b-3xl shadow-2xl relative z-20 flex items-end justify-center overflow-visible px-4 sm:w-[400px] md:w-[500px] md:h-[220px]">
                {/* 1등 이메일 */}
                <span
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 font-extrabold text-blue-700 animate-winner text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                  style={{
                    animationDelay: '1.1s',
                    maxWidth: '92%',
                    minWidth: '120px',
                    padding: '0 18px',
                    overflowWrap: 'break-word',
                    wordBreak: 'break-all',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'pre-line',
                    display: 'block',
                    textAlign: 'center',
                    background: 'rgba(255,255,255,0.12)',
                    borderRadius: '12px',
                    lineHeight: 1.3,
                    fontWeight: 800,
                    letterSpacing: '0.5px',
                  }}
                  title={maskEmail(winner)}
                >
                  {maskEmail(winner)}
                </span>
              </div>
              {/* 상자 뚜껑 (충분히 크게, 반응형) */}
              <div
                className="w-[90vw] max-w-[500px] h-[70px] bg-orange-400 border-4 border-orange-500 rounded-t-3xl shadow-xl absolute left-0 -top-16 origin-bottom animate-lid sm:w-[400px] md:w-[500px] md:h-[70px]"
                style={{ zIndex: 30 }}
              />
              {/* 파티클/폭죽 효과 */}
              <div className="absolute inset-0 pointer-events-none z-40">
                {[...Array(40)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-8 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 60 + 10}%`,
                      background: `hsl(${Math.random() * 360},90%,60%)`,
                      opacity: 0.7,
                      transform: `rotate(${Math.random() * 360}deg) scale(${0.7 + Math.random() * 0.7})`,
                      animation: `confetti-fall 1.8s cubic-bezier(.4,1.6,.4,1) ${Math.random()}s both`,
                    }}
                  />
                ))}
              </div>
              <style>{`
                @keyframes eut {
                  0% { opacity: 0; transform: scale(0.7) translateY(40px);}
                  60% { opacity: 1; transform: scale(1.15) translateY(-10px);}
                  100% { opacity: 1; transform: scale(1) translateY(0);}
                }
                .animate-eut { animation: eut 1.1s cubic-bezier(.4,1.6,.4,1) both; }
                @keyframes lid {
                  0% { transform: rotate(0deg) translateY(0);}
                  60% { transform: rotate(-80deg) translateY(-60px);}
                  100% { transform: rotate(-100deg) translateY(-80px);}
                }
                .animate-lid { animation: lid 1.1s cubic-bezier(.4,1.6,.4,1) both; }
                @keyframes winner {
                  0% { opacity: 0; transform: scale(0.7);}
                  80% { opacity: 0; }
                  100% { opacity: 1; transform: scale(1);}
                }
                .animate-winner { animation: winner 1.6s 0.2s cubic-bezier(.4,1.6,.4,1) both; }
                @keyframes confetti-fall {
                  0% { opacity: 0; transform: translateY(-60px) scale(1) rotate(0deg);}
                  20% { opacity: 1; }
                  100% { opacity: 0; transform: translateY(400px) scale(0.7) rotate(360deg);}
                }
                .animate-fade-in { animation: fade-in 0.7s both; }
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
              `}</style>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 