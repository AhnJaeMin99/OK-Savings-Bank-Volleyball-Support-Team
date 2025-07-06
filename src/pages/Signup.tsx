import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Volleyball, ArrowLeft, Mail, Lock, User, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: 정보입력, 2: 이메일인증, 3: 완료
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    verificationCode: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [sentCode, setSentCode] = useState('');
  const [serverMessage, setServerMessage] = useState("");
  const [serverResult, setServerResult] = useState<string | null>(null);

  const handleEmailSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "비밀번호 불일치",
        description: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.email.includes('@naver.com')) {
      toast({
        title: "이메일 오류",
        description: "naver.com 이메일만 사용 가능합니다.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // 인증코드 생성 및 이메일 발송 시뮬레이션
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setSentCode(code);
    
    setTimeout(() => {
      toast({
        title: "인증 코드 발송",
        description: `인증 코드가 ${formData.email}로 발송되었습니다. (데모: ${code})`,
      });
      setStep(2);
      setIsLoading(false);
    }, 1500);
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 실제 서버 요청 예시 (데모용, 기존 코드와 병합 필요)
    try {
      const res = await fetch("https://your-api-url.com/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          code: formData.verificationCode,
        }),
      });
      const data = await res.json();
      setServerMessage(data.message);
      setServerResult(data.result);
      if (data.result === "success") {
        // 성공 처리 (예: setStep(3) 등)
      }
    } catch (err) {
      setServerMessage("서버 통신 오류가 발생했습니다.");
      setServerResult("fail");
    }
    setIsLoading(false);
  };

  const renderStep1 = () => (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">이름</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="name"
            type="text"
            placeholder="이름을 입력하세요"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">회사 이메일</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="name@ok... 또는 name@okfinancialgroup..."
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
            placeholder="비밀번호 (8자 이상)"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="pl-10"
            minLength={8}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">비밀번호 확인</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="confirmPassword"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            className="pl-10"
            required
          />
        </div>
      </div>

      <Alert>
        <AlertDescription>
          OK저축은행 읏맨 임직원만 가입 가능합니다. 회사 이메일로 인증이 진행됩니다.
        </AlertDescription>
      </Alert>

      <Button
        type="button"
        className="w-full bg-blue-600 hover:bg-blue-700"
        disabled={isLoading}
        onClick={async () => {
          await handleEmailSubmit();
        }}
      >
        {isLoading ? "인증 코드 발송 중..." : "인증 코드 받기"}
      </Button>
    </form>
  );

  const renderStep2 = () => (
    <form onSubmit={handleVerificationSubmit} className="space-y-4">
      <div className="text-center mb-4">
        <Mail className="h-12 w-12 text-blue-600 mx-auto mb-2" />
        <p className="text-sm text-gray-600">
          {formData.email}로 인증 코드를 발송했습니다.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="verificationCode">인증 코드</Label>
        <Input
          id="verificationCode"
          type="text"
          placeholder="6자리 인증 코드"
          value={formData.verificationCode}
          onChange={(e) => setFormData({...formData, verificationCode: e.target.value})}
          maxLength={6}
          className="text-center text-lg"
          required
        />
      </div>

      {/* 서버 메시지 텍스트 표시 */}
      {serverMessage && (
        <div
          style={{
            color: serverResult === "success" ? "#16a34a" : "#dc2626",
            fontWeight: 500,
            marginTop: 4,
            textAlign: "center",
          }}
        >
          {serverMessage}
        </div>
      )}

      <Alert>
        <AlertDescription>
          데모용 인증 코드: <strong>{sentCode}</strong>
        </AlertDescription>
      </Alert>

      <div className="flex space-x-3">
        <Button 
          type="button"
          variant="outline"
          onClick={() => setStep(1)}
          className="flex-1"
        >
          이전
        </Button>
        <Button 
          type="submit" 
          className="flex-1 bg-blue-600 hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "인증 중..." : "인증 완료"}
        </Button>
      </div>
    </form>
  );

  const renderStep3 = () => (
    <div className="text-center space-y-4">
      <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
      <h3 className="text-xl font-semibold text-gray-900">가입 완료!</h3>
      <p className="text-gray-600">
        {formData.name}님, OK스포츠 이벤트에 오신 것을 환영합니다!
      </p>
      <div className="flex space-x-3">
        <Button 
          onClick={() => navigate('/login')}
          className="flex-1 bg-blue-600 hover:bg-blue-700"
        >
          로그인하기
        </Button>
        <Button 
          variant="outline"
          onClick={() => navigate('/events')}
          className="flex-1"
        >
          이벤트 보기
        </Button>
      </div>
    </div>
  );

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
            <h1 className="text-2xl font-bold text-gray-900">회원가입</h1>
          </div>
          <p className="text-gray-600">OK저축은행 읏맨 임직원 전용 가입</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>
              {step === 1 && "계정 정보 입력"}
              {step === 2 && "이메일 인증"}
              {step === 3 && "가입 완료"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "기본 정보를 입력하고 이메일 인증을 진행합니다"}
              {step === 2 && "이메일로 발송된 인증 코드를 입력해주세요"}
              {step === 3 && "성공적으로 가입이 완료되었습니다"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </CardContent>
        </Card>

        {step < 3 && (
          <div className="text-center mt-4">
            <Button
              variant="link"
              onClick={() => navigate('/login')}
              className="text-blue-600"
            >
              이미 계정이 있으신가요? 로그인하기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
