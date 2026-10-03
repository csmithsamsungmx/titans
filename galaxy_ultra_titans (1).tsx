import React, { useState } from 'react';
import { Trophy, TrendingUp, ChevronRight, Store, Medal, Award, Search, X, Crosshair, Edit2 } from 'lucide-react';

// Added realistic 'sales' data to simulate mid-campaign progress
const MOCK_DATA = [
  { id: 11, name: "JB HIFI Malaga (Titan)", sales: 0, cutIn: 186, target: 203 },
  { id: 12, name: "JB Hifi Osborne Park (Titan)", sales: 0, cutIn: 194, target: 211 },
];

const Header = ({ title }) => (
  <header className="w-full bg-black border-b border-neutral-800 p-4 md:px-8 flex flex-col md:flex-row justify-between items-center z-10 relative">
    <div className="flex items-center gap-4 mb-4 md:mb-0">
      <div className="bg-[#FFCC00] text-black font-black text-2xl md:text-3xl italic tracking-tighter px-3 py-1 rounded-sm shadow-[0_0_15px_rgba(255,204,0,0.5)]">
        JB
      </div>
      <div className="text-white text-xl md:text-2xl font-bold tracking-widest flex items-center gap-3">
        <X size={24} className="text-neutral-500" />
        SAMSUNG
      </div>
    </div>
    <div className="flex flex-col items-center md:items-end">
      <h1 className="text-white text-lg md:text-2xl font-black uppercase tracking-widest text-center md:text-right">
        Black Friday <span className="text-neutral-400 drop-shadow-[0_0_10px_rgba(163,163,163,0.8)]">Incentive</span>
      </h1>
      <p className="text-neutral-400 text-xs md:text-sm uppercase tracking-widest mt-1">Live % Leaderboard</p>
    </div>
  </header>
);

const ProgressBar = ({ sales, cutIn, target }) => {
  const salesPercent = Math.min((sales / target) * 100, 100);
  const cutInPercent = Math.min((cutIn / target) * 100, 100);
  const isCutInMet = sales >= cutIn;
  const isTargetMet = sales >= target;
  const actualPercent = ((sales / target) * 100).toFixed(1);

  return (
    <div className="w-full flex flex-col justify-center">
        <div className="flex justify-between text-[10px] md:text-xs mb-1">
            <span className="text-neutral-400 font-medium">Sales: {sales}</span>
            <span className={`font-black ${isTargetMet ? 'text-green-400' : isCutInMet ? 'text-blue-400' : 'text-neutral-300'}`}>
                {actualPercent}%
            </span>
        </div>
        <div className="w-full bg-neutral-800 h-2 md:h-3 rounded-full relative">
            <div
                className={`h-full rounded-full transition-all duration-1000 ${isTargetMet ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : isCutInMet ? 'bg-blue-500' : 'bg-neutral-500'}`}
                style={{ width: `${salesPercent}%` }}
            ></div>
            {/* Cut-in Marker */}
            <div
                className="absolute top-[-4px] bottom-[-4px] w-1.5 bg-yellow-400 z-10 rounded-sm shadow-[0_0_5px_rgba(250,204,21,1)] border border-black"
                style={{ left: `${cutInPercent}%`, transform: 'translateX(-50%)' }}
                title={`Cut-in: ${cutIn}`}
            ></div>
        </div>
        <div className="flex justify-between text-[9px] md:text-[10px] text-neutral-500 mt-1 relative h-4">
            <span>0</span>
            <span
                style={{ position: 'absolute', left: `${cutInPercent}%`, transform: 'translateX(-50%)' }}
                className="text-yellow-500/90 font-bold whitespace-nowrap"
            >
                Cut-in ({cutIn})
            </span>
            <span>Target ({target})</span>
        </div>
    </div>
  );
};

