import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { dict, type Lang, type Translation } from './dict'

interface LanguageCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: Translation
}

const LanguageContext = createContext<LanguageCtx>({
  lang: 'en',
  setLang: () => {},
  t: dict.en,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('argus-lang') as Lang | null
    return saved && saved in dict ? saved : 'en'
  })

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('argus-lang', l)
  }

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dict[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useT = () => useContext(LanguageContext)
