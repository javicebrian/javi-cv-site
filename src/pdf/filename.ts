import { cv } from '../content/cv'

/** Public file name of the generated CV, e.g. `Javi-Cebrian-CV.pdf`. */
export const cvFileName = () =>
  `${cv.name.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '-')}-CV.pdf`
