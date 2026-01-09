
import React, { useRef, useEffect, useState } from 'react';
import { Dice } from './Dice';

interface ScratchRowProps {
  id: number;
  diceValues: number[];
  onRevealed: () => void;
}

export const ScratchRow: React.FC<ScratchRowProps> = ({ id, diceValues, onRevealed }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawingRef = useRef(false);
  const hasInitializedRef = useRef(false);

  // Função para inicializar o canvas com as dimensões corretas
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    if (width === 0 || height === 0) {
      requestAnimationFrame(initCanvas);
      return;
    }

    canvas.width = width;
    canvas.height = height;

    // 1. Dégradé Or Royal Scintillant
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#fcd34d'); // Jaune Or
    gradient.addColorStop(0.3, '#fbbf24'); // Ambre
    gradient.addColorStop(0.5, '#fef3c7'); // Blanc-Or Éclatant
    gradient.addColorStop(0.7, '#d97706'); // Or Sombre
    gradient.addColorStop(1, '#fbbf24');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Texture "Paillettes / Or Martelé"
    for (let i = 0; i < 2000; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = Math.random() * 1.2;
      const opacity = Math.random() * 0.3;
      const hue = Math.random() * 20 + 40; 
      ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${opacity})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Motif de sécurité
    ctx.strokeStyle = 'rgba(180, 83, 9, 0.15)';
    ctx.lineWidth = 0.5;
    for (let i = -canvas.width; i < canvas.width; i += 12) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + canvas.height, canvas.height);
      ctx.stroke();
    }

    // 4. Texte Gravé "GRATTEZ ICI" - Fix weight to 900
    ctx.font = '900 24px Montserrat, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Shadow/Depth effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fillText('GRATTEZ ICI', canvas.width / 2 + 1, canvas.height / 2 + 1);
    ctx.fillStyle = 'rgba(120, 53, 15, 0.5)';
    ctx.fillText('GRATTEZ ICI', canvas.width / 2, canvas.height / 2);

    hasInitializedRef.current = true;
  };

  useEffect(() => {
    initCanvas();
    
    // Re-init if window is resized to fix canvas scaling
    const handleResize = () => {
      hasInitializedRef.current = false;
      initCanvas();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const checkReveal = () => {
    const canvas = canvasRef.current;
    if (!canvas || canvas.width === 0 || canvas.height === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparentPixels = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] < 128) transparentPixels++;
      }
      const percentage = (transparentPixels / (pixels.length / 4)) * 100;
      if (percentage > 50 && !isRevealed) {
        setIsRevealed(true);
        onRevealed();
      }
    } catch (e) {
      console.warn("Reveal check failed", e);
    }
  };

  const getPointerPos = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = (e as MouseEvent).clientX;
      clientY = (e as MouseEvent).clientY;
    } else {
      return { x: 0, y: 0 };
    }
    
    return { 
      x: (clientX - rect.left) * (canvas.width / rect.width), 
      y: (clientY - rect.top) * (canvas.height / rect.height) 
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (isRevealed) return;
    isDrawingRef.current = true;
    draw(e);
  };

  const stopDrawing = () => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      checkReveal();
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!isDrawingRef.current || isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getPointerPos(e);
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
    
    // Add some random offsets for a more "scratchy" organic feel
    for (let i = 0; i < 3; i++) {
        const ox = (Math.random() - 0.5) * 10;
        const oy = (Math.random() - 0.5) * 10;
        ctx.beginPath();
        ctx.arc(x + ox, y + oy, 15, 0, Math.PI * 2);
        ctx.fill();
    }
  };

  useEffect(() => {
    const handleGlobalUp = () => stopDrawing();
    window.addEventListener('mouseup', handleGlobalUp);
    window.addEventListener('touchend', handleGlobalUp, { passive: false });
    return () => {
      window.removeEventListener('mouseup', handleGlobalUp);
      window.removeEventListener('touchend', handleGlobalUp);
    };
  }, [isRevealed]);

  return (
    <div className="relative w-full h-24 md:h-32 bg-emerald-950 rounded-[1.2rem] flex items-center justify-around px-4 md:px-12 border-4 border-yellow-600/20 overflow-hidden shadow-2xl group transition-all duration-300 hover:shadow-emerald-500/20">
      <div className="flex gap-4 md:gap-16">
        {diceValues.map((val, idx) => (
          <Dice key={idx} value={val} className="transform scale-90 md:scale-110 transition-all hover:rotate-6 drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]" />
        ))}
      </div>
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onTouchStart={(e) => {
            // Prevent scrolling while scratching
            if (e.cancelable) e.preventDefault();
            startDrawing(e);
          }}
          onTouchMove={(e) => {
            if (e.cancelable) e.preventDefault();
            draw(e);
          }}
          className="absolute inset-0 w-full h-full touch-none scratch-canvas transition-opacity duration-300"
        />
      )}
      {isRevealed && (
        <div className="absolute inset-0 bg-yellow-400/10 pointer-events-none animate-pulse" />
      )}
    </div>
  );
};
