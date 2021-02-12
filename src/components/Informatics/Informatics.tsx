import styled from 'styled-components';

import { SpotData, DataState } from 'types/types';
import { Placeholder } from 'styles/styles';

interface InformaticsProps {
  title: string;
  dataObj: DataState;
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

function Informatics({ title, dataObj }: InformaticsProps) {
  const { loading, error, data } = dataObj;

  if (error) {
    return <Placeholder>Error: {error}</Placeholder>;
  }

  if (loading) {
    return <Placeholder>loading...</Placeholder>;
  }

  return (
    <div>
      <h2>{title}</h2>
      <List>
        {data.map((d: SpotData) => (
          <Item key={d.name}>
            {d.name} <span>{d.data}</span>
          </Item>
        ))}
      </List>
    </div>
  );
}

export default Informatics;
