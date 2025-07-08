import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Users, Clock, Volleyball, ArrowLeft, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

const Events = () => {
  const navigate = useNavigate();
  const [appliedEvents, setAppliedEvents] = useState<number[]>([]);
  const [gameEvents, setGameEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [form, setForm] = useState({ name: '', empNo: '', dept: '', phone: '', email: localStorage.getItem('ok_user_email') || '', count: '1매' });

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

  useEffect(() => {
    if (showForm && selectedEvent) {
      setForm(f => ({ ...f, email: localStorage.getItem('ok_user_email') || '' }));
    }
  }, [showForm, selectedEvent]);

  // volleyballEvents 샘플 데이터 제거
  // const volleyballEvents = [
  //   {
  //     id: 1,
  //     title: "V리그 남자부 결승전",
  //     date: "2024년 7월 15일 (월)",
  //     time: "19:00 - 21:00",
  //     venue: "수원실내체육관",
  //     teams: "현대캐피탈 vs OK저축은행 읏맨 읽기나이스공격수",
  //     maxParticipants: 100,
  //     currentParticipants: 45,
  //     status: "모집중",
  //     description: "V리그 남자부 플레이오프 결승전! OK저축은행 읏맨을 응원하러 함께 가요!",
  //     isSpecial: true
  //   },
  //   {
  //     id: 2,
  //     title: "V리그 여자부 준결승",
  //     date: "2024년 7월 20일 (토)",
  //     time: "14:00 - 16:00",
  //     venue: "인천계양체육관",
  //     teams: "흥국생명 vs GS칼텍스",
  //     maxParticipants: 80,
  //     currentParticipants: 32,
  //     status: "모집중",
  //     description: "여자부 준결승! 치열한 경기를 함께 관람해요.",
  //     isSpecial: false
  //   },
  //   {
  //     id: 3,
  //     title: "V리그 남자부 3,4위전",
  //     date: "2024년 7월 25일 (목)",
  //     time: "19:00 - 21:00",
  //     venue: "장충체육관",
  //     teams: "삼성화재 vs 우리카드",
  //     maxParticipants: 60,
  //     currentParticipants: 58,
  //     status: "마감임박",
  //     description: "3,4위를 가리는 중요한 경기입니다.",
  //     isSpecial: false
  //   },
  //   {
  //     id: 4,
  //     title: "V리그 올스타전",
  //     date: "2024년 8월 5일 (월)",
  //     time: "19:30 - 21:30",
  //     venue: "잠실실내체육관",
  //     teams: "드림팀 vs 챌린지팀",
  //     maxParticipants: 120,
  //     currentParticipants: 120,
  //     status: "마감",
  //     description: "올스타들의 화려한 경기! 이미 마감되었습니다.",
  //     isSpecial: true
  //   }
  // ];

  const eventsToShow = gameEvents;

  const handleApply = (eventId: number, eventTitle: string) => {
    const event = eventsToShow.find(e => e.id === eventId);
    
    if (event?.상태 === "마감") {
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

  const handleApplyEvent = (event) => {
    setSelectedEvent(event);
    setShowForm(true);
  };
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      경기명: selectedEvent.경기명 || selectedEvent.title,
      경기일자: selectedEvent.일자 || selectedEvent.date,
      이름: form.name,
      사번: form.empNo,
      '소속/부서': form.dept,
      '휴대폰 번호': form.phone,
      신청자이메일: form.email,
      '티켓 수령': form.count
    };
    try {
      const res = await fetch('https://hook.us2.make.com/9ik83kitoe4ztl9gn3yj6s9mk2vsa0gj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      toast({
        title: result.status === 'fail' ? '신청 실패' : '신청 결과',
        description: result.message,
        variant: result.status === 'fail' ? 'destructive' : undefined,
      });
      if (result.status === 'success') {
        setShowForm(false);
        setForm({ name: '', empNo: '', dept: '', phone: '', email: localStorage.getItem('ok_user_email') || '', count: '1매' });
        setSelectedEvent(null);
      }
    } catch (e) {
      toast({ title: '신청 실패', description: '신청 전송에 실패했습니다.', variant: 'destructive' });
    }
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

  const userEmail = localStorage.getItem('ok_user_email');

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
            <div className="flex items-center gap-2 ml-auto">
              {userEmail && (
                <>
                  <span style={{
                    background: 'linear-gradient(90deg, #ff8800 0%, #ffb300 100%)',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: 17,
                    borderRadius: 18,
                    padding: '7px 22px',
                    marginRight: 10,
                    boxShadow: '0 2px 12px rgba(255,136,0,0.13)',
                    letterSpacing: '0.5px',
                    border: '2.5px solid #fff',
                    textShadow: '0 1px 4px #ff880055',
                    fontFamily: 'Pretendard, sans-serif',
                    transition: 'box-shadow 0.2s',
                  }}>{userEmail}</span>
                  <button
                    onClick={() => { localStorage.removeItem('ok_user_email'); window.location = '/'; }}
                    style={{
                      background: 'linear-gradient(90deg, #ff8800 0%, #ffb300 100%)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 18,
                      padding: '7px 22px',
                      fontWeight: 800,
                      fontSize: 16,
                      cursor: 'pointer',
                      boxShadow: '0 2px 12px rgba(255,136,0,0.13)',
                      letterSpacing: '0.5px',
                      fontFamily: 'Pretendard, sans-serif',
                      transition: 'filter 0.2s',
                    }}
                    onMouseOver={e => e.currentTarget.style.filter = 'brightness(1.15)'}
                    onMouseOut={e => e.currentTarget.style.filter = 'none'}
                  >
                    로그아웃
                  </button>
                </>
              )}
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
          {/* 안내 문구에서 웃맨 → 읏맨 */}
          <div className="text-center font-bold text-lg md:text-xl mb-4">
            "OK저축은행 읏맨과 함께하는 특별한 배구 이벤트!"
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            OK저축은행 읏맨 임직원을 위한 특별한 배구 경기 관람 기회입니다. 
            동료들과 함께 응원하며 소중한 추억을 만들어보세요!
          </p>
        </div>

        {/* Events Grid */}
        {/* 카드 스타일 개선 (트렌디, 세련, 반응형) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mt-8 w-full max-w-6xl mx-auto px-2">
          {eventsToShow.map((event, idx) => (
            <div
              key={event.id || idx}
              className="relative bg-white/90 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-orange-200 hover:border-orange-400 flex flex-col items-start p-7 pt-8 min-h-[260px] group hover:scale-[1.035]"
              style={{
                background: 'linear-gradient(135deg, #fffbe6 0%, #fff 60%, #ffe0b2 100%)',
                boxShadow: '0 6px 32px 0 rgba(255,136,0,0.07), 0 1.5px 8px 0 rgba(0,0,0,0.04)',
              }}
            >
              <div className="text-lg font-bold text-orange-600 mb-2 tracking-tight flex items-center gap-2">
                <span style={{ fontSize: 22, fontWeight: 900 }}>{event.경기명 || event.title}</span>
                {event.상태 === '마감' && <span className="ml-2 px-3 py-1 rounded-full bg-gray-200 text-gray-500 text-xs font-bold">마감</span>}
              </div>
              <div className="text-base text-gray-700 mb-1"><b>일자</b>: <span className="text-blue-700 font-semibold">{event.일자 || event.date}</span></div>
              <div className="text-base text-gray-700 mb-1"><b>장소</b>: <span className="text-orange-700 font-semibold">{event.장소 || event.venue}</span></div>
              <div className="text-base text-gray-700 mb-1"><b>최대인원</b>: {event.최대인원 || event.maxParticipants}</div>
              <div className="text-base text-gray-700 mb-1"><b>신청시작일</b>: {event.신청시작일}</div>
              <div className="text-base text-gray-700 mb-1"><b>신청마감일</b>: {event.신청마감일}</div>
              <div className="flex-1" />
              <button
                className={`mt-4 px-7 py-2 rounded-full font-bold text-lg shadow-md transition-all duration-200
                  ${event.상태 === '마감' ? 'bg-gray-300 text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-orange-400 to-yellow-300 text-white hover:from-orange-500 hover:to-yellow-400 hover:scale-105'}`}
                disabled={event.상태 === '마감'}
                onClick={() => handleApplyEvent(event)}
                style={{ letterSpacing: '0.5px', boxShadow: '0 2px 8px #ffb30033' }}
              >
                {event.상태 === '마감' ? '마감' : '신청'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>티켓 신청</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              <div className="bg-orange-50 rounded-xl p-4 flex flex-col items-center mb-2">
                <img src="/lovable-uploads/144.svg" alt="읏맨" className="w-16 h-16 mb-2" />
                <div className="font-bold text-lg mb-1">{selectedEvent.경기명 || selectedEvent.title}</div>
                <div className="text-sm text-gray-500">{selectedEvent.일자 || selectedEvent.date} {selectedEvent.time}</div>
              </div>
              <input name="name" value={form.name} onChange={handleFormChange} placeholder="이름" required className="border rounded-lg px-4 py-2" />
              <input name="empNo" value={form.empNo} onChange={handleFormChange} placeholder="사번" required className="border rounded-lg px-4 py-2" />
              <input name="dept" value={form.dept} onChange={handleFormChange} placeholder="소속/부서" required className="border rounded-lg px-4 py-2" />
              <input name="phone" value={form.phone} onChange={handleFormChange} placeholder="휴대폰 번호" required className="border rounded-lg px-4 py-2" />
              <input name="email" value={form.email} onChange={handleFormChange} placeholder="이메일" required className="border rounded-lg px-4 py-2 bg-gray-100" disabled />
              <select name="count" value={form.count} onChange={handleFormChange} className="border rounded-lg px-4 py-2">
                <option value="1매">1매</option>
                <option value="2매">2매</option>
                <option value="3매">3매</option>
              </select>
              <div className="flex gap-2 mt-2">
                <button type="submit" className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold text-lg shadow hover:brightness-105 hover:scale-[1.03] transition-all">신청하기</button>
                <DialogClose asChild>
                  <button type="button" className="flex-1 py-3 rounded-xl bg-gray-200 text-gray-700 font-bold text-lg shadow hover:bg-gray-300 transition-all">취소</button>
                </DialogClose>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Events;
