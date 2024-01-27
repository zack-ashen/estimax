import { InsertProject, SelectProject } from '@/db/schema/projects.schema';

export const ProjectStatus = {
  DRAFTED: 'Drafted',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
} as const;

export type Project = SelectProject & {
  media: string[];
};
export type NewProject = InsertProject & {
  media: string[];
};

export type VendorProject = Omit<Project, 'organization'>;
