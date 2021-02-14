import styled from 'styled-components';
import { SpotData, DataState } from 'types/types';
import { ChartWrapper, ChartTitle } from 'styles/styles';

interface InformaticsProps {
  title: string;
  dataObj: DataState;
}

const List = styled.ul`
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

  @media (max-width: 1024px) {
    text-align: center;
  }
`;

function Informatics({ title, dataObj }: InformaticsProps) {
  const { data } = dataObj;

  return (
    <ChartWrapper>
      <ChartTitle>{title}</ChartTitle>
      <List>
        {data.map((d: SpotData) => (
          <Item key={d.name}>
            {d.name} <span>{d.data}</span>
          </Item>
        ))}
      </List>
    </ChartWrapper>
  );
}

export default Informatics;
