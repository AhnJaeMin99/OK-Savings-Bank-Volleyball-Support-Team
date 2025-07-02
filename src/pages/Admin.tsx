
import { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

const Admin = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-50">
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
              <div className="bg-blue-600 rounded-lg p-2">
                <Volleyball className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">관리자 대시보드</h1>
                <p className="text-sm text-gray-600">OK스포츠 이벤트 관리</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              관리자 모드
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">총 이벤트</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">활성 이벤트</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">총 신청자</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">290</div>
              <p className="text-xs text-muted-foreground">전체 신청 건수</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">참석 확인</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">255</div>
              <p className="text-xs text-muted-foreground">참석률 87.9%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">평균 참여율</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">72%</div>
              <p className="text-xs text-muted-foreground">전년 대비 +23%</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="events">이벤트 관리</TabsTrigger>
            <TabsTrigger value="upload">참석자 업로드</TabsTrigger>
            <TabsTrigger value="statistics">통계</TabsTrigger>
            <TabsTrigger value="settings">설정</TabsTrigger>
          </TabsList>

          {/* Events Management */}
          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>최근 이벤트</CardTitle>
                <CardDescription>현재 진행 중인 배구 경기 이벤트 목록</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEvents.map((event) => (
                    <div key={event.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(event.status)}
                        <div>
                          <h4 className="font-medium">{event.name}</h4>
                          <p className="text-sm text-gray-600">{event.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{event.participants}명 참가</p>
                          <Badge className={getStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          관리
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upload Section */}
          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>참석자 명단 업로드</span>
                </CardTitle>
                <CardDescription>
                  Excel 파일을 업로드하여 참석자 정보를 Google Sheets에 자동 동기화합니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertDescription>
                    Excel 파일 형식: 이름, 이메일, 참석여부, 이벤트명 컬럼이 포함되어야 합니다.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label htmlFor="file-upload">Excel 파일 선택</Label>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileUpload}
                    className="cursor-pointer"
                  />
                </div>

                {uploadedFile && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm">
                      선택된 파일: <strong>{uploadedFile.name}</strong>
                    </p>
                    <p className="text-xs text-gray-600">
                      크기: {(uploadedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                )}

                <div className="flex space-x-3">
                  <Button 
                    onClick={handleUploadSubmit}
                    disabled={!uploadedFile || isUploading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isUploading ? "업로드 중..." : "Google Sheets에 동기화"}
                  </Button>
                  
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    템플릿 다운로드
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics */}
          <TabsContent value="statistics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>이벤트별 참여 현황</CardTitle>
                  <CardDescription>신청자 vs 실제 참석자 비교</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={eventStats}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="applied" fill="#3b82f6" name="신청자" />
                      <Bar dataKey="participants" fill="#10b981" name="참석자" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>전체 참여 현황</CardTitle>
                  <CardDescription>신청/참석/불참 비율</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>시스템 설정</CardTitle>
                <CardDescription>플랫폼 관리 설정</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertDescription>
                    <strong>Make 워크플로우 연동:</strong> 이메일 인증 및 Google Sheets 동기화가 활성화되어 있습니다.
                  </AlertDescription>
                </Alert>
                
                <Alert>
                  <AlertDescription>
                    <strong>Google Sheets 연동:</strong> 실시간 데이터 동기화가 정상 작동 중입니다.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline">Make 워크플로우 확인</Button>
                  <Button variant="outline">Google Sheets 연결 상태</Button>
                  <Button variant="outline">이메일 템플릿 관리</Button>
                  <Button variant="outline">사용자 권한 관리</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
