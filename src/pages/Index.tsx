
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Shield, Trophy, Volleyball, ArrowRight, Heart, Star, Sparkles, Zap, Target, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-400 via-orange-500 to-orange-700">
      {/* 역동적인 배경 패턴 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-orange-500/30 to-orange-600/20"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-orange-300/30 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-orange-500/40 rounded-full blur-lg animate-ping"></div>
        
        {/* 캐릭터 이미지 추가 */}
        <div className="absolute top-32 right-32 w-24 h-24 opacity-30 animate-bounce">
          <img 
            src="/lovable-uploads/bc398776-c73c-4e8b-b61a-e618ea6ffd28.png" 
            alt="읏맨 캐릭터" 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute bottom-32 left-32 w-20 h-20 opacity-20 animate-pulse">
          <img 
            src="/lovable-uploads/bc398776-c73c-4e8b-b61a-e618ea6ffd28.png" 
            alt="읏맨 캐릭터" 
            className="w-full h-full object-contain transform rotate-12"
          />
        </div>
      </div>

      {/* 네비게이션 헤더 - 스포츠 느낌 강화 */}
      <header className="relative z-20 backdrop-blur-md bg-black/30 border-b-4 border-orange-400/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-full p-3 shadow-2xl border-4 border-yellow-400/60">
                <Volleyball className="h-8 w-8 text-white animate-spin" style={{animationDuration: '3s'}} />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white font-korean drop-shadow-2xl tracking-wide">
                  OK금융그룹 읏맨 배구단
                </h1>
                <p className="text-sm text-yellow-300 font-korean font-bold flex items-center">
                  <Zap className="w-4 h-4 mr-1" />
                  열정과 승리의 스포츠 정신
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="border-3 border-yellow-400 text-yellow-300 hover:bg-yellow-400 hover:text-black backdrop-blur-sm text-sm px-8 py-3 font-korean font-bold transition-all duration-300 hover:scale-110 hover:shadow-xl shadow-yellow-400/50"
              >
                <Shield className="w-4 h-4 mr-2" />
                로그인
              </Button>
              <Button 
                onClick={() => navigate('/signup')}
                className="bg-gradient-to-r from-yellow-500 via-orange-400 to-orange-500 hover:from-yellow-600 hover:via-orange-500 hover:to-orange-600 text-black text-sm px-8 py-3 font-korean font-black transition-all duration-300 hover:scale-110 hover:shadow-2xl shadow-orange-400/80 border-2 border-yellow-400"
              >
                <Star className="w-4 h-4 mr-2" />
                팀원 등록
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 - 스포츠 정신 반영 */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-4 text-center">
        {/* 상단 뱃지 - 승리의 정신 */}
        <Badge className="mb-10 bg-gradient-to-r from-yellow-500 via-orange-500 to-orange-600 hover:from-yellow-600 hover:via-orange-600 hover:to-orange-700 text-black px-12 py-4 text-base rounded-full shadow-2xl backdrop-blur-sm font-korean font-black transition-all duration-500 hover:scale-110 border-4 border-yellow-400/80">
          <Award className="w-5 h-5 mr-3 animate-bounce" />
          OK금융그룹 읏맨 전용 플랫폼
          <Target className="w-5 h-5 ml-3 animate-pulse" />
        </Badge>
        
        {/* 메인 제목 - 임팩트 강화 */}
        <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight font-korean transform hover:scale-105 transition-transform duration-500">
          <span className="text-yellow-300 drop-shadow-2xl animate-pulse">승리를 향한</span>
        </h2>
        
        {/* 서브 제목 - 스포츠 정신 */}
        <div className="flex items-center justify-center mb-10 transform hover:scale-105 transition-transform duration-300">
          <span className="text-3xl md:text-5xl font-black text-white font-korean mr-4 drop-shadow-2xl">
            열정적인 도전
          </span>
          <div className="flex space-x-2">
            <Heart className="w-10 h-10 text-orange-300 animate-pulse" />
            <Volleyball className="w-10 h-10 text-orange-200 animate-bounce" />
          </div>
        </div>
        
        {/* 설명 텍스트 - 팀 정신 강조 */}
        <p className="text-xl md:text-2xl text-yellow-100 mb-16 max-w-4xl leading-relaxed font-korean font-bold drop-shadow-lg">
          함께 뛰고, 함께 응원하며, 함께 승리하는<br />
          <span className="text-yellow-300 font-black">OK금융그룹 읏맨 배구단</span>의 열정적인 순간들
        </p>
        
        {/* 액션 버튼들 - 스포츠 정신 반영 */}
        <div className="flex flex-col sm:flex-row gap-8 mb-20">
          <Button 
            onClick={() => navigate('/signup')}
            className="group bg-gradient-to-r from-yellow-500 via-orange-500 to-orange-600 hover:from-yellow-600 hover:via-orange-600 hover:to-orange-700 text-black text-xl px-16 py-6 rounded-2xl shadow-2xl font-korean font-black transition-all duration-500 hover:scale-125 hover:shadow-orange-400/80 transform hover:-translate-y-2 relative overflow-hidden border-4 border-yellow-400"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Trophy className="w-6 h-6 mr-3 relative z-10 animate-bounce" />
            <span className="relative z-10">읏맨 도전하기</span>
            <Zap className="w-6 h-6 ml-3 relative z-10 group-hover:rotate-180 transition-transform duration-500" />
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => navigate('/events')}
            className="group border-4 border-yellow-400 text-yellow-300 hover:bg-yellow-400 hover:text-black backdrop-blur-sm text-xl px-16 py-6 rounded-2xl font-korean font-black transition-all duration-500 hover:scale-125 hover:shadow-2xl hover:shadow-yellow-400/60 transform hover:-translate-y-2"
          >
            <Calendar className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
            <span>경기 일정</span>
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
          </Button>
        </div>

        {/* 기능 카드 섹션 - 스포츠 테마 */}
        <div className="w-full max-w-7xl">
          <h3 className="text-3xl md:text-4xl font-black text-yellow-300 mb-16 font-korean drop-shadow-2xl flex items-center justify-center">
            <Award className="w-8 h-8 mr-4 animate-bounce" />
            읏맨 스피릿을 경험하세요
            <Target className="w-8 h-8 ml-4 animate-spin" style={{animationDuration: '4s'}} />
          </h3>
          
          <div className="grid md:grid-cols-3 gap-10">
            {/* 일정 조회 카드 */}
            <Card className="group backdrop-blur-md bg-gradient-to-br from-orange-400/20 via-orange-500/15 to-orange-600/20 border-4 border-yellow-400/50 hover:border-yellow-400 hover:bg-gradient-to-br hover:from-orange-300/30 hover:via-orange-400/25 hover:to-orange-500/30 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-orange-400/40 transform hover:-translate-y-4">
              <CardHeader className="text-center">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:scale-125 transition-transform duration-500 border-4 border-yellow-400/60">
                  <Calendar className="h-12 w-12 text-white animate-pulse" />
                </div>
                <CardTitle className="text-2xl text-yellow-300 font-korean font-black">경기 일정</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-white font-korean font-bold text-base">
                  뜨거운 배구 경기 일정을 확인하고<br />관람 신청으로 승리를 응원하세요
                </CardDescription>
              </CardContent>
            </Card>

            {/* 신청 관리 카드 */}
            <Card className="group backdrop-blur-md bg-gradient-to-br from-orange-400/20 via-orange-500/15 to-orange-600/20 border-4 border-yellow-400/50 hover:border-yellow-400 hover:bg-gradient-to-br hover:from-orange-300/30 hover:via-orange-400/25 hover:to-orange-500/30 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-orange-400/40 transform hover:-translate-y-4">
              <CardHeader className="text-center">
                <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:scale-125 transition-transform duration-500 border-4 border-yellow-400/60">
                  <Users className="h-12 w-12 text-white animate-bounce" />
                </div>
                <CardTitle className="text-2xl text-yellow-300 font-korean font-black">팀원 인증</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-white font-korean font-bold text-base">
                  안전한 이메일 인증으로<br />읏맨 전용 플랫폼 접근
                </CardDescription>
              </CardContent>
            </Card>

            {/* 결과 시각화 카드 */}
            <Card className="group backdrop-blur-md bg-gradient-to-br from-orange-400/20 via-orange-500/15 to-orange-600/20 border-4 border-yellow-400/50 hover:border-yellow-400 hover:bg-gradient-to-br hover:from-orange-300/30 hover:via-orange-400/25 hover:to-orange-500/30 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-green-500/40 transform hover:-translate-y-4">
              <CardHeader className="text-center">
                <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:scale-125 transition-transform duration-500 border-4 border-yellow-400/60">
                  <Trophy className="h-12 w-12 text-white animate-spin" style={{animationDuration: '3s'}} />
                </div>
                <CardTitle className="text-2xl text-yellow-300 font-korean font-black">승리 기록</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-white font-korean font-bold text-base">
                  참석 결과를 역동적인<br />애니메이션으로 시각화
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* 푸터 - 팀 정신 반영 */}
      <footer className="relative z-10 backdrop-blur-md bg-black/40 text-white py-10 border-t-4 border-orange-400/60">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-full p-3 shadow-2xl border-4 border-yellow-400/60">
              <Volleyball className="h-6 w-6 text-white animate-pulse" />
            </div>
            <span className="text-xl font-black font-korean text-yellow-300">OK금융그룹 읏맨 배구단</span>
            <Award className="w-6 h-6 text-yellow-400 animate-bounce" />
          </div>
          <p className="text-yellow-200 font-korean font-bold">
            © 2024 OK금융그룹. 하나된 마음, 승리를 향한 열정
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
