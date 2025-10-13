
import React from 'react';
import SysLoadingStyles from './SysLoadingStyles';

const { Container, Spinner } = SysLoadingStyles;

interface LoadingProps {
  fullScreen?: boolean;
}

export function Loading({ fullScreen = false }: LoadingProps) {
  return (
    <Container fullScreen={fullScreen}>
      <Spinner />
    </Container>
  );
}