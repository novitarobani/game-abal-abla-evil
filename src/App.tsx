import React, { useState, useEffect, useRef } from 'react';
import {
  Skull,
  Home,
  Shield,
  FlaskConical,
  HeartPulse,
  Video,
  User,
  Sparkles,
  Dices,
  Copy,
  Check,
  Download,
  Volume2,
  VolumeX,
  FileText,
  AlertTriangle,
  Flame,
  Binary,
  Compass,
  CornerDownRight,
  RefreshCw
} from 'lucide-react';
import {
  LOCATIONS,
  CAMERAS,
  PROTAGONISTS,
  THREATS,
  GameLocation,
  CameraStyle,
  Protagonist,
  HorrorThreat
} from './types';

export default function App() {
  // State for selections
  const [selectedLocation, setSelectedLocation] = useState<GameLocation>(LOCATIONS[0]);
  const [selectedCamera, setSelectedCamera] = useState<CameraStyle>(CAMERAS[0]);
  const [selectedProtagonist, setSelectedProtagonist] = useState<Protagonist>(PROTAGONISTS[0]);
  const [selectedThreat, setSelectedThreat] = useState<HorrorThreat>(THREATS[0]);
  const [customNotes, setCustomNotes] = useState<string>('');
  
  // App UI States
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isRandomizing, setIsRandomizing] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [displayedText, setDisplayedText] = useState<{
    cerita: string;
    suasana: string;
    mekanik: string;
    tujuan: string;
  }>({ cerita: '', suasana: '', mekanik: '', tujuan: '' });

  // Refs
  const ecgCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sound generator
  const triggerAudioTick = (pitch = 550, duration = 0.05, type: 'sine' | 'triangle' | 'sawtooth' | 'square' = 'triangle') => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.4, ctx.currentTime + duration);
      
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Ignored
    }
  };

  const playHeavyKeystroke = () => {
    triggerAudioTick(200, 0.08, 'triangle');
    setTimeout(() => {
      triggerAudioTick(120, 0.06, 'sine');
    }, 20);
  };

  const playSaveBeep = () => {
    triggerAudioTick(880, 0.1, 'sine');
    setTimeout(() => {
      triggerAudioTick(1100, 0.15, 'sine');
    }, 80);
  };

  const playRandomizeSound = () => {
    let count = 0;
    const interval = setInterval(() => {
      triggerAudioTick(400 + Math.random() * 300, 0.03, 'sawtooth');
      count++;
      if (count > 12) {
        clearInterval(interval);
        playSaveBeep();
      }
    }, 60);
  };

  // Generate target strings for the Typewriter effect
  const ceritaTarget = `${selectedProtagonist.name} sedang menyelidiki laporan aneh ketika ia tiba-tiba kehilangan kesadaran berkendara. Ia terbangun dalam kondisi terisolasi di ${selectedLocation.name} (${selectedLocation.nameEn}), tempat mengerikan berkabut yang diselimuti misteri kematian. Kini ia harus mencari rute evakuasi secepatnya selagi diburu oleh makhluk jahat yang mendiami tempat tersebut. ${customNotes ? `Catatan taktis tambahan: "${customNotes}"` : ''}`;
  
  const suasanaTarget = `Suasana dirancang dengan tingkat ketegangan '${selectedCamera.tensionLevel}'. Lingkungan ditata ${selectedLocation.atmosphere}. Sudut pandang yang digunakan adalah ${selectedCamera.name} di mana kamera akan bertindak sebagai ${selectedCamera.description} Vibe visual dikembangkan dalam estetika retro survival horror klasik berkarakter: ${selectedCamera.visualVibe}.`;
  
  const mekanikTarget = `1. Manajemen Amunisi Sangat Ketat: Peluru sangat terbatas. Menghadapi ${selectedThreat.name} membutuhkan taktik matang. Lebih baik menghindar daripada membuang amunisi.\n2. Sistem Safe Room & Save Point: Menyimpan game hanya dapat dilakukan di ruangan aman (Safe Room) dengan berbekal baterai/buku khusus di titik alat perekam kuno (mesin tik).\n3. Slot Penyimpanan (Inventory) Terbatas: Hanya membawa muatan slot terbatas (6 s.d. 8 slot). Pemain harus menyusun item secara cermat.\n4. Sistem Teka-Teki Integratif: Membuka segel butuh pemecahan teka-teki, antara lain:\n   - ${selectedLocation.puzzles[0]}\n   - ${selectedLocation.puzzles[1]}\n5. Karakteristik Musuh Utama: ${selectedThreat.behavior} ${selectedThreat.vulnerability ? `Kelemahan terbesar mereka adalah: ${selectedThreat.vulnerability}` : ''}`;
  
  const tujuanTarget = `Pemain dinyatakan berhasil memenangkan permainan bila berhasil merakit kombinasi kunci/puzzle gerbang evakuasi utama, bertahan hidup dari bentrokan monster ${selectedThreat.name} pada klimaks akhir, menyalakan sistem pemancar darurat, serta lolos berkendara keluar dari area ${selectedLocation.nameEn} sesaat sebelum hitung mundur penghancuran otomatis fasilitas berakhir.`;

  // Handle Typewriter effect
  useEffect(() => {
    setIsTyping(true);
    let indexCerita = 0;
    let indexSuasana = 0;
    let indexMekanik = 0;
    let indexTujuan = 0;

    setDisplayedText({ cerita: '', suasana: '', mekanik: '', tujuan: '' });

    // Speed parameter
    const interval = setInterval(() => {
      let updated = false;

      setDisplayedText(prev => {
        const next = { ...prev };
        
        if (indexCerita < ceritaTarget.length) {
          next.cerita = ceritaTarget.slice(0, indexCerita + 1);
          indexCerita += 3; // Type multiple characters to keep it responsive
          updated = true;
        } else if (indexSuasana < suasanaTarget.length) {
          next.suasana = suasanaTarget.slice(0, indexSuasana + 1);
          indexSuasana += 3;
          updated = true;
        } else if (indexMekanik < mekanikTarget.length) {
          next.mekanik = mekanikTarget.slice(0, indexMekanik + 1);
          indexMekanik += 3;
          updated = true;
        } else if (indexTujuan < tujuanTarget.length) {
          next.tujuan = tujuanTarget.slice(0, indexTujuan + 1);
          indexTujuan += 3;
          updated = true;
        }

        return next;
      });

      if (!updated) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [selectedLocation, selectedCamera, selectedProtagonist, selectedThreat, customNotes]);

  // Handle Heartbeat ECG Animation on HTML5 Canvas
  useEffect(() => {
    const canvas = ecgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let x = 0;
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear initial
    ctx.fillStyle = '#0a0a0c';
    ctx.fillRect(0, 0, width, height);

    // Heartbeat profile factors depending on selected threat level
    let pulseSpeed = 1.6; // Speed of horizontal sweep
    let beatsCount = 1; // Frequency of pulse rhythm
    let color = '#22c55e'; // Green for FINE
    let textStatus = 'FINE';

    if (selectedThreat.threatLevel === 'CAUTION') {
      pulseSpeed = 2.4;
      color = '#eab308'; // Yellow for CAUTION
      textStatus = 'CAUTION';
    } else if (selectedThreat.threatLevel === 'DANGER') {
      pulseSpeed = 3.5;
      color = '#ef4444'; // Red for DANGER
      textStatus = 'DANGER';
    }

    // Points array to save standard ECG signature shape
    // [time, value]
    const ecgSignature = [
      [0.0, 0],
      [0.2, 0],
      [0.25, 0.1],   // P wave
      [0.3, 0],
      [0.35, -0.3],  // Q wave
      [0.4, 1.0],    // R wave peak
      [0.45, -0.6],  // S wave dip
      [0.52, 0],
      [0.6, 0.25],   // T wave
      [0.7, 0],
      [1.0, 0]
    ];

    const points: { x: number; y: number; opacity: number }[] = [];

    const draw = () => {
      // Clear with slight alpha to create trail glow effect
      ctx.fillStyle = 'rgba(10, 10, 12, 0.08)';
      ctx.fillRect(0, 0, width, height);

      // Advance scan line
      x = (x + pulseSpeed) % width;

      // Calculate ECG voltage at current horizontal scan point x
      // Map x to a repeating 0-1 cycle
      const cycleProgress = (x / (width / beatsCount)) % 1.0;
      
      // Interpolate signature
      let relativeVoltage = 0;
      for (let i = 0; i < ecgSignature.length - 1; i++) {
        const pt1 = ecgSignature[i];
        const pt2 = ecgSignature[i + 1];
        if (cycleProgress >= pt1[0] && cycleProgress <= pt2[0]) {
          const t = (cycleProgress - pt1[0]) / (pt2[0] - pt1[0]);
          relativeVoltage = pt1[1] + t * (pt2[1] - pt1[1]);
          break;
        }
      }

      const centerY = height / 2;
      const amplitude = height * 0.35;
      const currentY = centerY - relativeVoltage * amplitude;

      // Add to point trace
      points.push({ x, y: currentY, opacity: 1.0 });

      // Keep trace short
      if (points.length > 150) {
        points.shift();
      }

      // Draw active tracer trace
      ctx.beginPath();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = color;

      for (let i = 1; i < points.length; i++) {
        // Prevent drawing lines from wrapper end to start
        if (Math.abs(points[i].x - points[i - 1].x) < 20) {
          ctx.beginPath();
          ctx.moveTo(points[i - 1].x, points[i - 1].y);
          ctx.lineTo(points[i].x, points[i].y);
          ctx.stroke();
        }
      }

      // Draw lead marker dot at current position
      ctx.beginPath();
      ctx.arc(x, currentY, 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#ffffff';
      ctx.fill();

      // Reset shadow for text and other elements
      ctx.shadowBlur = 0;

      // Draw status label overlay
      ctx.fillStyle = color;
      ctx.font = 'bold 11px "JetBrains Mono", monospace';
      ctx.fillText(`STATUS: ${textStatus}`, 12, 18);
      ctx.fillText(`${selectedThreat.threatLevel === 'DANGER' ? 'ALERT: TARGET LOCKED' : 'BIOMETRIC STABLE'}`, 12, 34);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [selectedThreat]);

  // Randomize all slots (The Gacha red button)
  const handleRandomize = () => {
    setIsRandomizing(true);
    playRandomizeSound();

    let iterations = 0;
    const interval = setInterval(() => {
      // Pick randoms repeatedly for aesthetic cycling
      const rLoc = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
      const rCam = CAMERAS[Math.floor(Math.random() * CAMERAS.length)];
      const rProt = PROTAGONISTS[Math.floor(Math.random() * PROTAGONISTS.length)];
      const rThr = THREATS[Math.floor(Math.random() * THREATS.length)];

      setSelectedLocation(rLoc);
      setSelectedCamera(rCam);
      setSelectedProtagonist(rProt);
      setSelectedThreat(rThr);

      iterations++;
      if (iterations > 10) {
        clearInterval(interval);
        setIsRandomizing(false);
      }
    }, 80);
  };

  // Copy concept plain text to clipboard
  const handleCopyText = () => {
    const textToCopy = `===== KONSEP GAME SURVIVAL HORROR (GENRE: RESIDENT RE-STYLE) =====

1. CERITA SINGKAT
${ceritaTarget}

2. SUASANA & KAMERA
${suasanaTarget}

3. MEKANIK GAMEPLAY UTAMA
${mekanikTarget}

4. TUJUAN AKHIR
${tujuanTarget}

===============================================================
Direncanakan via: Horror Game Concept Planner`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    playSaveBeep();
    setTimeout(() => setCopied(false), 2000);
  };

  // Download raw txt file
  const handleDownloadTxt = () => {
    const textToDownload = `===== KONSEP GAME SURVIVAL HORROR (GENRE: RESIDENT RE-STYLE) =====

1. CERITA SINGKAT
${ceritaTarget}

2. SUASANA & KAMERA
${suasanaTarget}

3. MEKANIK GAMEPLAY UTAMA
${mekanikTarget}

4. TUJUAN AKHIR
${tujuanTarget}

===============================================================
Direncanakan via: Horror Game Concept Planner`;

    const blob = new Blob([textToDownload], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `S_H_Concept_${selectedLocation.id}_${selectedProtagonist.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    playHeavyKeystroke();
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#d1d1d1] antialiased font-sans border-4 md:border-8 border-[#1a1a1a] flex flex-col relative crt-effect">
      
      {/* RETRO CORNER OVERLAYS */}
      <div className="hidden md:flex absolute top-4 left-6 items-center gap-2 text-[10px] font-mono text-[#666] tracking-wider">
        <span className="w-1.5 h-1.5 rounded-none bg-[#ff3333] animate-pulse"></span>
        CLASSIFIED DOSSIER // PROJECT SURVIVAL HORROR V.1996
      </div>
      <div className="hidden md:block absolute top-4 right-6 text-[10px] font-mono text-[#666] tracking-wider">
        CLASSIFIED: TOP SECRET // CORE_OS v4.1.2
      </div>

      <header className="h-auto md:h-20 border-b border-[#333] flex flex-col md:flex-row items-center justify-between px-6 md:px-10 bg-[#0a0a0a] py-4 md:py-0 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#ff3333] rounded-sm flex items-center justify-center font-black text-black text-xl select-none">
            ☣
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 bg-[#ff3333]/20 border border-[#ff3333]/50 text-[#ff3333] font-mono text-[9px] uppercase tracking-widest rounded-none">
                SURVIVAL HORROR PLANNER
              </span>
              <span className="text-[#666] text-xs font-mono">PROJECT: BIO-DECAY</span>
            </div>
            <h1 className="text-xl font-bold tracking-tighter text-white uppercase mt-0.5">
              BIO-DECAY: CONCEPT PLANNER
            </h1>
          </div>
        </div>

        {/* Sound, Gacha, and Copy Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Audio Toggle */}
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              triggerAudioTick(600, 0.1);
            }}
            className="p-2 px-3 rounded-none bg-[#0d0d0d] border border-[#333] hover:border-[#ff3333] hover:bg-[#151515] transition-colors flex items-center gap-2 text-xs font-mono text-[#888] hover:text-white"
            title="Aktifkan/Bisukan suara mesin tik"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#ff3333]" />
                <span>MUTE</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                <span>AUDIO ON</span>
              </>
            )}
          </button>

          {/* Randomizer (Panic Button) */}
          <button
            onClick={handleRandomize}
            disabled={isRandomizing}
            className="px-4 py-2 rounded-none bg-[#ff3333] hover:bg-[#ff5555] text-black text-xs font-mono font-black transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Dices className={`w-3.5 h-3.5 text-black ${isRandomizing ? 'animate-spin' : ''}`} />
            <span>GACHA RANDOM!</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 w-full flex-1">
        
        {/* =========================================================================
            LEFT COLUMN: INTERACTIVE INPUT CONTROLLERS (lg:col-span-5)
            ========================================================================= */}
        <section className="lg:col-span-5 space-y-6">
          
          <div className="bg-[#0a0a0a] border border-[#333] p-5 space-y-5 rounded-none">
            <h2 className="text-sm font-mono text-white uppercase tracking-widest border-b border-[#333] pb-3 flex items-center justify-between">
              <span>🎚️ PARAMETER CONFIG</span>
              <span className="text-[10px] text-[#ff3333] font-bold">READY</span>
            </h2>

            {/* LOCATION SELECTOR */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#a1a1a1] uppercase tracking-wider flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-[#ff3333]" />
                1. Lokasi & Setting Utama:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {LOCATIONS.map((loc) => {
                  const isSelected = selectedLocation.id === loc.id;
                  return (
                    <button
                      key={loc.id}
                      onClick={() => {
                        setSelectedLocation(loc);
                        playHeavyKeystroke();
                      }}
                      className={`text-left p-3 rounded-none border text-xs transition-all duration-150 ${
                        isSelected
                          ? 'bg-[#151515] border-[#ff3333] border-l-4 text-white font-bold'
                          : 'bg-[#0d0d0d] border-[#222] text-[#888] hover:border-[#333] hover:bg-[#111] hover:text-white'
                      }`}
                    >
                      <div className="truncate">{loc.name.split(' (')[0]}</div>
                      <div className="text-[10px] opacity-60 truncate mt-0.5">{loc.nameEn}</div>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-[#888] italic mt-1 font-mono leading-relaxed bg-[#050505] p-2.5 border border-[#222] rounded-none">
                {selectedLocation.description}
              </p>
            </div>

            {/* CAMERA SELECTOR */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#a1a1a1] uppercase tracking-wider flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-[#ff3333]" />
                2. Sudut Kamera & Suasana:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {CAMERAS.map((cam) => {
                  const isSelected = selectedCamera.id === cam.id;
                  return (
                    <button
                      key={cam.id}
                      onClick={() => {
                        setSelectedCamera(cam);
                        playHeavyKeystroke();
                      }}
                      className={`text-center py-2.5 px-1.5 rounded-none border text-[10px] font-mono transition-all duration-150 ${
                        isSelected
                          ? 'bg-[#151515] border-[#ff3333] border-b-2 text-white font-bold'
                          : 'bg-[#0d0d0d] border-[#222] text-[#888] hover:border-[#333] hover:bg-[#111] hover:text-white'
                      }`}
                    >
                      <div className="truncate">{cam.name.split(' (')[0]}</div>
                      <span className={`text-[8px] font-bold px-1 py-0.5 rounded-none mt-1.5 inline-block ${
                        cam.tensionLevel === 'EXTREME' ? 'bg-[#ff3333]/15 text-[#ff3333] border border-[#ff3333]/30' :
                        cam.tensionLevel === 'CRITICAL' ? 'bg-[#eab308]/15 text-[#eab308] border border-[#eab308]/30' :
                        'bg-zinc-900 text-zinc-400 border border-zinc-800'
                      }`}>
                        {cam.tensionLevel}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-[#888] italic font-mono leading-relaxed bg-[#050505] p-2.5 border border-[#222] rounded-none">
                {selectedCamera.description}
              </p>
            </div>

            {/* PROTAGONIST SELECTOR */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#a1a1a1] uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#ff3333]" />
                3. Karakter Utama & Kemampuan:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PROTAGONISTS.map((prot) => {
                  const isSelected = selectedProtagonist.id === prot.id;
                  return (
                    <button
                      key={prot.id}
                      onClick={() => {
                        setSelectedProtagonist(prot);
                        playHeavyKeystroke();
                      }}
                      className={`text-left p-3 rounded-none border text-xs transition-all duration-150 ${
                        isSelected
                          ? 'bg-[#151515] border-[#ff3333] border-l-4 text-white font-bold'
                          : 'bg-[#0d0d0d] border-[#222] text-[#888] hover:border-[#333] hover:bg-[#111] hover:text-white'
                      }`}
                    >
                      <div className="truncate">{prot.name.split(' (')[0]}</div>
                      <div className="text-[10px] opacity-60 truncate mt-0.5">{prot.nameEn}</div>
                    </button>
                  );
                })}
              </div>
              <div className="bg-[#050505] p-2.5 border border-[#222] rounded-none space-y-1 text-[11px] font-mono text-[#888]">
                <div><span className="text-white">Backstory:</span> {selectedProtagonist.background}</div>
                <div><span className="text-[#ff3333]">Spesial:</span> {selectedProtagonist.specialAbility}</div>
                <div className="flex flex-wrap gap-1 mt-1.5 pt-1.5 border-t border-[#222]">
                  <span className="text-[#666] text-[10px]">Perlengkapan Awal:</span>
                  {selectedProtagonist.startingGear.map((item, idx) => (
                    <span key={idx} className="bg-[#111] text-[9px] text-[#d1d1d1] border border-[#333] px-1 py-0.5 rounded-none">
                      🛠️ {item.split(' (')[0]}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ADVERSARY / THREAT SELECTOR */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#a1a1a1] uppercase tracking-wider flex items-center gap-1.5">
                <Skull className="w-3.5 h-3.5 text-[#ff3333]" />
                4. Ancaman Utama (Musuh):
              </label>
              <div className="grid grid-cols-2 gap-2">
                {THREATS.map((th) => {
                  const isSelected = selectedThreat.id === th.id;
                  return (
                    <button
                      key={th.id}
                      onClick={() => {
                        setSelectedThreat(th);
                        playHeavyKeystroke();
                      }}
                      className={`text-left p-3 rounded-none border text-xs transition-all duration-150 ${
                        isSelected
                          ? 'bg-[#151515] border-[#ff3333] border-l-4 text-white font-bold'
                          : 'bg-[#0d0d0d] border-[#222] text-[#888] hover:border-[#333] hover:bg-[#111] hover:text-white'
                      }`}
                    >
                      <div className="truncate">{th.name.split(' (')[0]}</div>
                      <div className="text-[10px] opacity-60 truncate mt-0.5">{th.nameEn}</div>
                    </button>
                  );
                })}
              </div>
              <div className="bg-[#050505] p-2.5 border border-[#222] rounded-none space-y-1 text-[11px] font-mono text-[#888]">
                <div><span className="text-white">Perilaku:</span> {selectedThreat.behavior}</div>
                <div><span className="text-[#ff3333]">Sound Cue:</span> {selectedThreat.soundCue}</div>
                <div><span className="text-amber-500">Kelemahan:</span> <span className="text-[#d1d1d1]">{selectedThreat.vulnerability ? selectedThreat.vulnerability : 'Belum diketahui'}</span></div>
              </div>
            </div>

            {/* MANUAL BONUS NOTES */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-mono text-[#a1a1a1] uppercase tracking-wider flex items-center justify-between">
                <span>📝 CATATAN MANUAL OPSIONAL:</span>
                <span className="text-[9px] text-[#666]">Terintegrasi</span>
              </label>
              <textarea
                value={customNotes}
                onChange={(e) => {
                  setCustomNotes(e.target.value);
                  if (Math.random() > 0.6) triggerAudioTick(350, 0.02, 'sine');
                }}
                maxLength={120}
                placeholder="Misal: Karakter utama terluka di kaki sebelah kiri sejak awal..."
                className="w-full h-16 rounded-none border border-[#222] bg-[#050505] px-3 py-2 text-xs font-mono text-[#d1d1d1] placeholder-neutral-700 outline-none focus:border-[#ff3333]/50 transition-colors resize-none"
              />
              <div className="text-right text-[9px] font-mono text-[#666]">
                {customNotes.length}/120 karakter
              </div>
            </div>

          </div>

          {/* REALTIME HARDIAC ECG HEALTH MONITOR */}
          <div className="bg-[#0a0a0a] border border-[#333] rounded-none p-4 relative overflow-hidden">
            <h3 className="text-[10px] font-mono text-[#a1a1a1] uppercase tracking-widest mb-2 flex items-center justify-between">
              <span>ECG PATIENT BIOMETRICS</span>
              <span className="text-[#ff3333] font-bold">● LIVE PULSE</span>
            </h3>

            <div className="flex flex-col md:flex-row gap-4 items-stretch">
              {/* The dynamic Canvas rendering */}
              <div className="relative bg-[#050507] rounded-none border border-black flex-1 overflow-hidden">
                <canvas
                  ref={ecgCanvasRef}
                  width={340}
                  height={75}
                  className="w-full block bg-[#050507]"
                />
              </div>

              {/* Stats and guide explanation */}
              <div className="w-full md:w-36 flex flex-col justify-center text-[10px] font-mono space-y-1 text-[#888] border-t md:border-t-0 md:border-l border-[#333] p-2 md:pl-3">
                <div className="text-[#666] uppercase">Threat Level:</div>
                <div className={`text-xs font-bold uppercase ${
                  selectedThreat.threatLevel === 'DANGER' ? 'text-[#ff3333] animate-pulse' :
                  selectedThreat.threatLevel === 'CAUTION' ? 'text-amber-500' :
                  'text-emerald-500'
                }`}>
                  {selectedThreat.threatLevel === 'DANGER' ? '⚠️ EXTREME' :
                   selectedThreat.threatLevel === 'CAUTION' ? '⚡ ELEVATED' :
                   '✔️ STANDARD'}
                </div>
                <div className="text-[9px] text-[#666] leading-tight pt-1">
                  Darah & hormon ketakutan termonitor di sensor lobi.
                </div>
              </div>
            </div>
          </div>

        </section>


        {/* =========================================================================
            RIGHT COLUMN: DOSSIER CRT CONCEPT SHEET (lg:col-span-7)
            ========================================================================= */}
        <section className="lg:col-span-7 space-y-6">
          
          <div className="bg-[#050505] border border-[#333] shadow-2xl relative overflow-hidden flex flex-col min-h-[640px] rounded-none">
            
            {/* Top-secret ribbon indicator */}
            <div className="absolute top-0 right-0 py-1.5 px-4 bg-[#ff3333] text-black text-[10px] font-mono font-bold uppercase z-50 flex items-center gap-1.5 rounded-none">
              <span>PROJECT: BIO-DECAY</span>
              <FileText className="w-3 h-3 text-black" />
            </div>

            {/* Warning light pulse bar top */}
            <div className={`absolute top-0 left-0 w-full h-1 z-50 ${
              selectedThreat.threatLevel === 'DANGER' ? 'bg-[#ff3333] animate-pulse' :
              selectedThreat.threatLevel === 'CAUTION' ? 'bg-[#eab308]' :
              'bg-[#22c55e]'
            }`}></div>

            {/* Dossier Card Header */}
            <div className="border-b border-[#333] p-6 bg-[#0a0a0a]">
              <div className="text-xs text-[#ff3333] font-mono font-bold tracking-wider uppercase mb-1 flex items-center gap-2">
                <span>☣ KASUS # {selectedLocation.id.toUpperCase()}-{selectedProtagonist.id.toUpperCase()}</span>
                <span className="opacity-40 font-mono">// PRIVAT_DOCS</span>
              </div>
              <h3 className="text-xl font-bold font-mono text-white uppercase tracking-tighter">
                LAPORAN KONSEP INTISARI SURVIVAL HORROR
              </h3>
              <p className="text-xs text-[#a1a1a1] font-mono mt-2 leading-relaxed">
                Toleransi ancaman kritis. Dokumen bersandi taktis terintegrasi untuk perancang mekanik game.
              </p>
            </div>

            {/* Grid structure derived from Geometric Balance theme: split into a rigid grid block with thin gap dividers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#333] flex-1">
              
              {/* Item 1: Cerita Singkat */}
              <div className="bg-[#0a0a0a] p-6 flex flex-col justify-between">
                <div className="flex items-start">
                  <span className="text-[#ff3333] font-mono text-3xl font-bold mr-4 select-none">01</span>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      CERITA SINGKAT
                    </h4>
                    <p className={`text-xs text-[#a1a1a1] leading-relaxed font-typewriter ${isTyping ? 'cursor-blink' : ''}`}>
                      {displayedText.cerita || 'Menunggu penulisan konsep...'}
                    </p>
                  </div>
                </div>
                <div className="h-[2px] bg-[#ff3333] w-8 mt-4"></div>
              </div>

              {/* Item 2: Suasana & Kamera */}
              <div className="bg-[#0d0d0d] p-6 flex flex-col justify-between">
                <div className="flex items-start">
                  <span className="text-[#ff3333] font-mono text-3xl font-bold mr-4 select-none">02</span>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      SUASANA & KAMERA
                    </h4>
                    <p className={`text-xs text-[#a1a1a1] leading-relaxed font-typewriter ${isTyping ? 'cursor-blink' : ''}`}>
                      {displayedText.suasana || 'Menunggu penulisan konsep...'}
                    </p>
                  </div>
                </div>
                <div className="h-[2px] bg-[#ff3333] w-8 mt-4"></div>
              </div>

              {/* Item 3: Mekanik Gameplay Utama */}
              <div className="bg-[#0d0d0d] p-6 flex flex-col justify-between col-span-1 md:col-span-2">
                <div className="flex items-start">
                  <span className="text-[#ff3333] font-mono text-3xl font-bold mr-4 select-none">03</span>
                  <div className="w-full">
                    <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      MEKANIK GAMEPLAY UTAMA
                    </h4>
                    <p className={`text-xs text-[#a1a1a1] leading-relaxed whitespace-pre-line font-typewriter ${isTyping ? 'cursor-blink' : ''}`}>
                      {displayedText.mekanik || 'Menunggu penulisan konsep...'}
                    </p>
                  </div>
                </div>
                <div className="h-[2px] bg-[#ff3333] w-8 mt-4"></div>
              </div>

              {/* Item 4: Tujuan Akhir */}
              <div className="bg-[#0a0a0a] p-6 flex flex-col justify-between col-span-1 md:col-span-2 text-neutral-300">
                <div className="flex items-start">
                  <span className="text-[#ff3333] font-mono text-3xl font-bold mr-4 select-none">04</span>
                  <div className="w-full">
                    <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      TUJUAN AKHIR
                    </h4>
                    <p className={`text-xs text-[#a1a1a1] leading-relaxed font-typewriter mb-3 ${isTyping ? 'cursor-blink' : ''}`}>
                      {displayedText.tujuan || 'Menunggu penulisan konsep...'}
                    </p>
                    
                    {/* Retro target diagnostic condition panel */}
                    <div className="p-3 bg-[#110d0d] border border-[#ff3333]/20 rounded-none text-[10px] font-mono text-[#ff8888]">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-none bg-[#ff3333] inline-block"></span>
                        <span>WIN STATE: Berhasil merakit kunci, menembus lobi utama, lari lewat helikopter.</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="w-1.5 h-1.5 rounded-none bg-[#ff3333]/40 inline-block"></span>
                        <span>ESCAPE RATIO: Peluang hidup kritis tergantung stok amunisi laras lincah.</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[2px] bg-[#ff3333] w-8 mt-4"></div>
              </div>

            </div>

            {/* Dossier Footer with interactive generated Key Art thumbnail and exporters */}
            <div className="p-6 bg-[#050505] border-t border-[#333] flex flex-col md:flex-row items-center gap-4 justify-between">
              
              {/* Atmospheric visual key art generated earlier using search-maps-generation */}
              <div className="flex items-center gap-3.5 bg-[#0a0a0a] border border-[#333] p-2 rounded-none w-full md:w-auto">
                <img
                  src="/src/assets/images/horror_mansion_keyart_1779769302955.png"
                  alt="Horror Mansion Concept Keyart"
                  className="w-16 h-10 object-cover rounded-none border border-[#333]"
                  referrerPolicy="no-referrer"
                />
                <div className="text-[10px] font-mono text-[#888] leading-tight">
                  <div className="text-white font-bold uppercase tracking-wider">☣ ARTWORK INSPIRATIONAL</div>
                  <div>Victorian Mansion Foyer Draft Spec</div>
                </div>
              </div>

              {/* Export Utilities group */}
              <div className="flex w-full md:w-auto gap-3">
                {/* Copy Button */}
                <button
                  type="button"
                  id="btn-copy-concept"
                  onClick={handleCopyText}
                  className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-none bg-[#151515] hover:bg-[#222] hover:text-white border border-[#333] hover:border-[#ff3333] transition-all font-mono text-xs text-[#d1d1d1] cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500 font-bold">COPIED // TERSALIN</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#ff3333]" />
                      <span>SALIN KASUS DOCS</span>
                    </>
                  )}
                </button>

                {/* Download TXT Button */}
                <button
                  type="button"
                  id="btn-download-concept"
                  onClick={handleDownloadTxt}
                  className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-none bg-[#ff3333]/15 hover:bg-[#ff3333]/30 text-white border border-[#ff3333]/40 hover:border-[#ff3333] transition-all font-mono text-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#ff3333]" />
                  <span>DOWNLOAD TXT</span>
                </button>
              </div>

            </div>

          </div>

          {/* QUICK RETRO MECHANICS ACCORDION INSPIRATION SHEETS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-[#0a0a0a] border border-[#333] rounded-none p-4 space-y-1 text-center">
              <div className="mx-auto w-8 h-8 rounded-none bg-[#111] border border-[#222] flex items-center justify-center mb-1">
                <Flame className="w-4 h-4 text-[#ff3333]" />
              </div>
              <h5 className="text-xs font-mono font-bold text-white uppercase tracking-tight">Item Crafting</h5>
              <p className="text-[10px] text-[#888] font-mono leading-relaxed">
                Gabungkan bubuk mesiu (Gunpowder A + B) untuk peluru kaliber tinggi atau tanaman penawar (Green + Red Herb) untuk sembuh total.
              </p>
            </div>

            <div className="bg-[#0a0a0a] border border-[#333] rounded-none p-4 space-y-1 text-center">
              <div className="mx-auto w-8 h-8 rounded-none bg-[#111] border border-[#222] flex items-center justify-center mb-1">
                <AlertTriangle className="w-4 h-4 text-[#ff3333]" />
              </div>
              <h5 className="text-xs font-mono font-bold text-white uppercase tracking-tight">Sistem Inkubasi</h5>
              <p className="text-[10px] text-[#888] font-mono leading-relaxed">
                Musuh mati yang tidak dibakar atau dikepras dengan pisau sisa akan bangkit kembali (Crimson Head) dengan kekuatan dan lari 2x lipat!
              </p>
            </div>

            <div className="bg-[#0a0a0a] border border-[#333] rounded-none p-4 space-y-1 text-center">
              <div className="mx-auto w-8 h-8 rounded-none bg-[#111] border border-[#222] flex items-center justify-center mb-1">
                <Binary className="w-4 h-4 text-[#ff3333]" />
              </div>
              <h5 className="text-xs font-mono font-bold text-white uppercase tracking-tight">Inspeksi Item 3D</h5>
              <p className="text-[10px] text-[#888] font-mono leading-relaxed">
                Selidiki item yang diperoleh di layar penyimpanan. Balik buku tua untuk mencari kunci tersembunyi atau tombol lencana logam rahasia.
              </p>
            </div>

          </div>

        </section>

      </main>

      <footer className="border-t border-[#333] bg-[#0a0a0d] py-6 text-center text-[10px] font-mono text-[#666] max-w-7xl mx-auto px-4 mt-12 mb-6 w-full">
        <div>
          PROYEK ENSIKLOPEDIA INDIE GAME CREATOR &copy; 2026 // DRAFT DIKEMBANGKAN DI CLOUD RUN PRIVAT // CLASSIFIED INTEL
        </div>
        <div className="mt-1 text-[#444]">
          Semua hak cipta mekanik terinspirasi oleh franchise legendaris Capcom Resident Evil secara tidak komersial.
        </div>
      </footer>

    </div>
  );
}
