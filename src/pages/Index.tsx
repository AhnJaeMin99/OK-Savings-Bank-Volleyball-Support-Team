
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Shield, Trophy, Volleyball, ArrowRight, Heart, Star, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 배경 이미지 - 새로운 자연 느낌 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/edd78f14-0787-4f83-a7e5-987b2cd1558b.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/40 via-orange-800/30 to-amber-900/50"></div>
      </div>

      {/* 네비게이션 헤더 */}
      <header className="relative z-20 backdrop-blur-md bg-white/10 border-b border-amber-200/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-full p-2 shadow-lg">
                <Volleyball className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white font-korean drop-shadow-lg">OK스포츠 이벤트</h1>
                <p className="text-xs text-amber-200 font-korean">자연과 함께하는 배구의 순간</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="border-2 border-white/40 text-white hover:bg-white/20 backdrop-blur-sm text-sm px-6 py-2 font-korean transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                로그인
              </Button>
              <Button 
                onClick={() => navigate('/signup')}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-sm px-6 py-2 font-korean transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
              >
                회원가입
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 text-center">
        {/* 상단 뱃지 */}
        <Badge className="mb-8 bg-gradient-to-r from-amber-600/90 to-orange-600/90 hover:from-amber-700/90 hover:to-orange-700/90 text-white px-8 py-3 text-sm rounded-full shadow-2xl backdrop-blur-sm font-korean transition-all duration-300 hover:scale-105">
          <Sparkles className="w-4 h-4 mr-2" />
          OK금융그룹 임직원 전용
        </Badge>
        
        {/* 메인 제목 */}
        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight font-korean">
          <span className="text-white drop-shadow-2xl">자연 속에서 펼쳐지는</span>
        </h2>
        
        {/* 서브 제목 */}
        <div className="flex items-center justify-center mb-8">
          <span className="text-2xl md:text-4xl font-bold text-amber-200 font-korean mr-3 drop-shadow-lg">
            열정적인 배구 경기
          </span>
          <Heart className="w-8 h-8 text-red-400 animate-pulse" />
        </div>
        
        {/* 설명 텍스트 */}
        <p className="text-lg md:text-xl text-amber-100 mb-12 max-w-3xl leading-relaxed font-korean drop-shadow-md">
          평온한 자연 속에서 펼쳐지는 역동적인 경기,<br />
          동료들과 함께 나누는 뜨거운 응원과 감동의 순간을 경험하세요
        </p>
        
        {/* 액션 버튼들 - 더 매력적으로 개선 */}
        <div className="flex flex-col sm:flex-row gap-6 mb-16">
          <Button 
            onClick={() => navigate('/signup')}
            className="group bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white text-lg px-10 py-5 rounded-full shadow-2xl font-korean transition-all duration-500 hover:scale-110 hover:shadow-amber-500/50 transform hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Star className="w-5 h-5 mr-2 relative z-10" />
            <span className="relative z-10">지금 시작하기</span>
            <ArrowRight className="w-5 h-5 ml-2 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/events')}
            className="group border-2 border-white/60 text-white hover:bg-white/20 backdrop-blur-sm text-lg px-10 py-5 rounded-full font-korean transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-white/20 transform hover:-translate-y-1"
          >
            <Calendar className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            <span>경기 일정 보기</span>
          </Button>
        </div>

        {/* 기능 카드 섹션 */}
        <div className="w-full max-w-6xl">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-12 font-korean drop-shadow-lg">
            특별한 경험이 기다립니다
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* 일정 조회 카드 */}
            <Card className="group backdrop-blur-md bg-white/15 border-white/30 hover:bg-white/25 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20 transform hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl text-white font-korean">일정 조회</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-amber-100 font-korean">
                  배구 경기 일정을 확인하고 관람 신청하세요
                </CardDescription>
              </CardContent>
            </Card>

            {/* 신청 관리 카드 */}
            <Card className="group backdrop-blur-md bg-white/15 border-white/30 hover:bg-white/25 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 transform hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl text-white font-korean">신청 관리</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-amber-100 font-korean">
                  안전한 이메일 인증으로 임직원 전용 접근
                </CardDescription>
              </CardContent>
            </Card>

            {/* 결과 시각화 카드 */}
            <Card className="group backdrop-blur-md bg-white/15 border-white/30 hover:bg-white/25 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 transform hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl text-white font-korean">결과 시각화</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-amber-100 font-korean">
                  참석 결과를 재미있는 애니메이션으로 확인
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="relative z-10 backdrop-blur-md bg-white/10 text-white py-8 border-t border-amber-200/20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-full p-2 shadow-lg">
              <Volleyball className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold font-korean">OK스포츠 이벤트</span>
          </div>
          <p className="text-amber-200 font-korean">
            © 2024 OK금융그룹. 자연과 함께하는 열정, 나누는 감동
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
