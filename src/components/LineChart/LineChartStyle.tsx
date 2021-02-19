import styled from 'styled-components';

export const OuterGroup = styled.g<{ left: number; top: number }>`
  transform: ${({ left, top }) => `translate(${left}px, ${top}px)`};
`;

export const LinePath = styled.g`
  path {
    fill: none;
    stroke: #ec008b;
    stroke-width: 2px;
    stroke-linecap: round;
  }
`;

export const Axis = styled.g<{ axisType: string; innerHeight: number }>`  
  transform: ${({ axisType, innerHeight }) =>
    axisType === 'xAxis' && `translateY(${innerHeight}px)`}};

  text {
    font-size: 1rem;
  }

  line {
    fill: none;
    stroke: none;
  }
`;

export const Indicator = styled.g`
  line {
    stroke: #9d9d9d;
  }

  rect {
    fill: none;
    pointer-events: all;
  }
`;
