import styled, { createGlobalStyle } from 'styled-components';

interface LayoutProps {
  children: React.ReactNode;
}

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    width: 100%;
    height: 100%;
  }

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

    @media (max-width: 568px) {
      ${'' /* 7px = 1rem */}
      font-size: 43.75%; 
    }
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    background-color: #182E36;
    color: white;
  }

  h1, h2 {
    text-transform: uppercase;
  }

  h2, text {
    font-weight: 300;
  }

  h2 {
    font-size: 3rem;
    letter-spacing: 1px;
  }

  ul {
    list-style: none;
  }

  text, li {
    font-size: 1.7rem;
  }

  text {
    fill: white;
  }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  height: auto;
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

  @media (max-width: 568px) {
    padding: 5rem 0 2rem 0;
  }
`;

const Content = styled.div`
  height: auto;
`;

const Footer = styled.footer`
  font-size: 1.4rem;
  font-weight: 300;
  text-align: center;
  color: #385a64;
  margin-top: auto;
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
