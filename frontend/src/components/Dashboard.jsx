import React, { useState } from 'react';
import { Globe2, Rocket, RefreshCcw, Wand2 } from 'lucide-react';

export default function Dashboard({ magicWord, selectedFairies }) {
  const [castStatus, setCastStatus] = useState('idle'); // idle, casting, done
  const [progress, setProgress] = useState(0);
  const [resultMessage, setResultMessage] = useState('');

  const handleCast = async () => {
    setCastStatus('casting');
    try {
      const res = await fetch('http://localhost:8000/api/cast-magic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          fairy_ids: selectedFairies.map(f => f.id), 
          magic_word: magicWord 
        })
      });
      const data = await res.json();
      
      let cur = 0;
      const target = data.tipping_progress || Math.min(100, selectedFairies.length * 20);
      const interval = setInterval(() => {
        cur += 1;
        if(cur >= target) {
          clearInterval(interval);
          setProgress(target);
          setCastStatus('done');
          setResultMessage(data.message || 'まほうがひろがりました！');
        } else {
          setProgress(cur);
        }
      }, 30);

    } catch (e) {
      setProgress(50);
      setCastStatus('done');
      setResultMessage('まほうがひろがりました！（デモモード）');
    }
  };

  return (
    <div className="flex flex-col items-center text-center space-y-6">
      <div className="bg-yellow-100 p-5 rounded-full inline-block mb-2 shadow-inner">
        <Globe2 className="w-12 h-12 text-yellow-500" />
      </div>
      <h2 className="text-3xl font-extrabold text-gray-800">ステップ３：<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">魔法のいっせい送信！</span></h2>
      <p className="text-gray-600 font-medium text-lg max-w-xl">
        選んだ妖精さんたちに、魔法の言葉を世界中に広めてもらおう！クリティカルマス（25%）に達すると世界がひっくり返るよ！
      </p>

      <div className="w-full bg-white/70 rounded-3xl p-6 border-2 border-yellow-200 mt-6 shadow-sm">
        <div className="mb-4">
          <span className="text-sm font-bold text-gray-500 uppercase block mb-1">送信する魔法：</span>
          <p className="text-xl font-bold bg-white p-4 rounded-xl border border-gray-100 shadow-sm inline-block">{magicWord}</p>
        </div>
        <div className="mt-6">
          <span className="text-sm font-bold text-gray-500 uppercase block mb-2">協力する妖精さんたち：</span>
          <div className="flex justify-center gap-3 flex-wrap bg-white/50 p-4 rounded-2xl">
            {selectedFairies.map(f => (
              <div key={f.id} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border-2 border-purple-100 shadow-sm">
                <div className="w-6 h-6 rounded-full" style={{backgroundColor: f.avatar_color}} />
                <span className="font-bold text-gray-700">{f.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {castStatus === 'idle' && (
        <button onClick={handleCast} className="btn-magic px-10 py-5 rounded-full text-2xl shadow-xl flex items-center gap-4 mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 animate-pulse-glow">
          <Wand2 size={28} /> メガ魔法を発動する！ <Rocket size={28} />
        </button>
      )}

      {castStatus !== 'idle' && (
        <div className="w-full mt-10 p-6 bg-white rounded-3xl border-2 border-pink-100 shadow-lg">
          <div className="flex justify-between items-end mb-3 px-2">
            <span className="font-extrabold text-gray-700 text-lg">世界まるごとマジックゲージ</span>
            <span className="font-black text-3xl text-pink-500" style={{fontFamily: 'monospace'}}>{Math.floor(progress)}%</span>
          </div>
          <div className="w-full h-10 bg-gray-100 rounded-full overflow-hidden shadow-inner border-2 border-gray-200 relative mb-2">
            {/* クリティカルマスのライン (25%) */}
            <div className="absolute top-0 bottom-0 left-[25%] w-1 bg-red-400 z-10" />
            <div className="absolute left-[25%] -translate-x-1/2 -top-6 text-xs font-black text-red-500 z-10 bg-white px-2 py-0.5 rounded-full shadow-sm border border-red-200">25% (転換点)</div>
            
            <div 
              className={`h-full transition-all duration-300 ${progress >= 25 ? 'bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 animate-pulse-glow' : 'bg-gradient-to-r from-gray-400 to-gray-500'}`}
              style={{width: `${progress}%`}}
            />
          </div>
          
          {castStatus === 'casting' && <p className="mt-6 font-bold text-orange-500 animate-pulse text-lg">🚀 魔法を世界中に拡散中... ドキドキ...</p>}
          
          {castStatus === 'done' && (
            <div className="mt-8 p-8 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border-4 border-white shadow-xl animate-fade-in transform scale-100">
              <h3 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
                {progress >= 25 ? '🎉 大成功！世界がひっくり返った！' : 'もうすこし！魔法が足りないみたい...'}
              </h3>
              <p className="text-xl font-bold text-gray-700 bg-white inline-block px-6 py-2 rounded-full shadow-sm">
                「{resultMessage}」
              </p>
              
              <button 
                onClick={() => window.location.reload()} 
                className="mt-8 mx-auto flex items-center gap-2 bg-white text-purple-600 px-8 py-3 rounded-full font-bold shadow-md hover:bg-purple-50 transition-colors border border-purple-100 hover:scale-105"
              >
                <RefreshCcw size={20} /> 最初からやり直す
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
