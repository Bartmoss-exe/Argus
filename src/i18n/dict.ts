export type Lang = 'en' | 'es' | 'pt' | 'fr'

export interface Phase {
  index: string
  title: string
  desc: string
  log: string
}

export interface ServiceItem {
  n: string
  name: string
  tags: string
}

export interface Translation {
  nav: { operation: string; capabilities: string; contact: string; cta: string }
  hero: {
    badge: string
    line1: string
    line2: string
    sub: string
    location: string
    scroll: string
  }
  operation: { heading: string; live: string; phases: Phase[] }
  manifesto: { label: string; text: string }
  services: { title: string; meta: string; items: ServiceItem[] }
  stats: { labels: string[] }
  contact: {
    label: string
    line1: string
    line2a: string
    line2hl: string
    line2suffix: string
    cta: string
    note: string
    footer: string
    tagline: string
  }
}

export const LANGS: Lang[] = ['en', 'es', 'pt', 'fr']

export const dict: Record<Lang, Translation> = {
  en: {
    nav: { operation: 'Operation', capabilities: 'Capabilities', contact: 'Contact', cta: 'Start operation' },
    hero: {
      badge: 'Argus Pentest // offensive security — est. 2016',
      line1: 'WE STRIKE',
      line2: 'FIRST.',
      sub: 'Pentest, red team and adversary emulation for companies that cannot afford to fail. We find the attacker\u2019s path — before the attacker.',
      location: 'Europe — Global',
      scroll: 'Scroll to infiltrate ↓',
    },
    operation: {
      heading: 'The operation',
      live: 'live feed',
      phases: [
        {
          index: '01',
          title: 'RECON',
          desc: 'We map your attack surface like a real adversary: OSINT, infrastructure enumeration, full footprint — before someone does it for you.',
          log: '> nmap -sS --top-ports 1000 target.corp … 14 open ports',
        },
        {
          index: '02',
          title: 'EXPLOITATION',
          desc: 'No off-the-shelf scanners. Custom exploit engineering, manual attack chains and modern defense bypass — EDR, WAF, MFA.',
          log: '> exploit/multi/handler → session opened on 10.0.4.17',
        },
        {
          index: '03',
          title: 'ESCALATION',
          desc: 'From a single foothold to full domain control: lateral movement, privilege escalation and persistence — documenting every hop of the chain.',
          log: '> getsystem … NT AUTHORITY\\SYSTEM — domain compromised',
        },
        {
          index: '04',
          title: 'REPORT',
          desc: 'Every finding with reproducible evidence, business impact and an actionable remediation plan. Then we retest for free until it is closed.',
          log: '> report.pdf — 47 findings, 12 critical, 0 false positives',
        },
      ],
    },
    manifesto: {
      label: '// Doctrine',
      text: 'A firewall won\u2019t stop a determined adversary. Compliance won\u2019t stop an exploit. We attack your organization first — with authorization, methodology and surgical precision — so your defense is proven in combat, not on paper.',
    },
    services: {
      title: 'CAPABILITIES',
      meta: '[ 05 attack vectors ]',
      items: [
        { n: '01', name: 'Web & API Pentest', tags: 'OWASP · API · Business Logic' },
        { n: '02', name: 'Red Team Operations', tags: 'Adversary Emulation · C2 · EDR Bypass' },
        { n: '03', name: 'Cloud & Active Directory', tags: 'AWS · Azure · AD · Kubernetes' },
        { n: '04', name: 'Social Engineering', tags: 'Phishing · Vishing · Physical' },
        { n: '05', name: 'Purple Team', tags: 'Detection · MITRE ATT&CK · SOC' },
      ],
    },
    stats: {
      labels: [
        'Offensive operations completed',
        'CVEs published by the team',
        'Avg. time to first critical',
        'Client data breaches',
      ],
    },
    contact: {
      label: '// Secure channel open',
      line1: 'READY TO',
      line2a: 'BE',
      line2hl: 'TESTED',
      line2suffix: '?',
      cta: 'Start operation',
      note: 'contato@arguspentest.com — PGP available · reply within 24h',
      footer: '© 2026 ARGUS PENTEST — argusredteam.vercel.app',
      tagline: 'We strike first.',
    },
  },

  es: {
    nav: { operation: 'Operación', capabilities: 'Capacidades', contact: 'Contacto', cta: 'Iniciar operación' },
    hero: {
      badge: 'Argus Pentest // seguridad ofensiva — est. 2016',
      line1: 'ATACAMOS',
      line2: 'PRIMERO.',
      sub: 'Pentest, red team y emulación de adversario para empresas que no pueden fallar. Encontramos el camino del atacante — antes que el atacante.',
      location: 'Europa — Global',
      scroll: 'Desliza para infiltrarte ↓',
    },
    operation: {
      heading: 'La operación',
      live: 'transmisión en vivo',
      phases: [
        {
          index: '01',
          title: 'RECON',
          desc: 'Mapeamos tu superficie de ataque como un adversario real: OSINT, enumeración de infraestructura, footprint completo — antes de que alguien lo haga por ti.',
          log: '> nmap -sS --top-ports 1000 objetivo.corp … 14 puertos abiertos',
        },
        {
          index: '02',
          title: 'EXPLOTACIÓN',
          desc: 'Nada de escáneres de estantería. Ingeniería de exploits a medida, cadenas de ataque manuales y bypass de defensas modernas — EDR, WAF, MFA.',
          log: '> exploit/multi/handler → sesión abierta en 10.0.4.17',
        },
        {
          index: '03',
          title: 'ESCALADA',
          desc: 'De un único foothold al dominio total: movimiento lateral, escalada de privilegios y persistencia — documentando cada salto de la cadena.',
          log: '> getsystem … NT AUTHORITY\\SYSTEM — dominio comprometido',
        },
        {
          index: '04',
          title: 'INFORME',
          desc: 'Cada hallazgo con evidencia reproducible, impacto de negocio y plan de remediación accionable. Después, retesteamos gratis hasta cerrar.',
          log: '> report.pdf — 47 hallazgos, 12 críticos, 0 falsos positivos',
        },
      ],
    },
    manifesto: {
      label: '// Doctrina',
      text: 'Un firewall no detiene a un adversario decidido. El compliance no detiene un exploit. Atacamos tu organización primero — con autorización, metodología y precisión quirúrgica — para que tu defensa se pruebe en combate, no en el papel.',
    },
    services: {
      title: 'CAPACIDADES',
      meta: '[ 05 vectores de ataque ]',
      items: [
        { n: '01', name: 'Web & API Pentest', tags: 'OWASP · API · Business Logic' },
        { n: '02', name: 'Operaciones Red Team', tags: 'Emulación de Adversario · C2 · EDR Bypass' },
        { n: '03', name: 'Cloud & Active Directory', tags: 'AWS · Azure · AD · Kubernetes' },
        { n: '04', name: 'Ingeniería Social', tags: 'Phishing · Vishing · Físico' },
        { n: '05', name: 'Purple Team', tags: 'Detección · MITRE ATT&CK · SOC' },
      ],
    },
    stats: {
      labels: [
        'Operaciones ofensivas completadas',
        'CVEs publicados por el equipo',
        'Tiempo medio hasta el primer crítico',
        'Brechas de datos de clientes',
      ],
    },
    contact: {
      label: '// Canal seguro abierto',
      line1: '¿LISTO PARA',
      line2a: 'SER',
      line2hl: 'PROBADO',
      line2suffix: '?',
      cta: 'Iniciar operación',
      note: 'contato@arguspentest.com — PGP disponible · respuesta en 24h',
      footer: '© 2026 ARGUS PENTEST — argusredteam.vercel.app',
      tagline: 'Atacamos primero.',
    },
  },

  pt: {
    nav: { operation: 'Operação', capabilities: 'Capacidades', contact: 'Contato', cta: 'Iniciar operação' },
    hero: {
      badge: 'Argus Pentest // segurança ofensiva — est. 2016',
      line1: 'ATACAMOS',
      line2: 'PRIMEIRO.',
      sub: 'Pentest, red team e emulação de adversário para empresas que não podem falhar. Encontramos o caminho do atacante — antes do atacante.',
      location: 'Europa — Global',
      scroll: 'Scroll para infiltrar ↓',
    },
    operation: {
      heading: 'A operação',
      live: 'feed ao vivo',
      phases: [
        {
          index: '01',
          title: 'RECON',
          desc: 'Mapeamos a sua superfície de ataque como um adversário real: OSINT, enumeração de infraestrutura, footprint completo — antes que alguém faça isso por você.',
          log: '> nmap -sS --top-ports 1000 alvo.corp … 14 portas abertas',
        },
        {
          index: '02',
          title: 'EXPLORAÇÃO',
          desc: 'Nada de scanners de prateleira. Engenharia de exploit sob medida, cadeias de ataque manuais e bypass de defesas modernas — EDR, WAF, MFA.',
          log: '> exploit/multi/handler → sessão aberta em 10.0.4.17',
        },
        {
          index: '03',
          title: 'ESCALAÇÃO',
          desc: 'De um único foothold ao domínio total: movimento lateral, escalada de privilégio e persistência — documentando cada salto da cadeia.',
          log: '> getsystem … NT AUTHORITY\\SYSTEM — domínio comprometido',
        },
        {
          index: '04',
          title: 'RELATÓRIO',
          desc: 'Cada achado com evidência reproduzível, impacto de negócio e plano de remediação acionável. Depois, retestamos de graça até fechar.',
          log: '> report.pdf — 47 achados, 12 críticos, 0 falsos positivos',
        },
      ],
    },
    manifesto: {
      label: '// Doutrina',
      text: 'Firewall não segura um adversário determinado. Compliance não detém um exploit. Nós atacamos a sua organização primeiro — com autorização, metodologia e precisão cirúrgica — para que a sua defesa seja provada em combate, não no papel.',
    },
    services: {
      title: 'CAPACIDADES',
      meta: '[ 05 vetores de ataque ]',
      items: [
        { n: '01', name: 'Web & API Pentest', tags: 'OWASP · API · Business Logic' },
        { n: '02', name: 'Operações de Red Team', tags: 'Emulação de Adversário · C2 · EDR Bypass' },
        { n: '03', name: 'Cloud & Active Directory', tags: 'AWS · Azure · AD · Kubernetes' },
        { n: '04', name: 'Engenharia Social', tags: 'Phishing · Vishing · Físico' },
        { n: '05', name: 'Purple Team', tags: 'Detecção · MITRE ATT&CK · SOC' },
      ],
    },
    stats: {
      labels: [
        'Operações ofensivas concluídas',
        'CVEs publicados pela equipe',
        'Tempo médio até o primeiro crítico',
        'Vazamentos de dados de clientes',
      ],
    },
    contact: {
      label: '// Canal seguro aberto',
      line1: 'PRONTO PARA',
      line2a: 'SER',
      line2hl: 'TESTADO',
      line2suffix: '?',
      cta: 'Iniciar operação',
      note: 'contato@arguspentest.com — PGP disponível · resposta em 24h',
      footer: '© 2026 ARGUS PENTEST — argusredteam.vercel.app',
      tagline: 'Atacamos primeiro.',
    },
  },

  fr: {
    nav: { operation: 'Opération', capabilities: 'Capacités', contact: 'Contact', cta: "Lancer l'opération" },
    hero: {
      badge: 'Argus Pentest // sécurité offensive — est. 2016',
      line1: 'NOUS FRAPPONS',
      line2: "D'ABORD.",
      sub: "Pentest, red team et émulation d'adversaire pour les entreprises qui ne peuvent pas se permettre d'échouer. Nous trouvons le chemin de l'attaquant — avant l'attaquant.",
      location: 'Europe — Global',
      scroll: 'Scrollez pour infiltrer ↓',
    },
    operation: {
      heading: "L'opération",
      live: 'flux en direct',
      phases: [
        {
          index: '01',
          title: 'RECON',
          desc: "Nous cartographions votre surface d'attaque comme un adversaire réel : OSINT, énumération d'infrastructure, empreinte complète — avant que quelqu'un ne le fasse pour vous.",
          log: '> nmap -sS --top-ports 1000 cible.corp … 14 ports ouverts',
        },
        {
          index: '02',
          title: 'EXPLOITATION',
          desc: 'Pas de scanners du commerce. Ingénierie d\u2019exploits sur mesure, chaînes d\u2019attaque manuelles et contournement des défenses modernes — EDR, WAF, MFA.',
          log: '> exploit/multi/handler → session ouverte sur 10.0.4.17',
        },
        {
          index: '03',
          title: 'ÉLÉVATION',
          desc: "D'un simple point d'appui au contrôle total du domaine : mouvement latéral, élévation de privilèges et persistance — chaque saut documenté.",
          log: '> getsystem … NT AUTHORITY\\SYSTEM — domaine compromis',
        },
        {
          index: '04',
          title: 'RAPPORT',
          desc: "Chaque faille avec preuve reproductible, impact métier et plan de remédiation actionnable. Ensuite, nous retestons gratuitement jusqu'à clôture.",
          log: '> report.pdf — 47 failles, 12 critiques, 0 faux positif',
        },
      ],
    },
    manifesto: {
      label: '// Doctrine',
      text: "Un pare-feu n'arrête pas un adversaire déterminé. La conformité n'arrête pas un exploit. Nous attaquons votre organisation en premier — avec autorisation, méthodologie et précision chirurgicale — pour que votre défense soit prouvée au combat, pas sur le papier.",
    },
    services: {
      title: 'CAPACITÉS',
      meta: "[ 05 vecteurs d'attaque ]",
      items: [
        { n: '01', name: 'Web & API Pentest', tags: 'OWASP · API · Business Logic' },
        { n: '02', name: 'Opérations Red Team', tags: "Émulation d'Adversaire · C2 · EDR Bypass" },
        { n: '03', name: 'Cloud & Active Directory', tags: 'AWS · Azure · AD · Kubernetes' },
        { n: '04', name: 'Ingénierie Sociale', tags: 'Phishing · Vishing · Physique' },
        { n: '05', name: 'Purple Team', tags: 'Détection · MITRE ATT&CK · SOC' },
      ],
    },
    stats: {
      labels: [
        'Opérations offensives menées',
        "CVE publiés par l'équipe",
        'Délai moyen avant la première critique',
        'Fuites de données clients',
      ],
    },
    contact: {
      label: '// Canal sécurisé ouvert',
      line1: 'PRÊT À',
      line2a: 'ÊTRE',
      line2hl: 'TESTÉ',
      line2suffix: ' ?',
      cta: "Lancer l'opération",
      note: 'contato@arguspentest.com — PGP disponible · réponse sous 24h',
      footer: '© 2026 ARGUS PENTEST — argusredteam.vercel.app',
      tagline: "Nous frappons d'abord.",
    },
  },
}
