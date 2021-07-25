import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'antd';
import PageLayout from 'components/PageLayout';
import { SERVICES } from 'constants/index';
import { Icon } from './style';

const HomePage = ({ history }) => {
  const goTo = path => () => {
    history?.push?.(path);
  };

  return (
    <PageLayout title="首頁">
      <Row gutter={[16, 16]}>
        {SERVICES?.map?.(service => (
          <Col
            key={service?.name}
            sm={24}
            md={12}
            lg={8}
            xl={6}
            xxl={4}
            onClick={goTo(service?.path)}
          >
            <Card hoverable>
              <Card.Meta
                avatar={<Icon src={service?.icon} />}
                title={service?.name}
                description={service?.description}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </PageLayout>
  );
};

HomePage.propTypes = {
  history: PropTypes.object,
};

export default HomePage;
