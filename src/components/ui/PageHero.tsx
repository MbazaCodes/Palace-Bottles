import Link from "next/link";
import Bottle3D from "./Bottle3D";

export default function PageHero({ title, subtitle, crumbs }: {
  title: string; subtitle: string; crumbs: [string, string][];
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-ice via-frost to-ice">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-10">
        <div>
          <nav aria-label="Breadcrumb" className="text-xs text-navy/55">
            {crumbs.map(([t, h], i) => (
              <span key={t}>
                {i > 0 && <span className="mx-1.5">›</span>}
                <Link href={h} className={i === crumbs.length - 1 ? "font-semibold text-royal" : "hover:text-navy"}>{t}</Link>
              </span>
            ))}
          </nav>
          <h1 className="mt-2 font-display text-3xl font-extrabold text-navy sm:text-4xl">{title}</h1>
          <p className="mt-2 max-w-md text-sm text-navy/65">{subtitle}</p>
        </div>
        <div className="hidden gap-2 md:flex" aria-hidden>
          <div className="w-16 animate-float" style={{ "--tilt": "-6deg" } as React.CSSProperties}><Bottle3D body="#16181d" accent="#3a3f4a" shape="flask" label={false} /></div>
          <div className="w-16 animate-float-rev"><Bottle3D body="#2563eb" accent="#60a5fa" shape="bottle" label={false} /></div>
          <div className="w-16 animate-float-slow" style={{ "--tilt": "6deg" } as React.CSSProperties}><Bottle3D body="#16181d" accent="#475569" shape="tumbler" label={false} /></div>
        </div>
      </div>
    </section>
  );
}
