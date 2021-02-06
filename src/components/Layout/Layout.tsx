import styled, { createGlobalStyle } from 'styled-components';

interface LayoutProps {
  children: React.ReactNode;
}

const GlobalStyle = createGlobalStyle`
  html {
    ${'' /* 10px = 1rem */}
    font-size: 62.5%; 

    @media (max-width: 992px) {
      ${'' /* 9px = 1rem */}
      font-size: 56.25%; 
    }

    @media (max-width: 768px) {
      ${'' /* 8px = 1rem */}
      font-size: 50%; 
    }

    @media (max-width: 320px) {
      ${'' /* 7px = 1rem */}
      font-size: 43.75%; 
    }
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    background-color: #182E36;
    color: white;
  }

  h1, h2 {
    text-transform: uppercase;
  }

  h2 {
    font-size: 2.5rem;
    font-weight: 400;
  }

  text, li {
    font-size: 1.7rem;
  }

  text {
    fill: white;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  font-size: 3rem;
  text-align: center;
  font-weight: 700;
  text-transform: uppercase;
`;

const Title = styled.p`
  margin: 0;
  padding: 8rem 0;
`;

const Content = styled.div`
  height: auto;
  max-height: 100vh;
`;

const Footer = styled.footer`
  text-align: center;
  font-size: 1.2rem;
  margin-top: auto;
  color: #385a64;
`;

function Layout({ children }: LayoutProps) {
  return (
    <Wrapper>
      <GlobalStyle />
      <Header>
        <Title>WhaTap Dashboard</Title>
      </Header>
      <Content>{children}</Content>
      <Footer>
        <p>WHATAP LABS ASSIGNMENT BY SUYEON KANG</p>
      </Footer>
    </Wrapper>
  );
}

export default Layout;
