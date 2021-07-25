import React from 'react';
import { Spin, Typography } from 'antd';
import { Container } from './style';

const LoadingView = () => (
  <Container>
    <Spin size="large" />
    <Typography.Text>載入中...</Typography.Text>
  </Container>
);

export default LoadingView;
