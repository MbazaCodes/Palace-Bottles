import type { Product } from "@/data/products";

/**
 * Bottle3D — pure-CSS "3D" product render.
 * Layered gradients simulate cylindrical shading + glass highlights so the
 * site ships with premium visuals before real photography is uploaded.
 * Swap with <Image> product photos later without touching layout.
 */
export default function Bottle3D({
  body,
  accent,
  shape,
  className = "",
  label = true,
}: {
  body: string;
  accent: string;
  shape: Product["visual"]["shape"];
  className?: string;
  label?: boolean;
}) {
  const cyl = (c: string) =>
    `linear-gradient(90deg, color-mix(in srgb, ${c} 55%, black) 0%, ${c} 22%, color-mix(in srgb, ${c} 60%, white) 38%, ${c} 55%, color-mix(in srgb, ${c} 70%, black) 100%)`;

  const highlight = (
    <span
      aria-hidden
      className="absolute left-[16%] top-[6%] h-[80%] w-[10%] rounded-full opacity-70"
      style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.05) 70%)", filter: "blur(1px)" }}
    />
  );

  const brand = label && (
    <span
      aria-hidden
      className="absolute left-1/2 top-[42%] -translate-x-1/2 rounded-sm px-1.5 py-0.5 text-center font-display text-[7px] font-bold uppercase tracking-wider"
      style={{
        color: ["#eef0f4", "#dceeff", "#cdd3dd"].includes(body) ? "#102a6b" : "rgba(255,255,255,0.92)",
        border: `1px solid ${["#eef0f4", "#dceeff", "#cdd3dd"].includes(body) ? "rgba(16,42,107,0.4)" : "rgba(255,255,255,0.5)"}`,
      }}
    >
      Palace
      <br />
      Bottles
    </span>
  );

  if (shape === "tumbler") {
    return (
      <div className={`relative aspect-[3/4] ${className}`} role="img" aria-label="Palace Bottles tumbler">
        {/* lid */}
        <div className="absolute left-[24%] top-[6%] h-[8%] w-[46%] rounded-t-xl" style={{ background: cyl(accent) }} />
        <div className="absolute left-[40%] top-[2%] h-[5%] w-[14%] rounded-t-md" style={{ background: cyl(body) }} />
        {/* body tapered */}
        <div className="absolute left-[22%] top-[13%] h-[78%] w-[50%] [clip-path:polygon(0%_0%,100%_0%,88%_100%,12%_100%)] rounded-b-2xl" style={{ background: cyl(body) }}>
          {highlight}
          {brand}
        </div>
        {/* handle */}
        <div
          className="absolute right-[8%] top-[24%] h-[42%] w-[18%] rounded-r-3xl border-[10px] border-l-0"
          style={{ borderColor: `color-mix(in srgb, ${body} 80%, black)` }}
        />
      </div>
    );
  }

  if (shape === "sport") {
    return (
      <div className={`relative aspect-[3/4] ${className}`} role="img" aria-label="Palace Bottles sport bottle">
        <div className="absolute left-[40%] top-[2%] h-[6%] w-[20%] rounded-md" style={{ background: cyl("#16181d") }} />
        {/* strap */}
        <div className="absolute left-[58%] top-[4%] h-[10%] w-[16%] rounded-full border-4" style={{ borderColor: accent }} />
        <div className="absolute left-[30%] top-[8%] h-[6%] w-[40%] rounded-t-2xl" style={{ background: cyl(accent) }} />
        <div className="absolute left-[26%] top-[14%] h-[80%] w-[48%] rounded-[1.4rem]" style={{ background: cyl(body) }}>
          {highlight}
          {brand}
        </div>
      </div>
    );
  }

  if (shape === "kids") {
    return (
      <div className={`relative aspect-[3/4] ${className}`} role="img" aria-label="Palace Bottles kids bottle">
        <div className="absolute left-[36%] top-[3%] h-[7%] w-[28%] rounded-t-xl" style={{ background: cyl(accent) }} />
        <div className="absolute left-[60%] top-[1%] h-[6%] w-[5%] rounded-full" style={{ background: cyl("#ffffff") }} />
        <div className="absolute left-[28%] top-[10%] h-[84%] w-[44%] rounded-[1.6rem]" style={{ background: cyl(body) }}>
          {highlight}
          {/* playful dots */}
          <span aria-hidden className="absolute left-[20%] top-[18%] size-2.5 rounded-full bg-white/60" />
          <span aria-hidden className="absolute right-[22%] top-[30%] size-2 rounded-full bg-white/50" />
          <span aria-hidden className="absolute left-[30%] top-[64%] size-2 rounded-full bg-white/50" />
          <span aria-hidden className="absolute right-[26%] top-[74%] size-2.5 rounded-full bg-white/60" />
          {brand}
        </div>
        {/* strap */}
        <div className="absolute left-[12%] top-[16%] h-[60%] w-[10%] rounded-l-3xl border-[6px] border-r-0" style={{ borderColor: accent }} />
      </div>
    );
  }

  if (shape === "flask") {
    return (
      <div className={`relative aspect-[3/4] ${className}`} role="img" aria-label="Palace Bottles thermal flask">
        <div className="absolute left-[40%] top-[2%] h-[7%] w-[20%] rounded-t-lg" style={{ background: cyl("#16181d") }} />
        <div className="absolute left-[34%] top-[8%] h-[5%] w-[32%]" style={{ background: cyl(accent) }} />
        {/* shoulder */}
        <div className="absolute left-[28%] top-[12%] h-[8%] w-[44%] [clip-path:polygon(14%_0%,86%_0%,100%_100%,0%_100%)]" style={{ background: cyl(body) }} />
        <div className="absolute left-[28%] top-[19%] h-[76%] w-[44%] rounded-b-[1.2rem]" style={{ background: cyl(body) }}>
          {highlight}
          {brand}
        </div>
      </div>
    );
  }

  // default: water bottle
  return (
    <div className={`relative aspect-[3/4] ${className}`} role="img" aria-label="Palace Bottles water bottle">
      <div className="absolute left-[39%] top-[2%] h-[6%] w-[22%] rounded-md" style={{ background: cyl("#16181d") }} />
      <div className="absolute left-[33%] top-[7%] h-[6%] w-[34%] [clip-path:polygon(18%_0%,82%_0%,100%_100%,0%_100%)]" style={{ background: cyl(body) }} />
      <div className="absolute left-[29%] top-[12.5%] h-[83%] w-[42%] rounded-[1.2rem]" style={{ background: cyl(body) }}>
        {highlight}
        {brand}
      </div>
    </div>
  );
}
