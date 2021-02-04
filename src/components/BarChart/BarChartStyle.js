import styled from 'styled-components';

export const Group = styled.g`
  transform: ${({ left }) => `translateX(${left}px)`};
`;

export const Tick = styled.g`
  line {
    fill: none;
    stroke: none;
  }
`;
