'use server';

import projectService from '@/services/project.service';

export default async function findProjects() {
  const projects = projectService.search();

  return projects;
}
