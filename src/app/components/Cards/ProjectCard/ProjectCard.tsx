import { Project } from '@/types';
import Nib from '../../Nib/Nib';
import { Card } from '../Base';
import getProject from './actions/getProjects';

type ProjectCardProps =
  | {
      id: string;
      project?: never;
    }
  | {
      id?: never;
      project: Project;
    };

async function ProjectCard({ id, project }: ProjectCardProps) {
  if (id) {
    project = await getProject(id);
  }

  return project ? (
    <Card
      className="flex w-[22rem] flex-row items-start justify-between p-5"
      navigateTo={`/pm/projects/${project.id}`}
      clickable
    >
      <div>
        <p className="mb-1 font-semibold">{project.name}</p>
        <div className="align-baseline">
          <p className="text-xs text-medium-grey">placeholder</p>
          <p className="text-xs text-medium-grey">placeholder</p>
        </div>
      </div>
      <div>
        <Nib text={'Placeholder'} />
      </div>
    </Card>
  ) : (
    <>Loading</>
  );
}

export default ProjectCard;
