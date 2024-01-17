import db from '@/db';
import { projects } from '@/db/schema';
import { projectMedia } from '@/db/schema/joinTables/projectMedia.schema';
import { NewProject, Project } from '@/types';

const projectService = {
  async create(project: NewProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();

    const mediaObjs = project.media.map((media) => ({
      projectId: newProject.id,
      mediaId: media,
    }));

    if (mediaObjs.length) {
      await db.insert(projectMedia).values(mediaObjs);
    }

    return { ...newProject, media: project.media };
  },
};

export default projectService;
