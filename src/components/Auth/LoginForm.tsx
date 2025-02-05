import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loginUser, registerUser, resetPassword } from '@/services/authService';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isLogin && password.length < 6) {
      setError('パスワードは6文字以上である必要があります');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        await loginUser(email, password);
      } else {
        await registerUser(email, password);
      }
      // ログインまたは登録成功後、明示的にルートパスへナビゲート
      navigate('/', { replace: true });
    } catch (error: any) {
      let errorMessage = 'エラーが発生しました';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'このメールアドレスは既に使用されています';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = '無効なメールアドレスです';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'パスワードが弱すぎます';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'ユーザーが見つかりません';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'パスワードが間違っています';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError('メールアドレスを入力してください');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await resetPassword(email);
      setSuccess('パスワードリセットのメールを送信しました。メールをご確認ください。');
    } catch (error: any) {
      let errorMessage = 'エラーが発生しました';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'このメールアドレスのユーザーが見つかりません';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = '無効なメールアドレスです';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? 'ログイン' : '新規登録'}
      </h2>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-2 bg-green-100 text-green-600 rounded">
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="パスワード（6文字以上）"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? '処理中...' : isLogin ? 'ログイン' : '登録'}
        </Button>
      </form>
      <div className="mt-4 flex flex-col items-center gap-2">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-blue-500 hover:text-blue-600"
        >
          {isLogin ? '新規登録はこちら' : 'ログインはこちら'}
        </button>
        {isLogin && (
          <button
            onClick={handleResetPassword}
            type="button"
            className="text-sm text-gray-500 hover:text-gray-600"
            disabled={loading}
          >
            パスワードを忘れた方はこちら
          </button>
        )}
      </div>
    </div>
  );
}; 