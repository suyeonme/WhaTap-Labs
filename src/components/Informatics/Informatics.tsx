import useFetch from 'src/hooks/useFetch';
import { Endpoints, Data } from 'src/types/types';

interface InformaticsProps {
  endpoints: Endpoints;
  title: string;
}

function Informatics({ endpoints, title }: InformaticsProps) {
  const [data, loading, error] = useFetch(endpoints);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <h1>{title}</h1>
      {data.map((d: Data) => (
        <p key={d.name}>
          {d.name} {d.data}
        </p>
      ))}
    </div>
  );
}

export default Informatics;
