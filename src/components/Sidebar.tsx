import { FileText, CheckCircle2, Circle, RotateCcw, SlidersHorizontal, ChevronUp, ChevronDown, History, Star, Save } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { useState } from 'react';

interface SidebarProps {
  files: string[];
  selectedFiles: string[];
  toggleFile: (file: string) => void;
  toggleAll: () => void;
  clearChat: () => void;
  customInstructions: string;
  setCustomInstructions: (val: string) => void;
  loadDefaultPersona: () => void;
  saveAsDefaultPersona: () => void;
}

export function Sidebar({
  files,
  selectedFiles,
  toggleFile,
  toggleAll,
  clearChat,
  customInstructions,
  setCustomInstructions,
  loadDefaultPersona,
  saveAsDefaultPersona,
}: SidebarProps) {
  const [showPersona, setShowPersona] = useState(false);

  return (
    <aside className="w-80 bg-[#192a3d] text-white hidden md:flex flex-col shadow-inner">
      <div className="p-6 border-b border-white/5">
        <button 
          onClick={clearChat}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#2872fa] hover:bg-[#1559ed] text-white text-xs font-black uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg shadow-black/20 active:scale-95"
        >
          <RotateCcw size={14} />
          New Research Session
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide space-y-8">
        
        {/* KNOWLEDGE BASE SECTION */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
              <FileText size={12} className="text-[#2872fa]" /> Knowledge Base
            </h3>
            <button 
              onClick={toggleAll}
              className="text-[10px] font-bold text-[#2872fa] hover:text-[#1559ed] transition-colors uppercase"
            >
              {selectedFiles.length === files.length ? 'Clear' : 'Select All'}
            </button>
          </div>

          <div className="space-y-2">
            {files.length === 0 ? (
              <p className="text-xs text-white/30 italic px-2">No documents discovered</p>
            ) : (
              files.map(file => {
                const isSelected = selectedFiles.includes(file);
                return (
                  <button 
                    key={file} 
                    onClick={() => toggleFile(file)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-xs text-left rounded-xl transition-all border ${
                      isSelected 
                        ? 'bg-[#2872fa]/10 border-[#2872fa]/30 text-white font-semibold' 
                        : 'bg-transparent border-transparent text-white/50 hover:bg-white/5'
                    }`}
                  >
                    {isSelected ? (
                      <CheckCircle2 size={14} className="text-[#2872fa] flex-shrink-0" />
                    ) : (
                      <Circle size={14} className="text-white/10 flex-shrink-0" />
                    )}
                    <span className="truncate" title={file}>{file}</span>
                  </button>
                );
              })
            )}
          </div>
        </section>

        {/* LIVE TUNING SECTION */}
        <section className="bg-black/20 rounded-2xl p-4 border border-white/5">
          <button 
            onClick={() => setShowPersona(!showPersona)}
            className="w-full flex items-center justify-between text-[10px] font-black text-[#2872fa] uppercase tracking-[0.2em]"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={12} />
              Persona Tuning
            </div>
            {showPersona ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
          
          {showPersona && (
            <div className="mt-4 space-y-3 animate-in slide-in-from-top-2 duration-300">
              <p className="text-[10px] text-white/40 leading-relaxed italic">
                Instructions sent to the AI alongside your documents to refine behavior.
              </p>
              <textarea 
                className="w-full bg-[#192a3d] border border-white/10 rounded-xl p-3 text-xs text-white/80 focus:border-[#2872fa] focus:outline-none min-h-[240px] resize-none leading-relaxed caret-[#2872fa] selection:bg-[#2872fa] selection:text-white"
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                placeholder="e.g. Speak like an expert consultant..."
              />
              
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={loadDefaultPersona}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-white/70 rounded-lg text-[9px] font-bold transition-all border border-white/10"
                >
                  <History size={12} />
                  LOAD DEFAULT
                </button>
                <button 
                  onClick={saveAsDefaultPersona}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-white/70 rounded-lg text-[9px] font-bold transition-all border border-white/10"
                >
                  <Star size={12} />
                  SET AS DEFAULT
                </button>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-[8px] font-bold text-white/20 uppercase">Local Session Store</span>
                <button 
                  onClick={() => {
                    localStorage.setItem('smartdocs_persona', customInstructions);
                    setShowPersona(false);
                    window.location.reload();
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-[#2872fa] hover:bg-[#1559ed] text-white rounded-lg text-[10px] font-black transition-colors shadow-lg shadow-[#2872fa]/20"
                  title="Apply and Collapse"
                >
                  <Save size={12} />
                  APPLY & CLOSE
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
      
      <div className="p-6 bg-black/20 border-t border-white/5 space-y-3">
        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
          <span className="text-white/30">Intelligence</span>
          <span className="text-[#2872fa]">{siteConfig.ai.defaultModel.split('-')[1]} {siteConfig.ai.defaultModel.split('-')[2]}</span>
        </div>
        <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
          <div 
            className="bg-[#2872fa] h-full transition-all duration-700 ease-out" 
            style={{ width: `${(selectedFiles.length / Math.max(files.length, 1)) * 100}%` }}
          />
        </div>
      </div>
    </aside>
  );
}
