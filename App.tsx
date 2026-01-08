
import React, { useState } from 'react';
import { Header } from './components/Header';
import { ScratchRow } from './components/ScratchRow';
import { ClaimForm } from './components/ClaimForm';
import { Dice } from './components/Dice';
import { Page2 } from './components/Page2';
import { Page3 } from './components/Page3';
import { PRIZES } from './constants';
import { GameState, AppPath } from './types';

const BackgroundDecor: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0">
    <span className="absolute top-[12%] left-[3%] text-8xl md:text-9xl text-yellow-400 opacity-60 rotate-12">€</span>
    <span className="absolute top-[35%] left-[10%] text-6xl md:text-7xl text-yellow-500 opacity-50 -rotate-12">€</span>
    <span className="absolute top-[55%] left-[2%] text-7xl md:text-8xl text-yellow-400 opacity-60 rotate-45">€</span>
    <span className="absolute top-[85%] left-[6%] text-9xl text-yellow-400 opacity-60 rotate-6">€</span>
    <span className="absolute top-[18%] right-[5%] text-9xl text-yellow-400 opacity-60 -rotate-6">€</span>
    <span className="absolute top-[42%] right-[15%] text-7xl md:text-8xl text-yellow-500 opacity-55 rotate-15">€</span>
    <span className="absolute top-[68%] right-[4%] text-8xl text-yellow-400 opacity-60 -rotate-12">€</span>
    <span className="absolute top-[92%] right-[12%] text-7xl text-yellow-500 opacity-50 rotate-12">€</span>
    <span className="absolute top-[25%] left-[20%] text-6xl text-yellow-300 opacity-60 rotate-45">★</span>
    <span className="absolute top-[48%] left-[15%] text-5xl text-yellow-400 opacity-55 -rotate-12">★</span>
    <span className="absolute top-[72%] left-[22%] text-7xl text-yellow-500 opacity-60 rotate-12">★</span>
    <span className="absolute top-[95%] left-[12%] text-4xl text-yellow-300 opacity-50 rotate-45">★</span>
    <span className="absolute top-[15%] right-[25%] text-5xl text-yellow-300 opacity-50 rotate-12">★</span>
    <span className="absolute top-[32%] right-[8%] text-7xl text-yellow-400 opacity-60 -rotate-45">★</span>
    <span className="absolute top-[58%] right-[22%] text-6xl text-yellow-500 opacity-55 rotate-12">★</span>
    <span className="absolute top-[82%] right-[10%] text-8xl text-yellow-400 opacity-60 rotate-6">★</span>
    <span className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-[25rem] text-yellow-400 opacity-[0.04]">★</span>
  </div>
);

