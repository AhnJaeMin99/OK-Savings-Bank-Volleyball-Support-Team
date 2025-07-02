
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Shield, Trophy, Volleyball, ArrowRight, Flame, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-sm bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-3 shadow-lg">
                <Volleyball className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">OK스포츠 이벤트</h1>
                <p className="text-sm text-orange-200">열정과 함께하는 배구의 순간</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                로그인
              </Button>
              <Button 
                onClick={() => navigate('/signup')}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg"
              >
                회원가입
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Badge className="mb-4 bg-gradient-to-r from-orange-400 to-red-400 text-white hover:from-orange-500 hover:to-red-500 px-6 py-2 text-lg">
              <Flame className="w-4 h-4 mr-2" />
              OK금융그룹 임직원 전용
            </Badge>
          </div>
          
          <h2 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 mb-8 leading-tight">
            함께 만드는
            <span className="block text-white">배구의 열정 🔥</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
            석양이 물든 코트에서 펼쳐지는 역동적인 경기,<br />
            동료들과 함께 나누는 뜨거운 응원과 감동의 순간을 경험하세요
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Star className="w-6 h-6 mr-3" />
              지금 시작하기
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/events')}
              className="border-2 border-white/50 text-white hover:bg-white/10 backdrop-blur-sm text-xl px-12 py-6 rounded-full"
            >
              경기 일정 보기
            </Button>
          </div>
        </div>
      </section>

      {/* Dynamic Image Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
            <img 
              src="/lovable-uploads/43b6a157-fe80-4d38-89ed-5af2b3a93f1e.png" 
              alt="배구 경기 실루엣" 
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="text-3xl font-bold text-white mb-4">열정이 만나는 순간</h3>
              <p className="text-xl text-gray-200">석양 속에서 펼쳐지는 드라마틱한 경기, 우리가 함께 만들어갈 이야기</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">특별한 경험</span>이 기다립니다
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <CardHeader className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-white">안전한 인증</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-200 text-lg">
                  회사 이메일 인증을 통한 완벽한 보안 시스템으로 임직원만의 특별한 공간을 제공합니다
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <CardHeader className="text-center">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Calendar className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-white">간편한 신청</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-200 text-lg">
                  직관적인 인터페이스로 언제 어디서나 쉽고 빠르게 경기 관람을 신청할 수 있습니다
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <CardHeader className="text-center">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Trophy className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-white">실시간 관리</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-200 text-lg">
                  스마트한 자동화 시스템으로 참석 관리부터 결과 확인까지 모든 것이 실시간으로
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-8">
              열정의 무대로 <span className="text-yellow-300">초대합니다</span>
            </h3>
            <p className="text-xl md:text-2xl text-orange-100 mb-10 leading-relaxed">
              OK금융그룹 가족이라면 누구나 참여할 수 있는<br />
              특별하고 뜨거운 순간들이 여러분을 기다리고 있습니다
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/signup')}
              className="text-xl px-12 py-6 bg-white text-orange-600 hover:bg-gray-100 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <Users className="w-6 h-6 mr-3" />
              지금 참여하기
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/30 backdrop-blur-sm text-white py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-3 shadow-lg">
              <Volleyball className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold">OK스포츠 이벤트</span>
          </div>
          <p className="text-gray-300 text-lg">
            © 2024 OK금융그룹. 함께하는 열정, 나누는 감동
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
