
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Confetti } from "@/components/Confetti";
import { 
  Trophy, 
  Users, 
  Calendar, 
  MapPin, 
  Star,
  Volleyball,
  ArrowLeft,
  PartyPopper,
  Camera,
  Heart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Results = () => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  const eventResults = [
    {
      id: 1,
      title: "V리그 남자부 결승전",
      date: "2024년 7월 15일",
      venue: "수원실내체육관",
      teams: "현대캐피탈 vs OK금융그룹 읽기나이스공격수",
      result: "OK금융그룹 승리! 🏆",
      score: "3-2 (25-23, 23-25, 25-22, 22-25, 15-12)",
      participants: 45,
      satisfaction: 4.8,
      highlights: [
        "🏐 환상적인 스파이크 장면들",
        "📣 열정적인 응원 분위기",
        "🤝 동료들과의 즐거운 시간",
        "📸 멋진 단체사진 촬영"
      ],
      isCompleted: true
    },
    {
      id: 2,
      title: "V리그 여자부 준결승",
      date: "2024년 7월 20일",
      venue: "인천계양체육관",
      teams: "흥국생명 vs GS칼텍스",
      result: "흥국생명 승리",
      score: "3-1 (25-20, 23-25, 25-19, 25-22)",
      participants: 32,
      satisfaction: 4.6,
      highlights: [
        "⚡ 빠른 공격과 수비",
        "🎯 정확한 세팅 플레이",
        "👏 박수갈채가 끊이지 않은 경기",
        "🍿 간식과 함께한 관람"
      ],
      isCompleted: true
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(true);
      setAnimationStep(1);
    }, 500);

    const animationTimer = setInterval(() => {
      setAnimationStep(prev => (prev < 3 ? prev + 1 : prev));
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(animationTimer);
    };
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 relative overflow-hidden">
      {showConfetti && <Confetti />}
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                홈으로
              </Button>
              <div className="bg-orange-600 rounded-lg p-2">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">이벤트 결과</h1>
                <p className="text-sm text-gray-600">참여해주신 모든 분들께 감사드립니다!</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <PartyPopper className="h-5 w-5 text-orange-600" />
              <Badge className="bg-orange-100 text-orange-800">
                이벤트 완료
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        {/* Hero Section with Animation */}
        <div className="text-center mb-12">
          <div 
            className={`transform transition-all duration-1000 ${
              animationStep >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              🎉 이벤트 성공적으로 완료! 🎉
            </h2>
          </div>
          
          <div 
            className={`transform transition-all duration-1000 delay-300 ${
              animationStep >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              OK금융그룹 임직원 여러분과 함께한 배구 경기 관람이 성황리에 마무리되었습니다! 
              함께 응원하고 즐거운 시간을 보내주신 모든 분들께 진심으로 감사드립니다.
            </p>
          </div>

          <div 
            className={`flex justify-center space-x-8 transform transition-all duration-1000 delay-500 ${
              animationStep >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">77</div>
              <div className="text-sm text-gray-600">총 참가자</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">2</div>
              <div className="text-sm text-gray-600">완료된 경기</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">4.7</div>
              <div className="text-sm text-gray-600">평균 만족도</div>
            </div>
          </div>
        </div>

        {/* Results Cards */}
        <div className="space-y-8">
          {eventResults.map((event, index) => (
            <Card 
              key={event.id}
              className={`hover:shadow-xl transition-all duration-500 transform ${
                animationStep >= 2 ? 'translate-x-0 opacity-100' : 
                index % 2 === 0 ? '-translate-x-10 opacity-0' : 'translate-x-10 opacity-0'
              } bg-gradient-to-r from-white to-blue-50 border-2 border-blue-200`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-blue-600 to-orange-600 rounded-full p-3">
                      <Volleyball className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-gray-900">
                        {event.title}
                      </CardTitle>
                      <CardDescription className="text-lg">
                        {event.teams}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-lg px-3 py-1">
                    완료
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Event Details */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">{event.date}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-700">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">{event.venue}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">{event.participants}명 참가</span>
                  </div>
                </div>

                {/* Match Result */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
                  <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                    <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
                    경기 결과
                  </h4>
                  <p className="text-2xl font-bold text-green-600 mb-2">
                    {event.result}
                  </p>
                  <p className="text-lg text-gray-700 font-mono">
                    {event.score}
                  </p>
                </div>

                {/* Satisfaction & Highlights */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                    <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Heart className="h-5 w-5 text-red-500 mr-2" />
                      참가자 만족도
                    </h5>
                    <div className="flex items-center space-x-2 mb-2">
                      {renderStars(event.satisfaction)}
                      <span className="text-xl font-bold text-gray-900">
                        {event.satisfaction}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">5점 만점</p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Camera className="h-5 w-5 text-purple-600 mr-2" />
                      이벤트 하이라이트
                    </h5>
                    <ul className="space-y-1">
                      {event.highlights.map((highlight, i) => (
                        <li key={i} className="text-sm text-gray-700">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Camera className="h-4 w-4 mr-2" />
                    사진 갤러리 보기
                  </Button>
                  <Button variant="outline">
                    이벤트 후기 작성
                  </Button>
                  <Button variant="outline">
                    다음 이벤트 알림 받기
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Thank You Section */}
        <div 
          className={`text-center mt-16 p-8 bg-gradient-to-r from-blue-600 to-orange-600 rounded-xl shadow-lg transform transition-all duration-1000 delay-1000 ${
            animationStep >= 3 ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            감사합니다! 🙏
          </h3>
          <p className="text-xl text-blue-100 mb-6">
            OK금융그룹 임직원 여러분의 적극적인 참여 덕분에 
            성공적인 이벤트가 될 수 있었습니다!
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              size="lg"
              variant="secondary"
              onClick={() => navigate('/events')}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              다음 이벤트 확인하기
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              피드백 남기기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
