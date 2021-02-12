import styled from 'styled-components';

import { Endpoints, Data } from 'types/types';
import useFetch from 'hooks/useFetch';
import { Placeholder } from 'styles/styles';

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
  margin: 2rem 0;

  span {
    font-size: 3.5rem;
    font-weight: 100;
    margin-left: 1rem;
    opacity: 0.7;
  }
`;

function Informatics({ endpoints, title }: InformaticsProps) {
  // const [data, loading, error] = useFetch(endpoints);

  // if (error) {
  //   return <Placeholder>Error: {error}</Placeholder>;
  // }

  // if (loading) {
  //   return <Placeholder>loading...</Placeholder>;
  // }

  return (
    <div>
      <h2>{title}</h2>
      {/* <List>
        {data.map((d: Data) => (
          <Item key={d.name}>
            {d.name} <span>{d.data}</span>
          </Item>
        ))}
      </List> */}
    </div>
  );
}

export default Informatics;
