import ProjectCard from '@/app/components/Cards/ProjectCard/ProjectCard';
import Divider from '@/app/components/Divider/Divider';
import ProjectFilterBar from '@/app/components/FilterBar/ProjectFilterBar/ProjectFilterBar';
import findProjects from './actions/findProjects';

export default async function FindProjectsPage() {
  const projects = await findProjects();

  return (
    <>
      <p className="SectionHeader">Find Projects</p>
      <Divider className="mb-5 mt-3" />

      <ProjectFilterBar />

      <div className="mt-7">
        {projects.map((project, idx) => (
          <ProjectCard project={project} key={idx} />
        ))}
      </div>
    </>
  );
}
