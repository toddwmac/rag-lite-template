import { User, Sparkles, Loader2, SlidersHorizontal } from 'lucide-react';
import { siteConfig } from '@/config/site';
import Image from 'next/image';

interface ChatWindowProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messages: any[];
  isLoading: boolean;
  error?: Error;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

export function ChatWindow({ messages, isLoading, error, scrollRef }: ChatWindowProps) {
  return (
    <div 
      className="flex-1 overflow-y-auto px-6 md:px-16 py-12 scroll-smooth custom-scrollbar"
      ref={scrollRef}
    >
      <div className="max-w-4xl mx-auto">
        {messages.length === 0 ? (
          <div className="h-[50vh] flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-700">
            <div className="bg-[#FAFBFC] p-8 rounded-[2.5rem] border border-[#2872fa]/10 shadow-sm">
              <Sparkles size={48} className="text-[#2872fa] opacity-20" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-montserrat font-bold text-[#192a3d] tracking-tight text-balance">
                Document Intelligence Platform
              </h2>
              <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed font-medium">
                Select specific documents from your library to begin a context-aware research session.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-12 pb-24">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-6 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm border ${
                  m.role === 'user' 
                    ? 'bg-[#192a3d] text-white border-[#192a3d]' 
                    : 'bg-white text-[#2872fa] border-[#2872fa]/10'
                }`}>
                  {m.role === 'user' ? <User size={18} /> : (
                    <Image 
                      src={siteConfig.company.logo} 
                      alt="AI"
                      width={20}
                      height={20}
                      className="w-5 h-auto brightness-0" 
                      style={{ filter: 'invert(32%) sepia(91%) saturate(3042%) hue-rotate(213deg) brightness(101%) contrast(97%)' }} 
                      unoptimized
                    />
                  )}
                </div>
                
                <div className={`max-w-[80%] space-y-2 ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`px-6 py-4 rounded-3xl text-[15px] leading-relaxed shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-[#2872fa] text-white rounded-tr-none' 
                      : 'bg-[#FAFBFC] text-[#192a3d] border border-[#2872fa]/5 rounded-tl-none'
                  }`}>
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  </div>
                  <div className={`text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 px-2 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {m.role === 'user' ? 'Transmission Recv' : 'Intelligence Stream'}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-6 animate-in fade-in duration-300">
                <div className="w-9 h-9 rounded-full bg-white border border-[#2872fa]/10 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                  <Loader2 size={18} className="animate-spin text-[#2872fa]" />
                </div>
                <div className="bg-[#FAFBFC] border border-[#2872fa]/5 px-6 py-4 rounded-3xl rounded-tl-none shadow-sm flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-[#2872fa] rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-[#2872fa] rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-[#2872fa] rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Analyzing Documents</span>
                </div>
              </div>
            )}
          </div>
        )}
        
        {error && (
          <div className="max-w-md mx-auto mb-12 p-5 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-4 text-red-800 text-xs font-semibold shadow-sm">
            <div className="bg-red-500 text-white p-1.5 rounded-full border border-red-600"><SlidersHorizontal size={14} /></div>
            <div className="space-y-0.5">
              <p className="uppercase tracking-tight opacity-50 text-[10px]">Critical Stream Error</p>
              <p>{error.message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