const Podium = ({ data }) => {
  if (!data || data.length === 0) return null;
  const first = data[0];
  const second = data.length > 1 ? data[1] : null;
  const third = data.length > 2 ? data[2] : null;

  const renderPodiumItem = (item, place, Icon, iconColor, bgGradient, heightClass) => {
    if (!item) return null;
    const percent = ((item.sales / item.target) * 100).toFixed(1);
    
    return (
      <div className={`flex-1 flex flex-col items-center relative group transform transition-transform hover:-translate-y-2 ${place === 1 ? 'max-w-[280px] z-20 mx-[-10px] md:mx-[-20px]' : 'max-w-[220px] z-10'}`}>
        <Icon size={place === 1 ? 56 : 40} className={`${iconColor} mb-2 drop-shadow-[0_0_10px_currentColor] ${place === 1 ? 'animate-pulse' : ''}`} />
        <div className={`${iconColor} font-bold mb-4 text-center px-2 w-full`}>
          <div className="text-xs md:text-base leading-tight mb-2 font-black text-white h-8 md:h-12 flex items-end justify-center">{item.name}</div>
          <div className={`text-2xl md:text-4xl font-black mb-1 ${percent >= 100 ? 'text-green-400' : percent >= (item.cutIn/item.target)*100 ? 'text-blue-400' : 'text-neutral-300'}`}>
            {percent}%
          </div>
          <div className="text-[10px] md:text-xs text-neutral-400 uppercase tracking-widest">{item.sales} / {item.target} Units</div>
        </div>
        <div className={`w-full ${heightClass} ${bgGradient} rounded-t-xl flex items-start justify-center pt-4 md:pt-6 shadow-2xl relative border-t-2 border-white/20`}>
          <span className="text-5xl md:text-7xl font-black text-black opacity-30">{place}</span>
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-t-xl pointer-events-none"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-end justify-center w-full max-w-5xl mx-auto mt-20 mb-12 px-2">
      {renderPodiumItem(second, 2, Medal, "text-gray-300", "bg-gradient-to-t from-[#404040] via-[#737373] to-[#d4d4d8]", "h-40 md:h-48")}
      {renderPodiumItem(first, 1, Trophy, "text-yellow-400", "bg-gradient-to-t from-[#B28B33] via-[#FFD700] to-[#FFF0A0]", "h-52 md:h-64")}
      {renderPodiumItem(third, 3, Award, "text-amber-500", "bg-gradient-to-t from-[#451A03] via-[#B45309] to-[#D97706]", "h-32 md:h-40")}
    </div>
  );
};

const RankList = ({ data, startIndex = 4 }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto bg-neutral-900/80 backdrop-blur-md rounded-xl border border-neutral-800 shadow-2xl overflow-hidden mb-12">
      <div className="divide-y divide-neutral-800/50">
        {data.map((item, index) => (
          <div key={item.id} className="grid grid-cols-12 gap-2 md:gap-6 p-4 md:p-6 items-center hover:bg-neutral-800/60 transition-colors duration-200 group">
             <div className="col-span-2 md:col-span-1 text-center font-black text-neutral-500 text-xl md:text-2xl">
                 #{index + startIndex}
             </div>
             <div className="col-span-10 md:col-span-4 font-bold text-white text-sm md:text-lg truncate group-hover:text-neutral-300 transition-colors">
                 {item.name}
             </div>
             <div className="col-span-12 md:col-span-7 mt-3 md:mt-0">
                 <ProgressBar sales={item.sales} cutIn={item.cutIn} target={item.target} />
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EditModal = ({ data, onSave, onClose }) => {
  const [editData, setEditData] = useState(data);

  const handleChange = (id, val) => {
     setEditData(editData.map(item => item.id === id ? { ...item, sales: Number(val) } : item));
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 w-full max-w-lg shadow-2xl flex flex-col max-h-[80vh]">
        <h2 className="text-xl font-bold text-white mb-4">Update Sales Data</h2>
        <div className="flex-1 overflow-y-auto pr-2 space-y-3">
          {editData.map(item => (
            <div key={item.id} className="flex justify-between items-center bg-neutral-800/50 p-3 rounded-lg">
              <span className="text-sm font-medium text-neutral-200">{item.name}</span>
              <div className="flex items-center gap-2">
                 <span className="text-xs text-neutral-500">Sales:</span>
                 <input
                   type="number"
                   min="0"
                   value={item.sales}
                   onChange={(e) => handleChange(item.id, e.target.value)}
                   className="w-20 bg-neutral-950 border border-neutral-700 text-white px-3 py-1.5 rounded-md text-center focus:outline-none focus:border-blue-500"
                 />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-neutral-800">
          <button onClick={onClose} className="px-5 py-2 text-neutral-400 hover:text-white transition-colors">Cancel</button>
          <button onClick={() => onSave(editData)} className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-colors shadow-lg shadow-blue-900/20">Save Updates</button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [data, setData] = useState(MOCK_DATA);
  const [isEditing, setIsEditing] = useState(false);
  const title = "Galaxy Ultra Titans";
  
  const sortedData = [...data].sort((a, b) => {
     const aPercent = a.sales / a.target;
     const bPercent = b.sales / b.target;
     if (bPercent !== aPercent) return bPercent - aPercent;
     return b.sales - a.sales;
  });

  const topThree = sortedData.slice(0, 3);
  const restData = sortedData.slice(3);

  return (
    <>
      <style>{`body { background-color: #050505; color: white; margin: 0; font-family: system-ui, -apple-system, sans-serif; }`}</style>
      <div className="min-h-screen bg-[#050505] flex flex-col font-sans relative overflow-x-hidden">
        <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-neutral-600/10 to-transparent pointer-events-none z-0"></div>
        <div className="fixed top-[-20%] right-[-10%] w-[50%] h-[50%] bg-neutral-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
        
        <Header title={title} />

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 relative z-10 flex flex-col items-center">
          
          <div className="flex flex-col items-center w-full max-w-4xl mx-auto mb-8 px-2 mt-4 gap-4">
             <h3 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 to-neutral-600 tracking-wide uppercase drop-shadow-lg text-center">
                {title}
             </h3>
             <div className="flex flex-wrap justify-center items-center gap-4 mt-2">
                 <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Cut-in Met</div>
                 <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800"><div className="w-2 h-2 rounded-full bg-green-500"></div> Target Reached</div>
                 <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 text-xs font-bold text-white bg-neutral-800 hover:bg-neutral-700 px-4 py-1.5 rounded-full border border-neutral-600 transition-colors ml-2"
                 >
                    <Edit2 size={14} /> Update Sales
                 </button>
             </div>
          </div>

          <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-500">
            <Podium data={topThree} />
            {restData.length > 0 && (
               <div className="w-full flex items-center justify-center gap-4 my-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent flex-1 max-w-xs"></div>
                  <ChevronRight size={20} className="text-neutral-600 rotate-90" />
                  <div className="h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent flex-1 max-w-xs"></div>
               </div>
            )}
            {restData.length > 0 ? (
               <RankList data={restData} startIndex={topThree.length + 1} />
            ) : (
               data.length === 0 && (
                 <div className="w-full text-center py-20 text-neutral-500 flex flex-col items-center">
                    <Search size={48} className="mb-4 opacity-20" />
                    <p>No store data available for this group.</p>
                 </div>
               )
            )}
          </div>
        </main>

        {isEditing && (
           <EditModal
              data={data}
              onClose={() => setIsEditing(false)}
              onSave={(newData) => {
                 setData(newData);
                 setIsEditing(false);
              }}
           />
        )}
      </div>
    </>
  );
}