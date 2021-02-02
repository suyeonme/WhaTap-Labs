import useFetch from '../../hooks/useFetch';

function Informatics({ endpoints, title }) {
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
      {data.map(d => (
        <p key={d.name}>
          {d.name}: {d.data}
        </p>
      ))}
    </div>
  );
}

export default Informatics;
