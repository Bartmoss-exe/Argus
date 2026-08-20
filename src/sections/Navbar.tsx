import { useT } from '../i18n/LanguageContext'
import { LANGS } from '../i18n/dict'

export default function Navbar() {
  const { lang, setLang, t } = useT()

  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <nav className="flex items-center justify-between px-6 py-5 text-white md:px-10">
        <a href="#" className="flex items-baseline gap-2">
          <span className="text-lg font-bold tracking-tight">ARGUS</span>
          <span className="mono text-[10px] uppercase tracking-[0.3em] text-[#ff2e2e]">Red Team</span>
        </a>

        <div className="mono hidden items-center gap-8 text-[11px] uppercase tracking-[0.25em] md:flex">
          <a href="#operacao" className="opacity-60 transition-opacity duration-300 hover:opacity-100">{t.nav.operation}</a>
          <a href="#capacidades" className="opacity-60 transition-opacity duration-300 hover:opacity-100">{t.nav.capabilities}</a>
          <a href="#contato" className="opacity-60 transition-opacity duration-300 hover:opacity-100">{t.nav.contact}</a>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          {/* language switcher */}
          <div className="mono flex items-center gap-2.5 text-[10px] uppercase tracking-[0.2em]">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`transition-colors duration-300 ${
                  lang === l ? 'text-white' : 'text-white/35 hover:text-white/75'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <a
            href="#contato"
            className="mono hidden border border-white/40 px-4 py-2 text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 hover:bg-white hover:text-black md:block"
          >
            {t.nav.cta}
          </a>
        </div>
      </nav>
    </header>
  )
}
