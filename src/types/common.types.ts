import { Role } from '.';
export interface ClerkAPIError {
  code: string;
  message: string;
  longMessage?: string;
  meta?: {
    paramName?: string;
    sessionId?: string;
    emailAddresses?: string[];
    identifiers?: string[];
    zxcvbn?: {
      suggestions: {
        code: string;
        message: string;
      }[];
    };
    permissions?: string[];
  };
}

export interface SessionPublicMetadata {
  role?: Role;
  onboarding?: 'complete';
}

export enum ServicesOptions {
  GENERAL_CONTRACTOR = 'General Contractor',
  HANDYMAN = 'Handyman Services',
  HOME_CLEANING = 'Home Cleaning',
  CARPENTRY = 'Carpentry',
  ELECTRICIAN = 'Electrician',
  PLUMBING = 'Plumbing',
  EXTERMINATOR = 'Exterminator',
  LANDSCAPING = 'Landscaping',
  PAINTING = 'Painting',
  ROOFING = 'Roofing',
  FENCING = 'Fencing',
  TV_MOUNTING = 'TV Mounting',
  FURNITURE_ASSEMBLY = 'Furniture Assembly',
}
