
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Users, Clock, Volleyball, ArrowLeft, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

const Events = () => {
  const navigate = useNavigate();
  const [appliedEvents, setAppliedEvents] = useState<number[]>([]);

  const volleyballEvents = [
    {
      id: 1,
      title: "V리그 남자부 결승전",
      date: "2024년 7월 15일 (월)",
      time: "19:00 - 21:00",
      venue: "수원실내체육관",
      teams: "현대캐피탈 vs OK금융그룹 읽기나이스공격수",
      maxParticipants: 100,
      currentParticipants: 45,
      status: "모집중",
      description: "V리그 남자부 플레이오프 결승전! OK금융그룹을 응원하러 함께 가요!",
      isSpecial: true
    },
    {
      id: 2,
      title: "V리그 여자부 준결승",
      date: "2024년 7월 20일 (토)",
      time: "14:00 - 16:00",
      venue: "인천계양체육관",
      teams: "흥국생명 vs GS칼텍스",
      maxParticipants: 80,
      currentParticipants: 32,
      status: "모집중",
      description: "여자부 준결승! 치열한 경기를 함께 관람해요.",
      isSpecial: false
    },
    {
      id: 3,
      title: "V리그 남자부 3,4위전",
      date: "2024년 7월 25일 (목)",
      time: "19:00 - 21:00",
      venue: "장충체육관",
      teams: "삼성화재 vs 우리카드",
      maxParticipants: 60,
      currentParticipants: 58,
      status: "마감임박",
      description: "3,4위를 가리는 중요한 경기입니다.",
      isSpecial: false
    },
    {
      id: 4,
      title: "V리그 올스타전",
      date: "2024년 8월 5일 (월)",
      time: "19:30 - 21:30",
      venue: "잠실실내체육관",
      teams: "드림팀 vs 챌린지팀",
      maxParticipants: 120,
      currentParticipants: 120,
      status: "마감",
      description: "올스타들의 화려한 경기! 이미 마감되었습니다.",
      isSpecial: true
    }
  ];

  const handleApply = (eventId: number, eventTitle: string) => {
    const event = volleyballEvents.find(e => e.id === eventId);
    
    if (event?.status === "마감") {
      toast({
        title: "신청 불가",
        description: "이미 마감된 이벤트입니다.",
        variant: "destructive",
      });
      return;
    }

    if (appliedEvents.includes(eventId)) {
      toast({
        title: "이미 신청됨",
        description: "이미 신청한 이벤트입니다.",
        variant: "destructive",
      });
      return;
    }

    setAppliedEvents([...appliedEvents, eventId]);
    toast({
      title: "신청 완료",
      description: `${eventTitle} 관람 신청이 완료되었습니다!`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "모집중": return "bg-green-100 text-green-800";
      case "마감임박": return "bg-orange-100 text-orange-800";
      case "마감": return "bg-gray-100 text-gray-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const getParticipationRate = (current: number, max: number) => {
    return Math.round((current / max) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
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
              <Separator orientation="vertical" className="h-6" />
              <div className="bg-blue-600 rounded-lg p-2">
                <Volleyball className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">배구 경기 일정</h1>
                <p className="text-sm text-gray-600">관람 신청 가능한 경기</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
              >
                로그인
              </Button>
              <Button 
                onClick={() => navigate('/results')}
                className="bg-orange-600 hover:bg-orange-700"
              >
                결과 보기
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            🏐 배구 경기 관람 이벤트
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            OK금융그룹 임직원을 위한 특별한 배구 경기 관람 기회입니다. 
            동료들과 함께 응원하며 소중한 추억을 만들어보세요!
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {volleyballEvents.map((event) => (
            <Card 
              key={event.id} 
              className={`hover:shadow-lg transition-all duration-300 ${
                event.isSpecial ? 'ring-2 ring-orange-200 bg-gradient-to-br from-orange-50 to-white' : ''
              }`}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    {event.isSpecial && (
                      <Trophy className="h-5 w-5 text-orange-600" />
                    )}
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                  </div>
                  <Badge className={getStatusColor(event.status)}>
                    {event.status}
                  </Badge>
                </div>
                <CardDescription className="text-base">
                  {event.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span>{event.date}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-700">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span>{event.venue}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Volleyball className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">{event.teams}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>참가자 현황</span>
                    </div>
                    <span className="font-medium">
                      {event.currentParticipants}/{event.maxParticipants}명
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        getParticipationRate(event.currentParticipants, event.maxParticipants) >= 90 
                          ? 'bg-red-500' 
                          : getParticipationRate(event.currentParticipants, event.maxParticipants) >= 70 
                          ? 'bg-orange-500' 
                          : 'bg-blue-500'
                      }`}
                      style={{ 
                        width: `${getParticipationRate(event.currentParticipants, event.maxParticipants)}%` 
                      }}
                    />
                  </div>
                  
                  <p className="text-xs text-gray-500 text-center">
                    {getParticipationRate(event.currentParticipants, event.maxParticipants)}% 참가
                  </p>
                </div>

                <Button 
                  onClick={() => handleApply(event.id, event.title)}
                  disabled={event.status === "마감" || appliedEvents.includes(event.id)}
                  className={`w-full ${
                    appliedEvents.includes(event.id) 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : event.status === "마감"
                      ? 'bg-gray-400'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {appliedEvents.includes(event.id) 
                    ? "✓ 신청 완료" 
                    : event.status === "마감" 
                    ? "마감됨" 
                    : "관람 신청하기"
                  }
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 p-8 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            더 많은 이벤트가 준비되고 있습니다!
          </h3>
          <p className="text-gray-600 mb-6">
            OK금융그룹 임직원을 위한 다양한 스포츠 이벤트를 준비하고 있습니다.
          </p>
          <Button 
            onClick={() => navigate('/signup')}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
          >
            회원가입하고 알림 받기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Events;
