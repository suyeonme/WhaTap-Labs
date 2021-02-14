import styled from 'styled-components';

export const Placeholder = styled.span`
  font-size: 1.7rem;
  letter-spacing: 2px;
`;

export const ChartWrapper = styled.div`
  width: 500px;
  overflow-x: scroll;

  @media (max-width: 1024px) {
    &:not(:last-child) {
      margin-bottom: 5rem;
    }
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;

export const Chart = styled.div`
  overflow: hidden;

  @media (max-width: 1024px) {
    display: inline-flex;
  }

  svg {
    display: inline-table;
  }
`;

export const ChartTitle = styled.h2`
  display: flex;
  justify-content: center;
  text-align: center;
`;
