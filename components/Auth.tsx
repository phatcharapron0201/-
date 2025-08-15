
import React, { useState } from 'react';

interface AuthProps {
    onLogin: (username: string) => void;
    installPromptEvent: any;
    onInstall: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin, installPromptEvent, onInstall }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!username.trim() || !password.trim()) {
            setError('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
            return;
        }

        const users = JSON.parse(localStorage.getItem('game_users') || '{}');

        if (isLogin) {
            if (users[username] && users[username] === password) { // Simple password check
                onLogin(username);
            } else {
                setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
            }
        } else { // Registration
            if (users[username]) {
                setError('ชื่อผู้ใช้นี้มีอยู่แล้ว');
            } else {
                const newUsers = { ...users, [username]: password };
                localStorage.setItem('game_users', JSON.stringify(newUsers));
                onLogin(username); // Auto-login after registration
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
            <div className="bg-red-950/60 backdrop-blur-xl border-2 border-main rounded-lg shadow-2xl p-2 w-full max-w-md animate-fade-in">
                <div className="bg-red-800/50 rounded-md p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center text-yellow-300 mb-2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                        {isLogin ? 'เข้าสู่ระบบ' : 'ลงทะเบียน'}
                    </h1>
                    <p className="text-center text-yellow-100 mb-6">
                        {isLogin ? 'เข้าสู่ตำหนักอ๋องอีกครั้ง' : 'สร้างบัญชีเพื่อเริ่มตำนานของคุณ'}
                    </p>
                    <form onSubmit={handleSubmit}>
                        {error && <p className="bg-red-500/50 text-white p-3 rounded-md mb-4 text-center">{error}</p>}
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-lg font-semibold text-yellow-200 mb-2">ชื่อผู้ใช้</label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="กรอกชื่อผู้ใช้..."
                                className="w-full bg-red-900/80 border-2 border-yellow-500/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors text-white placeholder-gray-400"
                                required
                                autoComplete="username"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" aria-label="Password" className="block text-lg font-semibold text-yellow-200 mb-2">รหัสผ่าน</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="กรอกรหัสผ่าน..."
                                className="w-full bg-red-900/80 border-2 border-yellow-500/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors text-white placeholder-gray-400"
                                required
                                autoComplete={isLogin ? "current-password" : "new-password"}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!username.trim() || !password.trim()}
                            className="w-full mt-4 bg-gradient-to-r from-yellow-600 to-yellow-400 text-red-900 font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:from-gray-500 disabled:to-gray-400 disabled:cursor-not-allowed disabled:scale-100 shadow-lg"
                        >
                            {isLogin ? 'เข้าสู่ระบบ' : 'ลงทะเบียน'}
                        </button>
                    </form>
                    
                    {installPromptEvent && (
                        <button
                            onClick={onInstall}
                            className="w-full mt-4 bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                        >
                            ติดตั้งแอปพลิเคชัน
                        </button>
                    )}
                    
                    <button
                        onClick={() => { setIsLogin(!isLogin); setError(''); }}
                        className="w-full text-center mt-6 text-yellow-200 hover:text-white transition-colors"
                    >
                        {isLogin ? 'ยังไม่มีบัญชี? ลงทะเบียนที่นี่' : 'มีบัญชีอยู่แล้ว? เข้าสู่ระบบ'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;