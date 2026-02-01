import { useState, useEffect } from 'react';
import { siteConfig } from '@/config/site';

export function usePersona() {
  const [customInstructions, setCustomInstructions] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('smartdocs_persona');
      return saved || siteConfig.ai.defaultPersona;
    }
    return siteConfig.ai.defaultPersona;
  });

  useEffect(() => {
    // Keep localStorage in sync if needed or handle other side effects
  }, []);

  const loadDefaultPersona = () => {
    const savedDefault = localStorage.getItem('smartdocs_default_persona');
    setCustomInstructions(savedDefault || siteConfig.ai.defaultPersona);
  };

  const saveAsDefaultPersona = () => {
    localStorage.setItem('smartdocs_default_persona', customInstructions);
    localStorage.setItem('smartdocs_persona', customInstructions);
    alert('Persona saved as your new default.');
  };

  const updatePersona = (val: string) => {
    setCustomInstructions(val);
  };

  return { customInstructions, setCustomInstructions: updatePersona, loadDefaultPersona, saveAsDefaultPersona };
}
