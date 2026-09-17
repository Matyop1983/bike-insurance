import Image from "next/image";
import { brand } from "@/lib/brand";

const assets = {
  /** Cleaned stacked wordmark, transparent — for light headers. */
  lockup: {
    src: "/brand/rhino-logo.png",
    width: 1000,
    height: 854,
  },
  /** Same stacked mark on black — for dark footer/hero if a plate is useful. */
  onDark: {
    src: "/brand/rhino-logo-on-black.png",
    width: 1000,
    height: 854,
  },
  /** Rhino silhouette crop (no wordmark). */
  mark: {
    src: "/brand/rhino-mark.png",
    width: 939,
    height: 532,
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
