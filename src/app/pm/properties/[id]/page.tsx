import ProjectCard from '@/app/components/Cards/ProjectCard/ProjectCard';
import getProperty from './actions/getProperty';

interface PropertyPageProps {
  params: {
    id: string;
  };
}

export default async function PropertyPage({
  params: { id },
}: PropertyPageProps) {
  const property = await getProperty(id);

  return (
    <div>
      {property.projects.map((project, idx) => {
        return typeof project !== 'string' ? (
          <ProjectCard key={idx} project={project} />
        ) : (
          <ProjectCard key={idx} id={project} />
        );
      })}
    </div>
  );
}
