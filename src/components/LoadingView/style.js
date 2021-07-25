import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;

  & > * {
    margin-top: 8px;

    &:first-child {
      margin-top: 0;
    }
  }
`;

export { Container };
