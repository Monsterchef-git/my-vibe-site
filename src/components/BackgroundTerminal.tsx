import MonoToken from '@/components/MonoToken';

const LOG_BLOCKS = [
  {
    command: 'git push origin codex/stitch-surface',
    status: 'SUCCESS',
    detail: 'deploy/preview created in 642ms',
  },
  {
    command: 'vercel deploy --prebuilt',
    status: 'DEPLOYED',
    detail: 'edge cache warm for Medellin / Bogota route',
  },
  {
    command: 'GET /api/recipe/picanha/dry-aged',
    status: 'SEARED',
    detail: 'fireline synchronized with pass window',
  },
  {
    command: 'pnpm run optimize:landing',
    status: 'OPTIMIZED',
    detail: 'hero contrast locked for iSolution and TecnicalApp',
  },
  {
    command: 'git fetch origin main',
    status: 'SYNCED',
    detail: 'branch health green // no drift detected',
  },
  {
    command: 'POST /service/private-dining/menu-v2',
    status: 'PLATED',
    detail: 'local produce indexed for El Retiro / Medellin',
  },
];

function TerminalBlock() {
  return (
    <div className="background-terminal-block font-mono text-[10px] uppercase tracking-[0.28em] md:text-[11px]">
      {LOG_BLOCKS.map((log) => (
        <div key={`${log.command}-${log.status}`} className="space-y-1">
          <p>
            <span className="text-zinc-500">$ </span>
            <span>{log.command}</span>
          </p>
          <p className="pl-4">
            <span className="text-zinc-500">status=</span>
            <MonoToken kind="status">{log.status}</MonoToken>
          </p>
          <p className="pl-4">
            <span className="text-zinc-500">{'// '}</span>
            <span>{log.detail.split(/(Medellin|Bogota|El Retiro|iSolution|TecnicalApp)/g).map((segment, index) => {
              if (segment === 'Medellin' || segment === 'Bogota' || segment === 'El Retiro') {
                return <MonoToken key={`${segment}-${index}`} kind="location">{segment}</MonoToken>;
              }

              if (segment === 'iSolution' || segment === 'TecnicalApp') {
                return <MonoToken key={`${segment}-${index}`} kind="project">{segment}</MonoToken>;
              }

              return <span key={`${segment}-${index}`}>{segment}</span>;
            })}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default function BackgroundTerminal() {
  return (
    <div aria-hidden="true" className="background-terminal-shell">
      <div className="background-terminal-column left-[-6%] top-[-12%] h-[160%] w-[52%] -rotate-[8deg]">
        <div className="background-terminal-track" style={{ animationDuration: '42s' }}>
          <TerminalBlock />
          <TerminalBlock />
        </div>
      </div>

      <div className="background-terminal-column right-[-4%] top-[-18%] h-[180%] w-[46%] rotate-[7deg]">
        <div className="background-terminal-track" style={{ animationDuration: '56s' }}>
          <TerminalBlock />
          <TerminalBlock />
        </div>
      </div>
    </div>
  );
}
