import Image from "next/image";
import { brand } from "@/lib/brand";

const assets = {
  /** Primary mark: hybrid stacked lockup, teal on transparent (no black plate). */
  lockup: {
    src: "/brand/rhino-logo.png",
    width: 656,
    height: 570,
  },
  /** Rhino silhouette crop (favicon). */
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
      className={className ?? "h-16 w-auto"}
      style={widthLed ? { height: "auto" } : { width: "auto" }}
      priority={priority}
    />
  );
}
