import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Shield, Trophy, Volleyball, ArrowRight, Star, Sparkles, Zap, Target, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/lovable-uploads/pexels-enginakyurt-1552620.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.96) saturate(1.05)',
        }}
      />
      {/* glassmorphism 오버레이(더 불투명, 부드러운 톤) */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[8px] z-10" />
      {/* 중앙 glass 카드 */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full">
        <div className="max-w-md w-full mx-auto px-8 py-12 flex flex-col items-center shadow-2xl rounded-3xl border border-white/70 bg-white/95 backdrop-blur-[16px] drop-shadow-2xl">
          {/* 상단 로고/엠블럼 */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-full p-2 md:p-3 shadow-2xl border-4 border-yellow-300/70 flex items-center justify-center">
              <img
                src="/lovable-uploads/144.svg"
                alt="OK저축은행 읏맨"
                className="w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-xl"
                style={{ filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.18))' }}
              />
            </div>
          </div>
          {/* 중앙 타이틀 한 줄, 웃맨 설명 */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 drop-shadow-lg font-korean tracking-tight mb-2 text-center">OK저축은행 웃맨</h1>
          <p className="text-sm md:text-base text-gray-400 font-korean mb-8 text-center">웃맨은 OK저축은행의 공식 마스코트입니다.</p>
          {/* 버튼 그룹 */}
          <div className="w-full flex flex-col gap-6 mt-2">
            <div className="w-full flex flex-row items-center justify-center gap-5">
              <button
                onClick={() => navigate('/login')}
                className="flex-1 py-5 text-xl font-bold rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg hover:brightness-105 hover:scale-[1.03] transition-all duration-200 border-none focus:outline-none focus:ring-2 focus:ring-orange-200"
              >
                로그인
              </button>
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full justify-center items-center">
              <button
                onClick={() => navigate('/events')}
                className="flex-1 py-4 text-lg font-bold rounded-2xl bg-orange-100 text-orange-700 shadow hover:bg-orange-200 hover:scale-105 transition-all duration-200 border-none focus:outline-none focus:ring-2 focus:ring-orange-100"
              >
                일정 관리
              </button>
              <button
                onClick={() => navigate('/results')}
                className="flex-1 py-4 text-lg font-bold rounded-2xl bg-orange-100 text-orange-700 shadow hover:bg-orange-200 hover:scale-105 transition-all duration-200 border-none focus:outline-none focus:ring-2 focus:ring-orange-100"
              >
                승리 기록
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
