import type { InterestIconName } from './types'

// Hobby icons as plain shape data, so the same drawing feeds both the web
// (components/InterestIcon.tsx, SVG) and the PDF (pdf/CvDocument.tsx, react-pdf).
// 24×24 viewBox, stroked, no fill. plane / bike / wrench follow Lucide's (ISC);
// the rest are drawn to match.
export type Shape = { d: string } | { cx: number; cy: number; r: number }

export const interestIcons: Record<InterestIconName, Shape[]> = {
  parachute: [
    { d: 'M3 10a9 7 0 0 1 18 0' },
    { d: 'M3 10c1.5-1 3-1 4.5 0 1.5-1 3-1 4.5 0 1.5-1 3-1 4.5 0 1.5-1 3-1 4.5 0' },
    { d: 'M3 10l8 7M21 10l-8 7M9 10.2l2.2 6.3M15 10.2l-2.2 6.3' },
    { cx: 12, cy: 19.5, r: 1.8 },
  ],
  plane: [
    {
      d: 'M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z',
    },
  ],
  diver: [
    { d: 'M4 10h16a1 1 0 0 1 1 1v4a3 3 0 0 1-3 3h-2.5L14 16h-4l-1.5 2H6a3 3 0 0 1-3-3v-4a1 1 0 0 1 1-1z' },
    { d: 'M12 10v6' },
    { d: 'M3 12.5H2M21 12.5h1' },
    { cx: 16.5, cy: 6.5, r: 1 },
    { cx: 19, cy: 3.5, r: 0.6 },
  ],
  bike: [
    { cx: 18.5, cy: 17.5, r: 3.5 },
    { cx: 5.5, cy: 17.5, r: 3.5 },
    { cx: 15, cy: 5, r: 1 },
    { d: 'M12 17.5V14l-3-3 4-3 2 3h2' },
  ],
  printer3d: [
    { d: 'M4 21V3h16v18M2.5 21h19' },
    { d: 'M4 7.5h16' },
    { d: 'M10.5 7.5v3h3v-3M12 10.5V12' },
    { d: 'M8 21v-2.5h8V21M9.5 18.5v-2h5v2' },
  ],
  wrench: [
    {
      d: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
    },
  ],
}
