import { Send, Loader2 } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface ChatInputProps {
  input: string;
  setInput: (val: string) => void;
  isLoading: boolean;
  onSubmit: (e?: React.FormEvent) => void;
  selectedFilesCount: number;
}

export function ChatInput({ input, setInput, isLoading, onSubmit, selectedFilesCount }: ChatInputProps) {
  return (
    <div className="p-8 md:p-12 bg-gradient-to-t from-white via-white to-transparent sticky bottom-0">
      <div className="max-w-3xl mx-auto relative group">
        <form onSubmit={onSubmit} className="relative flex items-center">
          <input
            autoFocus
            className="w-full pl-8 pr-16 py-5 rounded-[2rem] bg-white border-2 border-slate-100 focus:border-[#2872fa] outline-none transition-all text-[16px] shadow-2xl shadow-slate-200/40 placeholder:text-slate-300 disabled:bg-[#FAFBFC] disabled:cursor-not-allowed"
            value={input}
            placeholder={selectedFilesCount === 0 ? "Select context to begin..." : "Ask your intelligence agent anything..."}
            onChange={(e) => setInput(e.target.value)}
            disabled={selectedFilesCount === 0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSubmit();
              }
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim() || selectedFilesCount === 0}
            className="absolute right-3.5 p-3 bg-[#2872fa] text-white rounded-full disabled:bg-slate-100 disabled:text-slate-300 hover:bg-[#1559ed] transition-all shadow-lg shadow-[#2872fa]/20 active:scale-90"
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </form>
        <div className="flex justify-between items-center mt-4 px-6">
           <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${selectedFilesCount > 0 ? 'bg-green-500 animate-pulse' : 'bg-slate-200'}`} />
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">
                {selectedFilesCount} ACTIVE_SOURCES
              </span>
           </div>
           <div className="text-[9px] font-black text-slate-200 uppercase tracking-[0.2em]">
             {siteConfig.company.name} {/* Intelligent Research Node */}
           </div>
        </div>
      </div>
    </div>
  );
}
