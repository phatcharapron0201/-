import React from 'react';

interface UpdateLogModalProps {
  onClose: () => void;
}

const UpdateLogModal: React.FC<UpdateLogModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[100] animate-fade-in p-4">
      <div className="bg-red-950/90 backdrop-blur-lg border-2 border-yellow-400 rounded-xl shadow-2xl w-full max-w-lg relative text-white transform scale-100 animate-jump-in">
        <div className="relative p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-yellow-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] tracking-wider">
              มีอะไรใหม่ในเวอร์ชั่นนี้!
            </h2>
            <p className="text-lg text-yellow-100 mt-2">
              ยินดีต้อนรับกลับ! เราได้เพิ่มฟีเจอร์ใหม่ๆ มากมาย:
            </p>
          </div>

          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 text-left">
            <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/50">
                <h3 className="text-lg font-semibold text-purple-200 mb-2">👑 ระบบสืบทอดตำแหน่งทายาท</h3>
                <p className="text-white text-sm">เมื่อผู้ปกครองสิ้นพระชนม์ ทายาทที่โดดเด่นที่สุดจะขึ้นครองบัลลังก์ ส่งเสริมทายาทของคุณผ่านการศึกษาและยกย่องพวกเขาเพื่อชิงอำนาจ!</p>
            </div>
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/50">
                <h3 className="text-lg font-semibold text-blue-200 mb-2">👑 ฝ่ายอำนาจและระบบจัดการ</h3>
                <p className="text-white text-sm">เข้าร่วมฝ่ายอำนาจ, ทำกิจกรรมเพื่อเพิ่มอิทธิพล, และจัดการวังหลังของคุณอย่างเต็มรูปแบบ!</p>
            </div>
             <div className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-500/50">
                <h3 className="text-lg font-semibold text-indigo-200 mb-2">🎓 การศึกษาทายาทแบบโต้ตอบ</h3>
                <p className="text-white text-sm">อบรมทายาทของคุณเพื่อรับโบนัสสถานะทันทีและกำหนดทิศทางการเติบโตในระยะยาว</p>
            </div>
             <div className="bg-red-900/30 p-4 rounded-lg border border-red-500/50">
                <h3 className="text-lg font-semibold text-red-200 mb-2">💀 ระบบการตายและเกิดใหม่</h3>
                <p className="text-white text-sm">ชีวิตในวังมีความเสี่ยง! หากชะตาขาด คุณสามารถเลือกที่จะเริ่มต้นชีวิตใหม่ทั้งหมด หรือกลับชาติมาเกิดในร่างเดิมพร้อมกับบทลงโทษ</p>
            </div>
             <div className="bg-yellow-900/30 p-4 rounded-lg border border-yellow-500/50">
                <h3 className="text-lg font-semibold text-yellow-200 mb-2">💰 รายได้ขณะออฟไลน์</h3>
                <p className="text-white text-sm">ตำแหน่งของคุณจะสร้างรายได้ให้แม้ในขณะที่คุณไม่ได้เล่นเกม ยิ่งตำแหน่งสูง ยิ่งได้เงินมาก!</p>
            </div>
             <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/50">
                <h3 className="text-lg font-semibold text-green-200 mb-2">✨ และอื่นๆ อีกมากมาย!</h3>
                <p className="text-white text-sm">รวมถึงการแก้ไขบั๊ก, เพิ่มเควสใหม่, และปรับปรุงคุณภาพการเล่นโดยรวม</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-full mt-8 py-3 bg-gradient-to-b from-yellow-600 to-yellow-500 text-red-900 font-bold rounded-lg shadow-lg transform transition-transform hover:scale-105 border-2 border-yellow-400"
          >
            เริ่มเล่น
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateLogModal;