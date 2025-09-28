import { JwtPayload } from '../api/models/interfaces/requestDTO/JwtPayload';

declare global {
  namespace Express {
    interface Request {
      user?: {
        user_id: string;
        role: string;
      } | JwtPayload;
    }
  }
}
