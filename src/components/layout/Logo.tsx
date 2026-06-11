import Image from "next/image";

export default function Logo({ dark = false, size = "default" }: { dark?: boolean; size?: "default" | "sm" }) {
  const h = size === "sm" ? 28 : 34;
  const w = Math.round(h * (400 / 224)); // aspect ratio of logo-full.png

  return dark ? (
    /* Dark logo for light backgrounds — use the navy-bg version */
    <Image src="/logo.png" alt="Palace Bottles" width={w} height={h} className="object-contain" priority />
  ) : (
    /* White logo for dark backgrounds — transparent PNG */
    <Image src="/logo-full.png" alt="Palace Bottles" width={w} height={h} className="object-contain" priority />
  );
}