const App: React.FC = () => {
  const [revealedRows, setRevealedRows] = useState<number[]>([]);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [currentPath, setCurrentPath] = useState<AppPath>('game');
  const [firstName] = useState('Marco');
  const [cartCount, setCartCount] = useState(0);

  const WINNING_ROW_INDEX = 2;

  const handleRowReveal = (id: number) => {
    if (!revealedRows.includes(id)) {
      setRevealedRows((prev) => [...prev, id]);
      if (id === WINNING_ROW_INDEX) {
        setTimeout(() => {
          setGameState('won');
          document.getElementById('win-announcement')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    }
  };

  const diceData = [[1, 4, 2], [5, 3, 4], [6, 6, 6]];

  if (currentPath === 'page2') {
    return (
      <div className="relative min-h-screen">
        <div className="sticky top-0 z-50"><Header /></div>
        <Page2 
          firstName={firstName}
          cartCount={cartCount} 
          onAddToCart={() => setCartCount(prev => prev + 1)} 
          onGoToCart={() => setCurrentPath('page3')} 
        />
      </div>
    );
  }

  if (currentPath === 'page3') {
    return (
      <div className="relative min-h-screen">
        <div className="sticky top-0 z-50"><Header /></div>
        <Page3 />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen casino-gradient text-white pb-20 overflow-x-hidden">
      <div className="relative z-50 bg-white shadow-md"><Header /></div>
      <BackgroundDecor />
      <header className="relative z-10 py-12 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-playfair font-black text-yellow-400 mb-2 drop-shadow-lg tracking-tighter">Jeu de Grattage</h1>
        <p className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-wider">
          Jouez pour gagner jusqu’à <span className="whitespace-nowrap">1 500 €</span>
        </p>
        
        <div className="mb-6 animate-pulse">
           <span className="bg-black/40 border-2 border-yellow-400 text-yellow-400 px-8 py-3 rounded-full text-2xl md:text-4xl font-black uppercase tracking-tighter shadow-[0_0_20px_rgba(250,204,21,0.4)]">
             3 chances de gagner !
           </span>
        </div>

        <div className="bg-emerald-900/50 backdrop-blur-md rounded-full py-2 px-8 inline-block mb-8 border border-white/20">
          <span className="text-lg font-semibold italic">Bienvenue {firstName}</span>
        </div>
        <div className="bg-yellow-400 text-emerald-950 text-xl md:text-2xl font-black py-4 px-10 rounded-xl shadow-[0_0_30px_rgba(250,204,21,0.5)] transform -rotate-1">
          GRATTEZ VOTRE CARTE ET DÉCOUVREZ VOTRE GAIN
        </div>
      </header>
      <main className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <aside className="lg:col-span-4 space-y-8 order-2 lg:order-1">
          <section className="gold-border bg-emerald-900/80 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 border-b border-yellow-400/30 pb-2">TABLE DES GAINS</h2>
            <div className="space-y-4">
              {PRIZES.map((prize, i) => (
                <div key={i} className="flex flex-col gap-2 p-4 rounded-xl hover:bg-white/5 transition-all group">
                  <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">{prize.label}</span>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      {prize.combination.map((val, idx) => (
                        <div key={idx} className="w-10 h-10 transform transition-transform group-hover:scale-105"><Dice value={val} className="!w-10 !h-10 rounded-lg shadow-md border border-gray-200" /></div>
                      ))}
                    </div>
                    <span className="text-2xl font-black text-yellow-400/60 select-none">=</span>
                    <span className="text-2xl md:text-3xl font-black text-yellow-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] whitespace-nowrap">{prize.amount.toLocaleString()} €</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="bg-black/20 p-6 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">INSTRUCTIONS</h2>
            <ul className="space-y-4 text-gray-200 mb-6">
              <li className="flex gap-3 items-start"><span className="bg-yellow-400 text-emerald-950 w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center font-bold">1</span><span>Grattez les 3 lignes pour révéler les dés</span></li>
              <li className="flex gap-3 items-start"><span className="bg-yellow-400 text-emerald-950 w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center font-bold">2</span><span>Comparez les résultats avec les combinaisons gagnantes</span></li>
              <li className="flex gap-3 items-start"><span className="bg-yellow-400 text-emerald-950 w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center font-bold">3</span><span>Si vous trouvez la combinaison gagnante, remplissez les informations ci-dessous pour réclamer votre gain*</span></li>
            </ul>
            <p className="text-[10px] md:text-xs text-gray-400 italic leading-relaxed pt-2 border-t border-white/5">* Jeu gratuit soumis à probabilités et à tirage au sort, sous contrôle par Commissaire de Justice.</p>
          </section>
        </aside>
        <div className="lg:col-span-8 space-y-8 order-1 lg:order-2">
          <div className="relative p-2 md:p-6 bg-amber-200 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] gold-border">
            
            <div className="absolute -top-6 -left-6 z-20 w-32 h-32 md:w-36 md:h-36 bg-red-600 rounded-full border-4 border-white shadow-2xl flex flex-col items-center justify-center transform -rotate-12 transition-transform hover:rotate-0 cursor-default select-none">
              <span className="text-white font-black text-lg md:text-xl leading-none text-center px-1">JEU GRATUIT !</span>
              <div className="w-full h-[1px] bg-white/30 my-1"></div>
              <span className="text-white text-[9px] md:text-[10px] font-bold text-center leading-tight">Sans obligation d'achat</span>
            </div>

            <div className="bg-white rounded-2xl p-4 md:p-8 space-y-4 md:space-y-8">
              <div className="flex justify-end items-center border-b-2 border-dashed border-gray-200 pb-4">
                <div className="text-emerald-900 font-black text-xl">#8392-LOTO</div>
              </div>
              <div className="space-y-4 md:space-y-6">
                {diceData.map((row, i) => (
                  <ScratchRow key={i} id={i} diceValues={row} onRevealed={() => handleRowReveal(i)} />
                ))}
              </div>
            </div>
          </div>
          {gameState === 'won' && (
            <div className="space-y-8">
              <div id="win-announcement" className="animate-bounce-in bg-yellow-400 p-8 rounded-2xl shadow-2xl text-center border-4 border-white text-emerald-950">
                <h2 className="text-4xl md:text-5xl font-playfair font-black mb-2">FÉLICITATIONS !</h2>
                <p className="text-2xl md:text-3xl font-bold">Vous avez gagné <span className="whitespace-nowrap">1 500 €</span> !</p>
              </div>
              <ClaimForm onSuccess={() => setCurrentPath('page2')} />
            </div>
          )}
        </div>
      </main>
      <style>{`
        @keyframes bounce-in { 0% { transform: scale(0.3); opacity: 0; } 50% { transform: scale(1.05); } 70% { transform: scale(0.9); } 100% { transform: scale(1); opacity: 1; } }
        .animate-bounce-in { animation: bounce-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>
    </div>
  );
};

export default App;
