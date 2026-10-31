import { stagger } from "./Reveal";

export type Stat = { figure: string; label: string };

/** A row of big figures with mono labels, split by hairlines. Counts come from data, never typed in. */
export default function StatStrip({ stats, className = "" }: { stats: Stat[]; className?: string }) {
  return (
    <ul className={`stat-strip ${className}`.trim()}>
      {stats.map((stat, index) => (
        <li key={stat.label} data-animate="" style={stagger(index)}>
          <span className="stat-strip__figure">{stat.figure}</span>
          <span className="stat-strip__label mono">{stat.label}</span>
        </li>
      ))}
    </ul>
  );
}
