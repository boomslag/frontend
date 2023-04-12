import styled from 'styled-components';
// eslint-disable-next-line
export const Container = styled.header`
  background-color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  border-bottom: 1px solid;
  width: 100%;
  z-index: 30;
  overflow-y: visible;

  @media (min-width: 1024px) {
    overflow-y: visible;
  }

  &.dark {
    border-color: #4b5563;
    background-color: #1f2937;
  }

  &.dark .dark {
    background-color: #1e1e1e;
  }
`;
