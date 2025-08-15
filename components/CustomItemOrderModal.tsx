
import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface CustomItemOrderModalProps {
  onOrder: (description: string) => void;
  onClose: () => void;
  isLoading: boolean;
}

const CustomItemOrderModal: React.FC<CustomItemOrderModalProps> = ({ onOrder, onClose, isLoading }) => {
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description.trim() || isLoading) return;
        onOrder(description);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-fade-in p-4">
            <div className="bg-red-950/90 backdrop-blur-lg border-2 border-yellow-500/80 rounded-xl shadow-2xl w-full max-w-xl relative text-white transform scale-100 animate-jump-in">
                 <button onClick={onClose} disabled={isLoading} className="absolute top-2 right-3 text-yellow-200 hover:text-white text-3xl z-10 disabled:opacity-50">&times;</button>
                 <div className="relative p-8">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-yellow-300 drop-shadow-md tracking-wider">
                            สั่งทำไอเทมพิเศษ
                        </h2>
                        <p className="text-lg text-yellow-100 mt-2">
                           อธิบายของที่คุณต้องการให้พ่อค้าหลี่สร้าง
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center p-8">
                            <LoadingSpinner />
                            <p className="mt-4 text-yellow-200">พ่อค้ากำลังใช้ความคิด...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                             <div className="my-6 p-4 bg-black/40 border-l-4 border-yellow-600/50 rounded-r-lg">
                                <p className="text-sm text-gray-300">
                                   โปรดอธิบายไอเทมที่ท่านต้องการให้ละเอียดที่สุด ยิ่งอธิบายดีเท่าไหร่ ของที่ได้ก็จะยิ่งมีคุณสมบัติตรงใจท่านมากขึ้นเท่านั้น (เช่น "ปิ่นปักผมรูปดอกเหมยทำจากหยกขาวบริสุทธิ์สำหรับมอบให้ฮ่องเต้") พ่อค้าจะประเมินราคาตามความยากและวัตถุดิบ
                                </p>
                            </div>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="อธิบายไอเทมของคุณที่นี่..."
                                className="w-full h-32 bg-red-900/80 border-2 border-yellow-500/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors text-white placeholder-gray-400"
                                required
                                minLength={10}
                            />
                            <button
                                type="submit"
                                disabled={!description.trim() || description.length < 10}
                                className="w-full mt-6 bg-gradient-to-b from-yellow-600 to-yellow-500 text-red-900 font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:from-gray-600 disabled:to-gray-500 disabled:text-white disabled:cursor-not-allowed disabled:scale-100 shadow-lg"
                            >
                                ให้พ่อค้าประเมินราคา
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomItemOrderModal;
