import Image from "next/image";
import { brand } from "@/lib/brand";

const assets = {
  horizontal: {
    src: "/brand/rhino-logo-horizontal.png",
    width: 1716,
    height: 400,
  },
  stacked: {
    src: "/brand/rhino-logo.png",
    width: 664,
    height: 488,
  },
  mark: {
    src: "/brand/rhino-mark.png",
    width: 367,
    height: 233,
  },
} as const;

type LogoProps = {
  variant?: keyof typeof assets;
  className?: string;
  priority?: boolean;
};

const defaults: Record<keyof typeof assets, string> = {
  horizontal: "h-10 w-auto sm:h-11 lg:h-12",
  stacked: "h-16 w-auto sm:h-20",
  mark: "h-10 w-auto",
};

export function Logo({
  variant = "horizontal",
  className,
  priority = false,
}: LogoProps) {
  const asset = assets[variant];
  return (
    <Image
      src={asset.src}
      alt={brand.name}
      width={asset.width}
      height={asset.height}
      className={className ?? defaults[variant]}
      priority={priority}
    />
  );
}
