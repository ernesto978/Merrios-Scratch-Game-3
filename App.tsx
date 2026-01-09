
import React, { useState } from 'react';
import { Header } from './components/Header';
import { ScratchRow } from './components/ScratchRow';
import { ClaimForm } from './components/ClaimForm';
import { Dice } from './components/Dice';
import { Page2 } from './components/Page2';
import { Page3 } from './components/Page3';
import { PRIZES } from './constants';
import { GameState, AppPath } from './types';

const FloatingElement: React.FC<{ children: React.ReactNode; style: React.CSSProperties }> = ({ children, style }) => (
  <div 
    className="absolute pointer-events-none select-none animate-pulse"
    style={{ 
      transition: 'transform 15s ease-in-out',
      ...style 
    }}
  >
    {children}
  </div>
);

const BackgroundDecor: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    <div className="pattern-overlay" />
    <div className="sunburst-overlay" />
    
    {/* Diamants flottants */}
    <FloatingElement style={{ top: '40%', left: '15%', transform: 'rotate(20deg)' }}>
       <div className="text-6xl drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">💎</div>
    </FloatingElement>

    <FloatingElement style={{ top: '10%', right: '12%', transform: 'rotate(10deg) scale(1.1)' }}>
      <div className="text-5xl drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">💎</div>
    </FloatingElement>

    {/* Moedas de Euro - Círculos perfeitos e limpos sem elementos quadrados */}
    <FloatingElement style={{ top: '70%', left: '5%', transform: 'rotate(-5deg) scale(1.4)' }}>
      <div className="w-20 h-20 aspect-square rounded-full bg-yellow-500 border-4 border-yellow-300 flex items-center justify-center text-yellow-950 font-black text-4xl shadow-[0_10px_30px_rgba(0,0,0,0.4)] italic overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-700/50 to-transparent rounded-full" />
        <span className="relative z-10">€</span>
      </div>
    </FloatingElement>

    <FloatingElement style={{ bottom: '10%', right: '15%', transform: 'rotate(35deg) scale(1.5)' }}>
      <div className="w-24 h-24 aspect-square rounded-full bg-yellow-500 border-4 border-yellow-300 flex items-center justify-center text-yellow-950 font-black text-5xl shadow-[0_10px_30px_rgba(0,0,0,0.4)] italic overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-700/50 to-transparent rounded-full" />
        <span className="relative z-10">€</span>
      </div>
    </FloatingElement>

    {/* Étincelles dorées */}
    {[...Array(6)].map((_, i) => (
      <FloatingElement key={i} style={{ 
        top: `${Math.random() * 100}%`, 
        left: `${Math.random() * 100}%`,
        opacity: 0.4
      }}>
        <span className="text-4xl text-yellow-200 drop-shadow-[0_0_10px_rgba(253,224,71,0.8)]">✦</span>
      </FloatingElement>
    ))}
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
      <div className="relative min-h-screen bg-white">
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
      <div className="relative min-h-screen bg-white">
        <div className="sticky top-0 z-50"><Header /></div>
        <Page3 />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen scratch-bg text-white pb-20 overflow-x-hidden">
      <div className="relative z-50 bg-white shadow-md"><Header /></div>
      <BackgroundDecor />
      
      <header className="relative z-10 py-12 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-block mb-4">
          <div className="bg-emerald-400 text-emerald-950 font-black px-8 py-1.5 rounded-full text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(52,211,153,0.5)] border-2 border-white">
            Exclusivité Web
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-playfair font-black text-white mb-2 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] tracking-tighter italic">
          Jeu de Grattage
        </h1>
        
        <p className="text-2xl md:text-4xl font-black text-yellow-300 mb-8 uppercase tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          GAGNEZ JUSQU'À <span className="bg-red-600 text-white px-6 py-2 rounded-xl transform -rotate-1 inline-block shadow-2xl border-4 border-white/20">1 500 €</span>
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-10">
           <span className="bg-emerald-900/60 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-2xl text-xl font-bold uppercase shadow-2xl">
             3 Chances de Gagner !
           </span>
           <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 text-emerald-950 px-8 py-3 rounded-2xl text-xl font-black uppercase shadow-[0_10px_30px_rgba(251,191,36,0.4)] border-2 border-white">
             Ticket Gratuit
           </span>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl py-8 px-12 inline-block border-2 border-yellow-400/50 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transform hover:scale-105 transition-all duration-500">
          <p className="text-xl md:text-3xl font-black text-white uppercase tracking-widest drop-shadow-md">
            GRATTEZ ET DÉCOUVREZ VOTRE GAIN !
          </p>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 space-y-8">
        {/* PRIMEIRA PARTE: Instruções + Tabela vs. Jogo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Barra lateral: Instruções e Tabela de Ganhos */}
          <aside className="lg:col-span-4 flex flex-col gap-8">
            <section className="bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-2xl flex flex-col flex-1">
              <div className="flex-1">
                <h2 className="text-xl font-black text-white mb-6 uppercase tracking-widest text-emerald-400">Comment jouer ?</h2>
                <ul className="space-y-6 text-gray-100">
                  <li className="flex gap-5 items-start">
                    <span className="bg-yellow-400 text-emerald-900 w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center font-black shadow-[0_5px_15px_rgba(251,191,36,0.3)] text-xl">1</span>
                    <span className="font-bold text-sm leading-relaxed">Grattez les 3 zones de jeu avec votre souris ou votre doigt.</span>
                  </li>
                  <li className="flex gap-5 items-start">
                    <span className="bg-yellow-400 text-emerald-900 w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center font-black shadow-[0_5px_15px_rgba(251,191,36,0.3)] text-xl">2</span>
                    <span className="font-bold text-sm leading-relaxed">Si 3 dés sont identiques ou forment une suite, vous gagnez !</span>
                  </li>
                  <li className="flex gap-5 items-start">
                    <span className="bg-yellow-400 text-emerald-900 w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center font-black shadow-[0_5px_15px_rgba(251,191,36,0.3)] text-xl">3</span>
                    <span className="font-bold text-sm leading-relaxed">Si vous trouvez la combinaison gagnante, remplissez les informations ci-dessous pour réclamer votre gain*</span>
                  </li>
                </ul>
              </div>
              <p className="mt-8 text-[11px] text-emerald-200/40 font-medium italic leading-relaxed text-center">
                *Jeu gratuit soumis à probabilités et à tirage au sort, sous contrôle par Comissaire de Justice.
              </p>
            </section>

            <section className="royal-border bg-emerald-950/80 backdrop-blur-xl p-6 rounded-3xl overflow-hidden">
              <h2 className="text-2xl font-black text-yellow-300 mb-6 border-b-2 border-yellow-300/30 pb-3 uppercase italic tracking-tighter text-center">Table des Gains</h2>
              <div className="space-y-4">
                {PRIZES.map((prize, i) => (
                  <div key={i} className="flex flex-col gap-2 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group border border-white/10 shadow-inner overflow-hidden">
                    <span className="text-emerald-300 text-[10px] font-black uppercase tracking-[0.2em]">{prize.label}</span>
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex gap-1 items-center flex-shrink-0">
                        {prize.combination.map((val, idx) => (
                          <div key={idx} className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 transform transition-transform group-hover:rotate-6">
                            <Dice value={val} className="!w-full !h-full rounded-lg shadow-lg border border-white/10" />
                          </div>
                        ))}
                      </div>
                      <span className="text-lg font-black text-yellow-300/60 select-none">=</span>
                      <span className="text-xl md:text-2xl font-black text-yellow-300 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] whitespace-nowrap flex-shrink-0">
                        {prize.amount.toLocaleString()} €
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </aside>

          {/* Zone centrale : Jogo */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="relative w-full p-4 md:p-10 bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 rounded-[3rem] shadow-[0_30px_80px_rgba(0,0,0,0.7)] royal-border flex flex-col flex-1">
              <div className="absolute -top-12 -right-8 z-20 w-44 h-44 bg-gradient-to-br from-red-600 to-red-800 rounded-full border-8 border-white shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center transform rotate-12 transition-all hover:rotate-0 cursor-default select-none animate-bounce">
                <span className="text-white font-black text-2xl leading-none text-center px-2 drop-shadow-md">JEU GRATUIT !</span>
                <div className="w-20 h-[3px] bg-yellow-400 my-3 rounded-full"></div>
                <span className="text-white text-xs font-black text-center leading-tight uppercase px-4 opacity-90">Sans obligation d'achat !</span>
              </div>

              <div className="bg-[#f0f9f6] rounded-[2rem] p-6 md:p-12 space-y-6 md:space-y-8 shadow-inner border-4 border-emerald-900/5 flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-center border-b-4 border-dotted border-emerald-900/10 pb-4 md:pb-6 flex-shrink-0">
                  <div className="text-emerald-900 font-black text-xl italic tracking-tighter opacity-70 uppercase">SÉRIE : ROYALE-V3</div>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-500 text-2xl drop-shadow-sm">★</span>)}
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-center space-y-6 md:space-y-8">
                  {diceData.map((row, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-end px-4">
                         <span className="text-emerald-900 font-black text-xs uppercase italic tracking-widest">{i+1}er Jeu</span>
                         <div className="h-[2px] flex-1 mx-4 bg-emerald-900/10 mb-1 rounded-full"></div>
                         <span className="text-emerald-700/40 font-bold text-[10px] italic">00{i+1}</span>
                      </div>
                      <ScratchRow id={i} diceValues={row} onRevealed={() => handleRowReveal(i)} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEGUNDA PARTE: Seção de Vitória (Altura reduzida e largura total) */}
        {gameState === 'won' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-12 space-y-10 animate-in fade-in zoom-in duration-700">
              <div id="win-announcement" className="w-full bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 py-4 px-6 md:px-12 rounded-[2.5rem] shadow-[0_20px_60px_rgba(251,191,36,0.4)] text-center border-8 border-white text-emerald-950">
                <h2 className="text-4xl md:text-5xl font-playfair font-black mb-2 drop-shadow-lg italic tracking-tight uppercase">Gagnant !</h2>
                <p className="text-lg md:text-xl font-black uppercase tracking-[0.2em] mb-2">Vous remportez</p>
                <div className="inline-block bg-emerald-950 text-yellow-300 px-8 py-2 rounded-2xl text-3xl md:text-5xl font-black shadow-xl border-4 border-white/20">
                  1 500 €
                </div>
              </div>
              <div className="w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
                <ClaimForm onSuccess={() => setCurrentPath('page2')} />
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="relative z-10 max-w-4xl mx-auto px-4 mt-24 text-center text-emerald-200/30 text-xs">
        <p>© 2026 Délices Gourmandises - Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default App;
