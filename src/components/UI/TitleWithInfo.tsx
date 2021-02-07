import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import icon from 'assets/info.svg';
import Modal from 'components/UI/Modal';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Icon = styled.div`
  cursor: pointer;
  margin-left: 1.5rem;
`;

interface InformationProps {
  title: string;
  modalContent: string;
}

function Information({ title, modalContent }: InformationProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleShow = (): void => setIsClicked(true);
  const handleHide = useCallback((): void => setIsClicked(false), []);

  return (
    <>
      <Wrapper>
        <h2>{title}</h2>
        <Icon onClick={handleShow}>
          <img src={icon} alt="부가 정보" />
        </Icon>
        {isClicked && (
          <Modal title={title} onClick={handleHide}>
            {modalContent}
          </Modal>
        )}
      </Wrapper>
    </>
  );
}

export default React.memo(Information);
