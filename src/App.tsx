import { useState } from 'react';

// --- PLACEHOLDERS & CONFIG (Where you'd put real stuff later) ---

// TODO: Put your actual Gemini API Key here when you build the backend
// const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_GOES_HERE";

// TODO: This is the prompt you'd send to the Gemini API
// const GEMINI_ROAST_PROMPT = `
// You are Floof, a cute but sassy and judgmental cloud friend. Your goal is to help your friend stick to her diet. She has just uploaded a photo of junk food she ate. Your response must be a short, hilarious, savage, and funny roast or intervention about the food in the image. Speak in a cheeky, meme-worthy tone. Keep it under 250 characters. Start the roast by identifying the food if you can. Now, generate a roast for the attached image.
// `;

// Mock data - in a real app, this would come from a database
const initialWeeklyLog = [
  { day: 'M', status: 'junk', icon: '🍩' },
  { day: 'T', status: 'free', icon: '🍓' },
  { day: 'W', status: 'allowed' },
  { day: 'T', status: 'junk', icon: '🍕' },
  { day: 'F', status: 'today' },
  { day: 'S', status: 'allowed' },
  { day: 'S', status: 'allowed' },
];

const stickers = [
    { name: "Salad Saviour", image: "/images/sticker-salad.png" },
    { name: "Avocado Advocate", image: "/images/sticker-avocado.png" },
    { name: "Hydration Hero", image: "/images/sticker-water.png" },
];

// --- MAIN APP COMPONENT ---

