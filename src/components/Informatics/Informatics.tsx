import styled from 'styled-components';

import useFetch from 'hooks/useFetch';
import { Endpoints, Data } from 'types/types';

interface InformaticsProps {
  endpoints: Endpoints;
  title: string;
}

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Item = styled.li`
  margin: 4rem 0;

  span {
    font-weight: 700;
    font-size: 2rem;
    margin-left: 1rem;
  }
`;

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
      <h2>{title}</h2>
      <List>
        {data.map((d: Data) => (
          <Item key={d.name}>
            {d.name} <span>{d.data}</span>
          </Item>
        ))}
      </List>
    </div>
  );
}

export default Informatics;
