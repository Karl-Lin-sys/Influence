import React, { useState } from 'react';
import WordMaker from './components/WordMaker';
import FairyFinder from './components/FairyFinder';
import Dashboard from './components/Dashboard';
import { Sparkles, Wand2 } from 'lucide-react';

function App() {
  const [step, setStep] = useState(1);
  const [originalMessage, setOriginalMessage] = useState('');
  const [magicWord, setMagicWord] = useState('');
  const [selectedFairies, setSelectedFairies] = useState([]);

  return (
    <div className="min-h-screen p-4 md:p-8 text-gray-800">
      <header className="max-w-4xl mx-auto mb-10 text-center animate-fade-in pt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-6 flex items-center justify-center gap-3">
          <Wand2 className="text-pink-500 w-10 h-10 animate-float" />
          ワールドシェイカー・キッズ
          <Sparkles className="text-purple-500 w-10 h-10 animate-float" style={{animationDelay: '1s'}} />
        </h1>
        <p className="text-md md:text-lg font-medium text-pink-700 bg-white/70 inline-block px-6 py-2 rounded-full shadow-sm border border-pink-200 backdrop-blur-md">
          〜 君のせいぎの魔法で、せかいをハッピーに変えよう！ 〜
        </p>
      </header>

      <main className="max-w-3xl mx-auto glass-panel p-6 md:p-10 mb-20 relative overflow-hidden">
        {step === 1 && <WordMaker nextStep={() => setStep(2)} setOriginalMessage={setOriginalMessage} setMagicWord={setMagicWord} magicWord={magicWord} />}
        {step === 2 && <FairyFinder nextStep={() => setStep(3)} setSelectedFairies={setSelectedFairies} />}
        {step === 3 && <Dashboard magicWord={magicWord} selectedFairies={selectedFairies} />}
      </main>
    </div>
  );
}

export default App;
