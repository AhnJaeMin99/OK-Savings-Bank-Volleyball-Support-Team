import { useState, useEffect } from 'react';
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
  const [gameEvents, setGameEvents] = useState([]);

  useEffect(() => {
    fetch('https://hook.us2.make.com/fs9rpp37h56g2syfg0nthr96c1wpnax7')
      .then(res => res.text())
      .then(text => {
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          data = text;
        }
        if (typeof data === 'string') {
          try {
            data = JSON.parse(data);
          } catch {}
        }
        // 관리자모드와 동일하게 배열/객체 모두 처리
        const keys = ["경기명", "일자", "장소", "최대인원", "신청시작일", "신청마감일"];
        let allGames = [];
        if (Array.isArray(data)) {
          data.forEach(op => {
            if (op && Array.isArray(op.array)) {
              allGames.push(...op.array.map(arr => {
                const obj = {};
                keys.forEach((k, i) => { obj[k] = arr[i] || ""; });
                obj["상태"] = op.상태 || "";
                return obj;
              }));
            }
          });
        } else if (data && typeof data === 'object') {
          if (Array.isArray(data.array)) {
            allGames = data.array.map(arr => {
              const obj = {};
              keys.forEach((k, i) => { obj[k] = arr[i] || ""; });
              obj["상태"] = data.상태 || "";
              return obj;
            });
          } else {
            allGames = [];
          }
        }
        setGameEvents(allGames);
      })
      .catch(() => setGameEvents([]));
  }, []);

  const volleyballEvents = [
    {
      id: 1,
      title: "V리그 남자부 결승전",
      date: "2024년 7월 15일 (월)",
      time: "19:00 - 21:00",
      venue: "수원실내체육관",
      teams: "현대캐피탈 vs OK저축은행 읏맨 읽기나이스공격수",
      maxParticipants: 100,
      currentParticipants: 45,
      status: "모집중",
      description: "V리그 남자부 플레이오프 결승전! OK저축은행 읏맨을 응원하러 함께 가요!",
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

  const eventsToShow = gameEvents.length > 0 ? gameEvents : volleyballEvents;

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
      case "모집중": return "bg-blue-100 text-blue-800";
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
        <div className="max-w-[120rem] mx-auto px-2 md:px-6">
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
            <div className="flex space-x-3 items-center">
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
              <Button
                variant="ghost"
                onClick={() => navigate('/admin')}
                className="text-gray-500 hover:text-orange-600 font-semibold"
              >
                관리자 전용
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[120rem] mx-auto px-2 md:px-6 py-8">
        {/* 읏맨 마스코트 상단 배치 + 말풍선 */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative flex flex-col items-center">
            {/* 말풍선 */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-gray-800 text-base md:text-lg font-bold rounded-xl px-6 py-2 shadow-lg border border-gray-200 whitespace-nowrap z-10">
              "OK저축은행 읏맨과 함께하는 특별한 배구 이벤트!"
            </div>
            <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-full p-3 md:p-5 shadow-2xl border-4 border-yellow-300/70 flex items-center justify-center">
              <img
                src="/lovable-uploads/144.svg"
                alt="OK저축은행 읏맨"
                className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-xl"
                style={{ filter: 'drop-shadow(0 12px 48px rgba(0,0,0,0.18))' }}
              />
            </div>
          </div>
        </div>

        {/* Page Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            🏐 배구 경기 관람 이벤트
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            OK저축은행 읏맨 임직원을 위한 특별한 배구 경기 관람 기회입니다. 
            동료들과 함께 응원하며 소중한 추억을 만들어보세요!
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {eventsToShow.map((event, idx) => {
            // 신청 여부 확인 (경기명 기반)
            const eventKey = event.경기명 || event.title || idx;
            const isApplied = appliedEvents.includes(eventKey);
            const handleApplyEvent = async () => {
              const userEmail = localStorage.getItem('ok_user_email') || '';
              const payload = { ...event, email: userEmail };
              try {
                await fetch('https://hook.us2.make.com/9ik83kitoe4ztl9gn3yj6s9mk2vsa0gj', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload),
                });
                setAppliedEvents(prev => [...prev, eventKey]);
              } catch (e) {
                alert('신청 전송 실패');
              }
            };
            return (
              <Card
                key={event.id || idx}
                className={`relative hover:shadow-lg transition-all duration-300
                  ${event.status === '마감' ? 'border border-gray-300 bg-gray-50 text-gray-500' : 'border border-orange-300 bg-white text-gray-900'}
                  rounded-3xl
                `}
              >
                {event.경기명 ? (
                  <>
                    <CardHeader>
                      <CardTitle>{event.경기명}</CardTitle>
                      <CardDescription>{event.장소}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div style={{ fontSize: 18, marginBottom: 8 }}>일자: {event.일자}</div>
                      <div style={{ fontSize: 18, marginBottom: 8 }}>장소: {event.장소}</div>
                      <div style={{ fontSize: 18, marginBottom: 8 }}>최대인원: {event.최대인원}</div>
                      <div style={{ fontSize: 18, marginBottom: 8 }}>신청시작일: {event.신청시작일}</div>
                      <div style={{ fontSize: 18, marginBottom: 8 }}>신청마감일: {event.신청마감일}</div>
                      <div style={{ fontSize: 18, marginBottom: 8 }}>상태: {event.상태}</div>
                      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                        {!isApplied && (
                          <Button
                            onClick={handleApplyEvent}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded"
                          >
                            신청
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <>
                    <CardHeader>
                      <CardTitle>{event.title}</CardTitle>
                      <CardDescription>{event.venue}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div style={{ fontSize: 18, marginBottom: 8 }}>일자: {event.date}</div>
                      <div style={{ fontSize: 18, marginBottom: 8 }}>상태: {event.status}</div>
                    </CardContent>
                  </>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Events;
