import React, { useState, useEffect } from 'react';
import { Users, Search, CheckCircle2, ChevronRight } from 'lucide-react';

export default function FairyFinder({ nextStep, setSelectedFairies }) {
  const [fairies, setFairies] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/find-fairies')
      .then(res => res.json())
      .then(data => {
        setFairies(data.fairies);
        setLoading(false);
      })
      .catch(e => {
        setFairies([{id: '1', name: 'モフモフ妖精', avatar_color: 'hsl(330, 80%, 75%)'}, {id: '2', name: 'キラキラ妖精', avatar_color: 'hsl(50, 80%, 75%)'}]);
        setLoading(false);
      });
  }, []);

  const toggleFairy = (f) => {
    if(selected.find(s => s.id === f.id)) {
      setSelected(selected.filter(s => s.id !== f.id));
    } else {
      setSelected([...selected, f]);
    }
  };

  const handleNext = () => {
    setSelectedFairies(selected);
    nextStep();
  };

  return (
    <div className="flex flex-col items-center text-center space-y-6">
      <div className="bg-purple-100 p-5 rounded-full inline-block mb-2 shadow-inner">
        <Users className="w-12 h-12 text-purple-500" />
      </div>
      <h2 className="text-3xl font-extrabold text-gray-800">ステップ２：<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400">おしゃべり妖精</span>を探そう！</h2>
      <p className="text-gray-600 font-medium text-lg max-w-xl">
        AIがネットワークのすきま（構造的空隙）にかくれている、一番おしゃべりで顔が広い「妖精さん」を連れてきたよ！魔法の種を渡したい妖精さんを選んでね。
      </p>

      {loading ? (
        <div className="py-16 flex flex-col items-center">
          <Search className="w-12 h-12 animate-spin text-purple-400 mb-4" />
          <p className="font-bold text-gray-500">妖精さんをさがしています...</p>
        </div>
      ) : (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8 p-4">
          {fairies.map((f, i) => {
            const isSel = selected.find(s => s.id === f.id);
            return (
              <div 
                key={f.id} 
                onClick={() => toggleFairy(f)}
                className={`cursor-pointer p-6 rounded-3xl border-4 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${isSel ? 'border-purple-500 bg-purple-50 shadow-md scale-105' : 'border-transparent bg-white shadow-sm hover:border-purple-200'}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div 
                  className={`w-20 h-20 mx-auto rounded-full mb-4 shadow-inner flex items-center justify-center text-white border-4 border-white ${isSel ? 'animate-pulse-glow' : ''}`}
                  style={{backgroundColor: f.avatar_color}}
                >
                  {isSel && <CheckCircle2 className="w-10 h-10 drop-shadow-md" />}
                </div>
                <div className="font-bold text-gray-800 text-lg mb-1">{f.name}</div>
                <div className="text-sm text-yellow-500 font-bold">伝達力: ★★★</div>
              </div>
            )
          })}
        </div>
      )}

      {selected.length > 0 && (
        <div className="mt-10 pt-4 border-t border-gray-100 w-full animate-fade-in">
          <button onClick={handleNext} className="btn-magic px-10 py-4 rounded-full text-xl shadow-xl flex items-center gap-3 mx-auto hover:-translate-y-1">
            {selected.length}匹の妖精にお願いする！ <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
