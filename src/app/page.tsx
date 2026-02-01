'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { ChatWindow } from '@/components/ChatWindow';
import { ChatInput } from '@/components/ChatInput';
import { useFiles } from '@/hooks/use-files';
import { usePersona } from '@/hooks/use-persona';

export default function Chat() {
  const [localInput, setLocalInput] = useState('');
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { files, selectedFiles, toggleFile, toggleAll } = useFiles();
  const { customInstructions, setCustomInstructions, loadDefaultPersona, saveAsDefaultPersona } = usePersona();

  const { 
    messages, 
    append, 
    setMessages,
    isLoading, 
    error 
  } = useChat({
    onError: (err) => {
      console.error('AI_SDK_ERROR:', err);
    }
  });

  useLayoutEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  const clearChat = () => {
    setMessages([]);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const onFormSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = localInput.trim();
    if (!text || isLoading) return;

    try {
      await append({ 
        content: text, 
        role: 'user' 
      }, {
        body: { 
          selectedFiles,
          customInstructions 
        }
      });
      setLocalInput('');
    } catch (err) {
      console.error('Submission failed', err);
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-screen bg-[#FAFBFC] text-[#192a3d] font-sans selection:bg-[#2872fa]/10">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          files={files}
          selectedFiles={selectedFiles}
          toggleFile={toggleFile}
          toggleAll={toggleAll}
          clearChat={clearChat}
          customInstructions={customInstructions}
          setCustomInstructions={setCustomInstructions}
          loadDefaultPersona={loadDefaultPersona}
          saveAsDefaultPersona={saveAsDefaultPersona}
        />

        <main className="flex-1 flex flex-col relative min-w-0 bg-white">
          <ChatWindow 
            messages={messages}
            isLoading={isLoading}
            error={error}
            scrollRef={scrollRef}
          />
          
          <ChatInput 
            input={localInput}
            setInput={setLocalInput}
            isLoading={isLoading}
            onSubmit={onFormSubmit}
            selectedFilesCount={selectedFiles.length}
          />
        </main>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@200;400;600;700;900&display=swap');
        
        body { 
          margin: 0; 
          padding: 0; 
          font-family: 'Inter', sans-serif;
          background: #FAFBFC;
        }

        .font-montserrat {
          font-family: var(--font-montserrat), 'Montserrat', sans-serif;
        }

        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E1E8ED; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #2872fa; }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}