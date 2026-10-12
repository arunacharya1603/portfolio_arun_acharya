import type { LiquiGlassProps } from "@liqui-design/glass";

// Size-scaled lenses, tuned over the light portfolio backdrop.
export const controlGlass = {
  radius: 24,
  blur: 0.5,
  frost: 0.08,
  refraction: 75,
  bezel: 13,
  specular: 1,
  dispersion: 0,
  saturation: 1.35,
} satisfies Partial<LiquiGlassProps>;

export const cardGlass = {
  radius: 24,
  blur: 0.75,
  frost: 0.12,
  refraction: 135,
  bezel: 26,
  specular: 1,
  dispersion: 0,
  saturation: 1.25,
} satisfies Partial<LiquiGlassProps>;
