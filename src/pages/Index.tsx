
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Shield, Trophy, Volleyball, ArrowRight, Heart, Star, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* 배경 이미지 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/92937f78-fb45-4b28-8ad5-2436de8c8b6d.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
      </div>

      {/* 네비게이션 헤더 */}
      <header className="relative z-20 backdrop-blur-sm bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 rounded-full p-2 shadow-lg">
                <Volleyball className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white font-korean">OK스포츠 이벤트</h1>
                <p className="text-xs text-blue-200 font-korean">열정과 함께하는 배구의 순간</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-sm px-4 py-2 font-korean"
              >
                로그인
              </Button>
              <Button 
                onClick={() => navigate('/signup')}
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 font-korean"
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
        <Badge className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-sm rounded-full shadow-lg font-korean">
          <Sparkles className="w-4 h-4 mr-2" />
          OK금융그룹 임직원 전용
        </Badge>
        
        {/* 메인 제목 */}
        <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight font-korean">
          <span className="text-white drop-shadow-2xl">열정적인 순간,</span>
        </h2>
        
        {/* 서브 제목 */}
        <div className="flex items-center justify-center mb-8">
          <span className="text-2xl md:text-4xl font-bold text-blue-400 font-korean mr-3">
            배구로 맺는 열정
          </span>
          <Heart className="w-8 h-8 text-pink-400" />
        </div>
        
        {/* 설명 텍스트 */}
        <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-3xl leading-relaxed font-korean">
          달빛이 비치는 환상적인 코트에서 펼쳐지는 역동적인 경기,<br />
          동료들과 함께 나누는 뜨거운 응원과 감동의 순간을 경험하세요
        </p>
        
        {/* 액션 버튼들 */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button 
            onClick={() => navigate('/signup')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-full shadow-lg font-korean"
          >
            <Star className="w-5 h-5 mr-2" />
            지금 시작하기
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/events')}
            className="border-2 border-white/50 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-4 rounded-full font-korean"
          >
            <Calendar className="w-5 h-5 mr-2" />
            경기 일정 보기
          </Button>
        </div>

        {/* 기능 카드 섹션 */}
        <div className="w-full max-w-6xl">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 font-korean">
            특별한 경험이 기다립니다
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* 일정 조회 카드 */}
            <Card className="backdrop-blur-sm bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white font-korean">일정 조회</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-200 font-korean">
                  배구 경기 일정을 확인하고 관람 신청하세요
                </CardDescription>
              </CardContent>
            </Card>

            {/* 신청 관리 카드 */}
            <Card className="backdrop-blur-sm bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white font-korean">신청 관리</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-200 font-korean">
                  안전한 이메일 인증으로 임직원 전용 접근
                </CardDescription>
              </CardContent>
            </Card>

            {/* 결과 시각화 카드 */}
            <Card className="backdrop-blur-sm bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white font-korean">결과 시각화</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-200 font-korean">
                  참석 결과를 재미있는 애니메이션으로 확인
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="relative z-10 backdrop-blur-sm bg-white/5 text-white py-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="bg-blue-600 rounded-full p-2">
              <Volleyball className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold font-korean">OK스포츠 이벤트</span>
          </div>
          <p className="text-gray-300 font-korean">
            © 2024 OK금융그룹. 함께하는 열정, 나누는 감동
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
