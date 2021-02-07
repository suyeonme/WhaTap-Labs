import styled from 'styled-components';

export const OuterGroup = styled.g<{ left: number }>`
  transform: ${({ left }) => `translateX(${left}px)`};
`;

export const GroupAxis = styled.g`
  line {
    fill: none;
    stroke: none;
  }
`;
