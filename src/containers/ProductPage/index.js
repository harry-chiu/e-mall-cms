import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import {
  Card,
  Table,
  Space,
  Button,
  Drawer,
  Popconfirm,
  Typography,
} from 'antd';
import { PlusOutlined as AddIcon } from '@ant-design/icons';
import PageLayout from 'components/PageLayout';
import ProductForm from 'forms/ProductForm';
import { PRODUCT_FORM_TITLE_MAP } from 'constants/index';
import showMessage from 'utils/showMessage';
import { columns } from './config';

const ProductPage = ({ history }) => {
  const [update, setUpdate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [formType, setFormType] = useState('');
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const updateData = () => {
    setUpdate(new Date());
  };

  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const goToHomePage = () => {
    history?.push?.('/');
  };

  const openDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    updateData();
    setVisible(false);
  };

  const openAddForm = () => {
    setFormType('add');
    openDrawer();
  };

  const openEditForm = records => () => {
    setProduct(records);
    setFormType('edit');
    openDrawer();
  };

  const removeProduct = records => () => {
    startLoading();

    firebase
      .database()
      .ref(`/products/${records?.id}`)
      .update({})
      .then(showMessage('刪除成功', 'success'))
      .catch(showMessage('發生錯誤', 'error'))
      .finally(stopLoading);
  };

  const withActions = prevColumns => [
    ...prevColumns,
    {
      title: '功能',
      fixed: 'right',
      width: 120,
      render: (_, records) => (
        <Space size={16}>
          <Typography.Link onClick={openEditForm(records)}>
            編輯
          </Typography.Link>

          <Popconfirm onConfirm={removeProduct(records)}>
            <Typography.Link type="danger">刪除</Typography.Link>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    startLoading();

    firebase
      .database()
      .ref('/products')
      .once('value', snapshot => {
        const newProduces = Object.values(snapshot.val() || {});

        setProducts(newProduces);
      })
      .finally(stopLoading);
  }, [update]);

  return (
    <PageLayout
      title="商品管理"
      extra={
        <Button type="primary" icon={<AddIcon />} onClick={openAddForm}>
          新增
        </Button>
      }
      onBack={goToHomePage}
    >
      <Card>
        <Table
          rowKey="id"
          loading={loading}
          columns={withActions(columns)}
          dataSource={products}
          scroll={{ x: 1440 }}
        />
      </Card>

      <Drawer
        destroyOnClose
        width={320}
        title={PRODUCT_FORM_TITLE_MAP?.[formType]}
        visible={visible}
        onClose={closeDrawer}
      >
        <ProductForm type={formType} product={product} onEnd={closeDrawer} />
      </Drawer>
    </PageLayout>
  );
};

ProductPage.propTypes = {
  history: PropTypes.object,
};

export default ProductPage;