export default function App() {
  // --- STATE MANAGEMENT ---
  const [streak, setStreak] = useState(4);
  const [weeklyLog, setWeeklyLog] = useState(initialWeeklyLog);
  const [isJunkQueenMode, setIsJunkQueenMode] = useState(false);
  const [showRoast, setShowRoast] = useState(false);
  const [roastData, setRoastData] = useState({ image: '', message: '' });

  // --- MOCK FUNCTIONS ---
  // This function simulates uploading a photo and getting a roast
  const handleGuiltySnackUpload = () => {
    // In a real app, you'd handle file upload here.
    // We'll just pick a random junk food image.
    const junkFoods = ['/images/pizza.png', '/images/donut.png', '/images/burger.png'];
    const randomJunk = junkFoods[Math.floor(Math.random() * junkFoods.length)];
    
    // Check if this triggers Junk Queen Mode
    const junkDays = weeklyLog.filter(d => d.status === 'junk').length;
    if (junkDays + 1 >= 4) {
      setIsJunkQueenMode(true);
      return;
    }
    
    // Simulate a roast from Floof
    setRoastData({
      image: randomJunk,
      message: "A whole pizza? On a TUESDAY? You're not just a snack, you're the entire damn pantry. Floof is disappointed."
    });
    setShowRoast(true);
  };

  const closeRoast = () => {
    setShowRoast(false);
    // Add the "junk" status to today's log
    const todayIndex = weeklyLog.findIndex(d => d.status === 'today');
    if (todayIndex !== -1) {
      const newLog = [...weeklyLog];
      newLog[todayIndex] = {...newLog[todayIndex], status: 'junk', icon: '🍔'};
      setWeeklyLog(newLog);
    }
  };

  const resetFromJunkQueen = () => {
    setIsJunkQueenMode(false);
    setStreak(0); // Oof, the streak is gone!
    // Maybe reset the week too
  }
  
  // --- UI COMPONENTS (Defined inside App for single-file simplicity) ---

  const Dashboard = () => (
    <div className="p-6 space-y-8">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bubbly font-bold text-text-dark">Pineapple Cravings Crusher</h1>
        <img src="/images/floof.png" alt="Floof the Cloud" className="w-16 h-16 animate-float" />
      </header>

      {/* Streak Tracker */}
      <div className="text-center bg-white/70 backdrop-blur-sm p-6 rounded-3xl shadow-lg">
        <p className="text-lg text-text-light">You've crushed it for</p>
        <p className="text-7xl font-bold text-pink-kawaii my-2 drop-shadow-lg">{streak}</p>
        <p className="text-lg text-text-light">weeks straight! ✨</p>
      </div>
      
      {/* Weekly View */}
      <div>
        <h2 className="text-xl font-bold text-text-dark mb-4 text-center">Your Week of Destiny</h2>
        <div className="grid grid-cols-7 gap-2">
          {weeklyLog.map(({ day, status, icon }) => (
            <div key={day} className={`aspect-square rounded-full flex flex-col justify-center items-center font-bold text-text-dark transition-all duration-300
              ${status === 'junk' ? 'bg-pink-kawaii shadow-inner' : ''}
              ${status === 'free' ? 'bg-mint-fresh shadow-inner' : ''}
              ${status === 'allowed' ? 'bg-yellow-sunbeam/50 border-2 border-dashed border-white' : ''}
              ${status === 'today' ? 'bg-purple-dream animate-pulse' : ''}
              ${status === 'junk' || status === 'free' ? 'text-4xl' : 'text-lg'}
            `}>
              {icon ? icon : day}
              <span className="text-xs font-normal mt-1">{status === 'today' ? day : ''}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main CTA */}
      <div className="text-center pt-4">
          <button 
            onClick={handleGuiltySnackUpload}
            className="bg-pink-kawaii text-text-dark font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform animate-bounce"
          >
            I Sinned... Guilty Snack Upload
          </button>
      </div>

      {/* Sticker Collection */}
      <div>
        <h2 className="text-xl font-bold text-text-dark mb-4 text-center">👑 Clean Queen Rewards 👑</h2>
        <div className="bg-white/70 backdrop-blur-sm p-4 rounded-3xl shadow-lg flex justify-center gap-4">
          {stickers.map(sticker => (
            <img key={sticker.name} src={sticker.image} alt={sticker.name} title={sticker.name} className="w-20 h-20 transform hover:rotate-12 transition-transform" />
          ))}
        </div>
      </div>
    </div>
  );

  const JunkQueenAlert = () => (
    <div className="absolute inset-0 bg-black/80 flex flex-col justify-center items-center text-center p-4 z-20">
      <img src="/images/skull.png" alt="Junk Queen Alert" className="w-32 h-32 animate-ping" />
      <h1 className="text-5xl font-bubbly font-extrabold text-pink-kawaii mt-4 drop-shadow-lg">💀 JUNK QUEEN ALERT 💀</h1>
      <p className="text-white text-xl mt-4 max-w-sm">You have breached the snack barrier. Floof is crying. Your diet plan is spontaneously combusting.</p>
      
      {/* Redemption Quest */}
      <div className="bg-gradient-to-tr from-purple-dream to-yellow-sunbeam text-text-dark p-6 rounded-2xl shadow-2xl mt-8 max-w-sm">
        <h3 className="text-2xl font-bold">Floof's Redemption Quest</h3>
        <p className="mt-2">Do 20 squats while thinking about your life choices.</p>
        <button onClick={resetFromJunkQueen} className="mt-4 bg-mint-fresh font-bold py-2 px-6 rounded-full shadow-md">I Have Repented</button>
      </div>
    </div>
  );

  const RoastModal = () => (
    <div className="absolute inset-0 bg-black/70 flex justify-center items-center z-30" onClick={closeRoast}>
        <div className="bg-white rounded-3xl p-6 w-11/12 max-w-sm text-center relative" onClick={e => e.stopPropagation()}>
            <img src={roastData.image} alt="Guilty Snack" className="w-full rounded-2xl mb-4 shadow-lg"/>
            <div className="flex gap-4 items-start">
                <img src="/images/floof.png" alt="Floof" className="w-16 h-16 flex-shrink-0" />
                <div className="bg-purple-dream/50 p-4 rounded-xl text-left">
                    <p className="text-text-dark font-medium">{roastData.message}</p>
                </div>
            </div>
            <button onClick={closeRoast} className="mt-6 bg-pink-kawaii text-text-dark font-bold py-2 px-5 rounded-full">Okay, I get it...</button>
        </div>
    </div>
  );


  // --- RENDER LOGIC ---
  return (
    <main className="bg-gradient-to-br from-yellow-sunbeam via-pink-kawaii to-purple-dream min-h-screen font-sans relative overflow-hidden">
      <div className="w-full max-w-md mx-auto bg-white/30 backdrop-blur-xl min-h-screen shadow-2xl">
        {/* Sparkles Background */}
        <img src="/images/sparkle.png" alt="" className="absolute top-10 left-5 w-12 h-12 opacity-50 animate-pulse" />
        <img src="/images/sparkle.png" alt="" className="absolute top-1/4 right-5 w-8 h-8 opacity-50 animate-pulse delay-500" />
        <img src="/images/sparkle.png" alt="" className="absolute bottom-10 right-10 w-16 h-16 opacity-50 animate-pulse delay-1000" />

        {isJunkQueenMode ? <JunkQueenAlert /> : <Dashboard />}
        {showRoast && <RoastModal />}
      </div>
    </main>
  );
}