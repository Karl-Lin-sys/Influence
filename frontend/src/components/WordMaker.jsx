import React, { useState } from 'react';
import { Sparkles, Wand2, Send } from 'lucide-react';

export default function WordMaker({ nextStep, setOriginalMessage, setMagicWord, magicWord }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setOriginalMessage(input);
    try {
      const res = await fetch('http://localhost:8000/api/generate-magic-word', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setMagicWord(data.magic_word);
    } catch (e) {
      setMagicWord(`✨ みんな聞いて！${input} って、妖精さんが言ってたよ💫`);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center animate-fade-in text-center space-y-6">
      <div className="bg-pink-100 p-5 rounded-full inline-block mb-2 shadow-inner">
        <Wand2 className="w-12 h-12 text-pink-500" />
      </div>
      <h2 className="text-3xl font-extrabold text-gray-800">ステップ１：<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">魔法の言葉</span>を作ろう！</h2>
      <p className="text-gray-600 font-medium text-lg max-w-lg mb-4">
        AIのチカラを使って、みんなの心に一番届きやすい「まほうの言葉」に変身させるよ！
      </p>
      
      <textarea
        className="w-full p-6 text-lg md:text-xl rounded-2xl border-4 border-pink-100 focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all outline-none resize-none shadow-sm bg-white/60"
        rows="3"
        placeholder="世界に伝えたいことを書いてね！&#10;(例：やさしい心をもとう)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      
      {!magicWord ? (
        <button 
          onClick={handleGenerate}
          disabled={!input || loading}
          className="btn-magic px-8 py-4 rounded-full text-xl flex items-center gap-3 disabled:opacity-50 mt-4 shadow-lg border border-pink-300"
        >
          {loading ? 'ちちんぷいぷい！考え中...' : 'まほうの言葉にかえる！'} <Sparkles />
        </button>
      ) : (
        <div className="w-full mt-8 p-8 bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl border-2 border-purple-200 text-left animate-pulse-glow shadow-md">
          <h3 className="text-sm font-bold text-purple-500 mb-3 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4"/>できあがった魔法の言葉：
          </h3>
          <p className="text-2xl md:text-3xl font-extrabold text-gray-800 leading-relaxed drop-shadow-sm">「{magicWord}」</p>
          <div className="mt-8 text-center">
            <button onClick={nextStep} className="btn-magic px-10 py-4 rounded-full text-lg shadow-xl inline-flex items-center gap-3 hover:-translate-y-1 transition-transform">
              つぎへ進む <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
