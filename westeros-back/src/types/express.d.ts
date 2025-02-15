import { User } from './usetType'; // Ajusta la ruta según tu estructura de proyecto


declare global {
  // eslint-disable-next-line no-unused-vars
  namespace Express {
    // eslint-disable-next-line no-unused-vars
    interface Request {
      user?: User; // Aquí defines el tipo de `user`. Puedes usar `any` si no tienes un tipo específico.
    }
  }
}