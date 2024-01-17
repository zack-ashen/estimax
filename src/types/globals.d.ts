import { Role } from '.';
export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: typeof Role;
      onboarding?: boolean;
    };
  }
}
