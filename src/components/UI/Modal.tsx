import React from 'react';
import styled from 'styled-components';
import useClickOutside from 'hooks/useClickOutside';

const Wrapper = styled.div`
  position: absolute;
  width: 25rem;
  height: 25rem;
  background-color: white;
  border-radius: 5px;
  color: black;
  left: 10rem;
  top: 7rem;
`;

const Title = styled.h3`
  font-size: 1.7rem;
  font-weight: 300;
  text-align: center;
  text-transform: uppercase;
  color: grey;
  border-bottom: 1px solid #eeeeee;
  padding: 1rem 0;
  margin: 0;
`;

const Content = styled.div`
  font-size: 1.2rem;
  line-height: 1.5;
  padding: 1.5rem;
`;

interface ModalnProps {
  title: string;
  children?: React.ReactNode;
  onClick: () => void;
}

function Modal({ title, children, onClick }: ModalnProps) {
  const ref = useClickOutside(onClick);

  return (
    <Wrapper ref={ref}>
      <Title>{title}</Title>
      <Content>
        <p>{children}</p>
      </Content>
    </Wrapper>
  );
}

export default React.memo(Modal);
