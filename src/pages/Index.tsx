
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Shield, Trophy, Volleyball, ArrowRight, Flame, Star, Sparkles, Heart, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 환상적인 배경 이미지 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/92937f78-fb45-4b28-8ad5-2436de8c8b6d.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/10 to-pink-900/20"></div>
      </div>

      {/* 떠다니는 파티클 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full ok-float opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-pink-400 rounded-full ok-float opacity-80" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-1/5 w-3 h-3 bg-purple-400 rounded-full ok-float opacity-50" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-yellow-400 rounded-full ok-float opacity-70" style={{animationDelay: '3s'}}></div>
      </div>

      {/* 네비게이션 헤더 */}
      <header className="relative z-20 ok-glassmorphism border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="ok-button-primary rounded-xl p-3 shadow-lg ok-glow">
                <Volleyball className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white font-display">OK스포츠 이벤트</h1>
                <p className="text-sm text-blue-200">열정과 함께하는 배구의 순간</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="border-white/30 text-white hover:bg-white/10 ok-glassmorphism focus-visible:focus backdrop-blur-sm"
              >
                로그인
              </Button>
              <Button 
                onClick={() => navigate('/signup')}
                className="ok-button-secondary text-white shadow-lg focus-visible:focus"
              >
                회원가입
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section className="relative z-10 py-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Badge className="mb-4 ok-button-secondary text-white hover:bg-orange-600 px-8 py-3 text-lg rounded-full shadow-lg">
              <Flame className="w-5 h-5 mr-3" />
              OK금융그룹 임직원 전용
              <Sparkles className="w-5 h-5 ml-3" />
            </Badge>
          </div>
          
          <h2 className="text-responsive-xl font-bold mb-8 leading-tight font-display">
            <span className="text-white drop-shadow-2xl">환상적인 순간,</span>
            <br />
            <span className="ok-gradient-text drop-shadow-lg">함께 만드는 배구의 열정</span>
            <div className="inline-block ml-4">
              <Heart className="w-12 h-12 text-pink-400 ok-float" />
            </div>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-100 mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
            달빛이 비치는 환상적인 코트에서 펼쳐지는 역동적인 경기,<br />
            동료들과 함께 나누는 뜨거운 응원과 감동의 순간을 경험하세요
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/signup')}
              className="ok-button-primary text-xl px-12 py-6 rounded-full shadow-2xl ok-scale-hover focus-visible:focus"
            >
              <Star className="w-6 h-6 mr-3" />
              지금 시작하기
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/events')}
              className="border-2 border-white/50 text-white hover:bg-white/10 ok-glassmorphism text-xl px-12 py-6 rounded-full focus-visible:focus"
            >
              <Calendar className="w-6 h-6 mr-3" />
              경기 일정 보기
            </Button>
          </div>
        </div>
      </section>

      {/* 핵심 기능 카드 섹션 */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-responsive-lg font-bold text-center text-white mb-16 font-display drop-shadow-lg">
            <span className="ok-gradient-text">특별한 경험</span>이 기다립니다
            <Zap className="inline-block w-8 h-8 ml-4 text-yellow-400 ok-float" />
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="ok-card ok-scale-hover transition-all duration-300 hover:shadow-2xl group">
              <CardHeader className="text-center">
                <div className="ok-button-primary rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:ok-glow">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-800 font-display">안전한 인증</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 text-lg leading-relaxed">
                  회사 이메일 인증을 통한 완벽한 보안 시스템으로 임직원만의 특별한 공간을 제공합니다
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="ok-card ok-scale-hover transition-all duration-300 hover:shadow-2xl group">
              <CardHeader className="text-center">
                <div className="ok-button-secondary rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:ok-glow">
                  <Calendar className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-800 font-display">간편한 신청</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 text-lg leading-relaxed">
                  직관적인 인터페이스로 언제 어디서나 쉽고 빠르게 경기 관람을 신청할 수 있습니다
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="ok-card ok-scale-hover transition-all duration-300 hover:shadow-2xl group">
              <CardHeader className="text-center">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:ok-glow">
                  <Trophy className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-800 font-display">실시간 관리</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 text-lg leading-relaxed">
                  스마트한 자동화 시스템으로 참석 관리부터 결과 확인까지 모든 것이 실시간으로
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="ok-card p-12 shadow-2xl ok-scale-hover transition-transform duration-300">
            <h3 className="text-responsive-md font-bold mb-8 font-display">
              <span className="ok-gradient-text">열정의 무대로</span>{' '}
              <span className="text-yellow-600">초대합니다</span>
              <Sparkles className="inline-block w-8 h-8 ml-4 text-purple-500 ok-float" />
            </h3>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              OK금융그룹 가족이라면 누구나 참여할 수 있는<br />
              특별하고 뜨거운 순간들이 여러분을 기다리고 있습니다
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/signup')}
              className="ok-button-primary text-xl px-12 py-6 rounded-full shadow-lg ok-scale-hover focus-visible:focus"
            >
              <Users className="w-6 h-6 mr-3" />
              지금 참여하기
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </Card>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="relative z-10 ok-glassmorphism text-white py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="ok-button-primary rounded-xl p-3 shadow-lg">
              <Volleyball className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold font-display">OK스포츠 이벤트</span>
          </div>
          <p className="text-gray-200 text-lg">
            © 2024 OK금융그룹. 함께하는 열정, 나누는 감동
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
