import Image from "next/image";
import { brand } from "@/lib/brand";

const assets = {
  /** Hybrid stacked lockup, transparent — light header. */
  lockup: {
    src: "/brand/rhino-logo.png",
    width: 656,
    height: 570,
  },
  /** Same stacked lockup on black — footer and dark hero. */
  onDark: {
    src: "/brand/rhino-logo-on-black.png",
    width: 656,
    height: 570,
  },
  /** Rhino silhouette crop (no wordmark). */
  mark: {
    src: "/brand/rhino-mark.png",
    width: 560,
    height: 311,
  },
} as const;

type LogoProps = {
  variant?: keyof typeof assets;
  className?: string;
  priority?: boolean;
};

export function Logo({
  variant = "lockup",
  className,
  priority = false,
}: LogoProps) {
  const asset = assets[variant];
  const widthLed = Boolean(className?.includes("w-full"));
  return (
    <Image
      src={asset.src}
      alt={brand.name}
      width={asset.width}
      height={asset.height}
      unoptimized
      className={className ?? "h-14 w-auto sm:h-16"}
      style={widthLed ? { height: "auto" } : { width: "auto" }}
      priority={priority}
    />
  );
}
