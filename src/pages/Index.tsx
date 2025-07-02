
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Shield, Trophy, Volleyball } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 rounded-lg p-2">
                <Volleyball className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">OK스포츠 이벤트</h1>
                <p className="text-sm text-gray-600">OK금융그룹 임직원 전용</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="hover:bg-blue-50"
              >
                로그인
              </Button>
              <Button 
                onClick={() => navigate('/signup')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                회원가입
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200">
            OK금융그룹 임직원 전용 이벤트
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            배구 경기 관람
            <span className="text-blue-600 block">함께 응원해요! 🏐</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            OK금융그룹 임직원을 위한 특별한 배구 경기 관람 이벤트입니다. 
            동료들과 함께 열정적인 경기를 관람하고 소중한 추억을 만들어보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/signup')}
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
            >
              지금 가입하기
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/events')}
              className="text-lg px-8 py-3 hover:bg-blue-50"
            >
              경기 일정 보기
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            플랫폼 특징
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">안전한 인증</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  회사 이메일 인증을 통한 임직원 전용 접근으로 보안을 보장합니다.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">간편한 신청</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  배구 경기 일정을 확인하고 클릭 한 번으로 간편하게 신청할 수 있습니다.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">실시간 관리</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  자동화된 참석 관리와 실시간 결과 확인으로 효율적인 이벤트 운영이 가능합니다.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            지금 바로 시작하세요!
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            OK금융그룹 임직원이라면 누구나 참여할 수 있습니다.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate('/signup')}
            className="text-lg px-8 py-3 bg-white text-blue-600 hover:bg-gray-100"
          >
            회원가입하고 이벤트 참여하기
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-blue-600 rounded-lg p-2">
              <Volleyball className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold">OK스포츠 이벤트</span>
          </div>
          <p className="text-gray-400">
            © 2024 OK금융그룹. 임직원 전용 스포츠 이벤트 플랫폼
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
