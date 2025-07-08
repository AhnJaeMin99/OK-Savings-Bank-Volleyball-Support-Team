import React, { useState, useEffect } from 'react';
import Game from './admin/Game';
import Stat from './admin/Stat';
import Draw from './admin/Draw';
import System from './admin/System';
import Applicants from './admin/Applicants';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Users, 
  Calendar, 
  Upload, 
  Download, 
  BarChart3, 
  Volleyball,
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import AdminLayout from '../components/AdminLayout';

const adminMenus = [
  { name: '경기 설정', key: 'game' },
  { name: '신청 통계', key: 'stat' },
  { name: '추첨 관리', key: 'draw' },
  { name: '시스템 설정', key: 'system' },
  { name: '신청자 관리', key: 'applicants' },
];

export default function Admin() {
  const [selectedMenu, setSelectedMenu] = useState('game');
  const [showSidebar, setShowSidebar] = useState(true);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [notice, setNotice] = useState('');
  const email = 'okfngroup@naver.com';

  // 신청자 리스트 fetch 및 상태 관리
  const [applicationList, setApplicationList] = useState([]);
  useEffect(() => {
    fetch('https://hook.us2.make.com/dybevh4n1foq2ir5axguir7qhyod4r47')
      .then(res => res.text())
      .then(text => {
        let data;
        try { data = JSON.parse(text); } catch { data = text; }
        if (typeof data === 'string') { try { data = JSON.parse(data); } catch {} }
        let mapped = [];
        if (Array.isArray(data)) {
          mapped = data.map(arr => ({ email: arr[6] || '' }));
        } else if (data && typeof data === 'object' && Array.isArray(data.array)) {
          mapped = data.array.map(arr => ({ email: arr[6] || '' }));
        }
        setApplicationList(mapped.filter(a => a.email));
      })
      .catch(() => setApplicationList([]));
  }, []);

  // 샘플 통계 데이터
  const eventStats = [
    { name: 'V리그 남자부 결승전', participants: 45, applied: 67 },
    { name: 'V리그 여자부 준결승', participants: 32, applied: 45 },
    { name: 'V리그 남자부 3,4위전', participants: 58, applied: 58 },
    { name: 'V리그 올스타전', participants: 120, applied: 120 },
  ];

  const statusData = [
    { name: '신청 완료', value: 290, color: '#3b82f6' },
    { name: '참석 확인', value: 255, color: '#10b981' },
    { name: '불참', value: 35, color: '#ef4444' },
  ];

  const recentEvents = [
    { id: 1, name: 'V리그 남자부 결승전', date: '2024-07-15', status: '진행예정', participants: 45 },
    { id: 2, name: 'V리그 여자부 준결승', date: '2024-07-20', status: '모집중', participants: 32 },
    { id: 3, name: 'V리그 남자부 3,4위전', date: '2024-07-25', status: '마감임박', participants: 58 },
  ];

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu.key);
  };

  const handleLogout = () => {
    window.location.href = '/';
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleUploadSubmit = async () => {
    if (!uploadedFile) {
      toast({
        title: "파일 없음",
        description: "업로드할 파일을 선택해주세요.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // 업로드 시뮬레이션
    setTimeout(() => {
      toast({
        title: "업로드 완료",
        description: `${uploadedFile.name} 파일이 성공적으로 업로드되어 Google Sheets에 동기화되었습니다.`,
      });
      setIsUploading(false);
      setUploadedFile(null);
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '진행예정': return <Clock className="h-4 w-4 text-blue-600" />;
      case '모집중': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case '마감임박': return <AlertCircle className="h-4 w-4 text-orange-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '진행예정': return 'bg-blue-100 text-blue-800';
      case '모집중': return 'bg-green-100 text-green-800';
      case '마감임박': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // 햄버거 버튼 스타일
  const hamburgerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 24,
    left: 24,
    width: 44,
    height: 44,
    background: 'linear-gradient(135deg, #ff8800 0%, #ff6600 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 28,
    zIndex: 200,
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(255,102,0,0.10)'
  };

  // 사이드바 바깥 클릭 시 닫힘
  const handleMainClick = () => {
    if (showSidebar) setShowSidebar(false);
  };

  return (
    <AdminLayout
      selectedMenu={selectedMenu}
      onMenuSelect={setSelectedMenu}
      email={email}
      onLogout={handleLogout}
      showSidebar={showSidebar}
      setShowSidebar={setShowSidebar}
      onMainClick={showSidebar ? handleMainClick : undefined}
    >
      {selectedMenu === 'game' && <Game />}
      {selectedMenu === 'stat' && <Stat />}
      {selectedMenu === 'draw' && <Draw applicationList={applicationList} />}
      {selectedMenu === 'system' && <System notice={notice} setNotice={setNotice} />}
      {selectedMenu === 'applicants' && <Applicants />}
    </AdminLayout>
  );
}
