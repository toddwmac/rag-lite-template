import { Globe, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/config/site';
import Image from 'next/image';

export function Header() {
  return (
    <header className="h-16 bg-[#192a3d] flex items-center justify-between px-6 shadow-md z-10">
      <div className="flex items-center gap-4">
        <a 
          href={siteConfig.company.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <Image 
            src={siteConfig.company.logo} 
            alt={siteConfig.company.name} 
            width={150}
            height={50}
            className="h-[50px] w-auto object-contain rounded-md"
            unoptimized
          />
        </a>
        <div className="h-6 w-[1px] bg-white/20 hidden md:block" />
        <h1 className="text-white font-montserrat font-semibold tracking-wide text-sm md:text-base">
          {siteConfig.name} <span className="text-[#2872fa] font-black text-xs ml-1 opacity-80 uppercase tracking-tighter">{siteConfig.subtitle}</span>
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <a 
          href={siteConfig.company.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white flex items-center gap-2 text-xs font-medium transition-colors"
        >
          <Globe size={14} />
          <span className="hidden sm:inline">{new URL(siteConfig.company.url).hostname}</span>
          <ExternalLink size={12} />
        </a>
      </div>
    </header>
  );
}
