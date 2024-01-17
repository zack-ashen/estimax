import getProperty from '../actions/getProperty';

interface PropertyPageProps {
  params: {
    id: string;
  };
}

export default function PropertyDetailsPage({
  params: { id },
}: PropertyPageProps) {
  const property = getProperty(id);

  return <>details</>;
}
