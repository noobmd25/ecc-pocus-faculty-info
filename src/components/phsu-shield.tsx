import { useId } from "react";

/**
 * The PHSU shield mark from the design system. Colours track the active
 * sub-brand theme: the left half is the school colour (primary-500), the
 * right half the institutional Deep Teal (secondary-800).
 */
export function PhsuShield({
  size = 28,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const clipId = useId();
  return (
    <svg
      width={size}
      height={size * 1.16}
      viewBox="0 0 100 116"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M2 2h96v66L50 114 2 68V2Z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect x="0" y="0" width="50" height="116" className="fill-primary-500" />
        <rect x="50" y="0" width="50" height="116" className="fill-secondary-800" />
        <path d="M50 0 L100 0 L100 30 L50 62 Z" className="fill-primary-600" opacity=".55" />
        <path d="M0 74 L50 42 L50 116 L0 116 Z" className="fill-secondary-900" opacity=".35" />
        <g stroke="#fff" strokeWidth="3.2" strokeLinecap="round" opacity=".92">
          <path d="M24 40 L50 26 L76 40" />
          <path d="M24 58 L50 44 L76 58" />
          <path d="M50 62 L50 88" />
        </g>
      </g>
      <path
        d="M2 2h96v66L50 114 2 68V2Z"
        className="stroke-secondary-900"
        strokeWidth="2.6"
        fill="none"
        opacity=".25"
      />
    </svg>
  );
}
