import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from 'antd';
import { Container, Header, Body } from './style';

const PageLayout = ({ children, ...props }) => (
  <Container>
    <Header>
      <PageHeader {...props} />
    </Header>

    <Body>{children}</Body>
  </Container>
);

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default PageLayout;
