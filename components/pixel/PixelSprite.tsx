import type { CSSProperties, ReactNode } from "react";
import { PALETTE, type PixelMap } from "./sprites";

type Palette = Record<string, string>;

/**
 * Renders the rects for a pixel map. Can be used standalone inside
 * <PixelSprite> or nested inside a larger <svg> (e.g. the quest map)
 * wrapped in a <g transform="...">.
 */
export function PixelRects({
  map,
  palette = PALETTE,
}: {
  map: PixelMap;
  palette?: Palette;
}) {
  const rects: ReactNode[] = [];
  map.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const ch = row[x];
      if (ch === "." || ch === " ") continue;
      const fill = palette[ch];
      if (!fill) continue;
      // 1.06 width/height avoids hairline seams between pixels
      rects.push(
        <rect key={`${y}-${x}`} x={x} y={y} width={1.06} height={1.06} fill={fill} />
      );
    }
  });
  return <>{rects}</>;
}

type PixelSpriteProps = {
  map: PixelMap;
  /** pixel size multiplier — 3 = each map cell becomes 3px */
  scale?: number;
  className?: string;
  style?: CSSProperties;
  label?: string;
  palette?: Palette;
};

export default function PixelSprite({
  map,
  scale = 3,
  className,
  style,
  label,
  palette,
}: PixelSpriteProps) {
  const w = Math.max(...map.map((r) => r.length));
  const h = map.length;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w * scale}
      height={h * scale}
      shapeRendering="crispEdges"
      className={className}
      style={style}
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <PixelRects map={map} palette={palette} />
    </svg>
  );
}
