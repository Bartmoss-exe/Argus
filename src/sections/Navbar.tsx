export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <nav className="flex items-center justify-between px-6 py-5 text-white md:px-10">
        <a href="#" className="flex items-baseline gap-2">
          <span className="text-lg font-bold tracking-tight">ARGUS</span>
          <span className="mono text-[10px] uppercase tracking-[0.3em] text-[#ff2e2e]">Red Team</span>
        </a>
        <div className="mono hidden items-center gap-8 text-[11px] uppercase tracking-[0.25em] md:flex">
          <a href="#operacao" className="opacity-60 transition-opacity duration-300 hover:opacity-100">Operação</a>
          <a href="#capacidades" className="opacity-60 transition-opacity duration-300 hover:opacity-100">Capacidades</a>
          <a href="#contato" className="opacity-60 transition-opacity duration-300 hover:opacity-100">Contato</a>
        </div>
        <a
          href="#contato"
          className="mono border border-white/40 px-4 py-2 text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 hover:bg-white hover:text-black"
        >
          Iniciar operação
        </a>
      </nav>
    </header>
  )
}
