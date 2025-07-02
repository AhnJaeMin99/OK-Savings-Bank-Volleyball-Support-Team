
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Volleyball, ArrowLeft, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 관리자 로그인 체크
    if (formData.email === 'okuser' && formData.password === 'okuser1234') {
      toast({
        title: "관리자 로그인 성공",
        description: "관리자 대시보드로 이동합니다.",
      });
      navigate('/admin');
      return;
    }

    // 일반 사용자 로그인 시뮬레이션
    setTimeout(() => {
      if (formData.email && formData.password) {
        toast({
          title: "로그인 성공",
          description: "배구 경기 일정 페이지로 이동합니다.",
        });
        navigate('/events');
      } else {
        toast({
          title: "로그인 실패",
          description: "이메일과 비밀번호를 확인해주세요.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            홈으로 돌아가기
          </Button>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-blue-600 rounded-lg p-2">
              <Volleyball className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">로그인</h1>
          </div>
          <p className="text-gray-600">OK금융그룹 임직원 계정으로 로그인하세요</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>계정 로그인</CardTitle>
            <CardDescription>
              등록된 이메일과 비밀번호를 입력해주세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="text"
                    placeholder="이메일 또는 관리자 ID"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="비밀번호"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Alert>
                <AlertDescription>
                  관리자 로그인: ID <code>okuser</code>, PW <code>okuser1234</code>
                </AlertDescription>
              </Alert>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "로그인 중..." : "로그인"}
              </Button>

              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => navigate('/signup')}
                  className="text-blue-600"
                >
                  계정이 없으신가요? 회원가입하기
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
