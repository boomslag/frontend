import MoonLoader from 'react-spinners/MoonLoader';
import styled from 'styled-components';
import React from 'react';

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function LoadingMoon({ size, color }) {
  return (
    <LoadingWrapper>
      <MoonLoader loading color={`${color}`} size={size} />
    </LoadingWrapper>
  );
}
