import Image from "next/image";
import { brand } from "@/lib/brand";

type LogoProps = {
  /** Full stacked wordmark vs silhouette only */
  mark?: boolean;
  className?: string;
  priority?: boolean;
};

export function Logo({ mark = false, className, priority = false }: LogoProps) {
  if (mark) {
    return (
      <Image
        src="/brand/rhino-mark.png"
        alt=""
        width={196}
        height={114}
        className={className ?? "h-10 w-auto"}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src="/brand/rhino-logo.png"
      alt={brand.name}
      width={246}
      height={207}
      className={className ?? "h-12 w-auto sm:h-14"}
      priority={priority}
    />
  );
}
