import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import {
  Card,
  Space,
  Table,
  Button,
  Drawer,
  Popconfirm,
  Typography,
} from 'antd';
import { PlusOutlined as AddIcon } from '@ant-design/icons';
import PageLayout from 'components/PageLayout';
import CategoryForm from 'forms/CategoryForm';
import showMessage from 'utils/showMessage';
import { CATEGORY_FORM_TITLE_MAP } from 'constants/index';
import { columns } from './config';

const CategoryPage = ({ history }) => {
  const [update, setUpdate] = useState(new Date());
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formType, setFormType] = useState(null);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  const goToHomePage = () => {
    history?.push?.('/');
  };

  const updateData = () => {
    setUpdate(new Date());
  };

  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const openAddForm = () => {
    setFormType('add');
    setVisible(true);
  };

  const openEditForm = records => () => {
    setCategory(records);
    setFormType('edit');
    setVisible(true);
  };

  const closeDrawer = () => {
    updateData();
    setCategory(null);
    setVisible(false);
  };

  const removeCategory = records => () => {
    startLoading();

    firebase
      .database()
      .ref(`/categories/${records?.id}`)
      .set({})
      .then(updateData)
      .then(showMessage('刪除成功', 'success'))
      .catch(showMessage('刪除失敗', 'error'))
      .finally(stopLoading);
  };

  const withActions = prevColumns => [
    ...prevColumns,
    {
      title: '功能',
      key: 'actions',
      width: 160,
      render: (_, records) => (
        <Space size={16}>
          <Typography.Link onClick={openEditForm(records)}>
            編輯
          </Typography.Link>

          <Popconfirm
            title="刪除分類"
            okType="danger"
            onConfirm={removeCategory(records)}
          >
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
      .ref('/categories')
      .once('value', snapshot => {
        const newCategories = Object.values(snapshot.val() || {});

        setCategories(newCategories);
      })
      .finally(stopLoading);
  }, [update]);

  return (
    <PageLayout
      title="分類管理"
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
          dataSource={categories}
          columns={withActions(columns)}
        />

        <Drawer
          destroyOnClose
          visible={visible}
          width={320}
          title={CATEGORY_FORM_TITLE_MAP?.[formType]}
          onClose={closeDrawer}
        >
          <CategoryForm
            type={formType}
            category={category}
            onEnd={closeDrawer}
          />
        </Drawer>
      </Card>
    </PageLayout>
  );
};

CategoryPage.propTypes = {
  history: PropTypes.object,
};

export default CategoryPage;
