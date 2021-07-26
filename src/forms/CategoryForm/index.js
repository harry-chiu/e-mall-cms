import React, { useState } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { Form, Input, Button } from 'antd';
import showMessage from 'utils/showMessage';
import {
  CATEGORY_FORM_MESSAGE_MAP,
  CATEGORY_SUBMIT_TEXT_MAP,
} from 'constants/index';
import { styles, initialValues } from './config';

const CategoryForm = ({ type, category, onEnd }) => {
  const [loading, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const submit = values => {
    startLoading();

    const successText = CATEGORY_FORM_MESSAGE_MAP?.[type];
    const newCategory = {
      name: values?.name,
    };

    firebase
      .database()
      .ref(`/categories/${values?.name}`)
      .update(newCategory)
      .then(showMessage(successText, 'success'))
      .catch(showMessage('發生錯誤', 'error'))
      .then(stopLoading)
      .finally(onEnd);
  };

  return (
    <Form
      layout="vertical"
      initialValues={category || initialValues}
      onFinish={submit}
    >
      <Form.Item
        name="name"
        label="分類名稱"
        rules={[{ required: true, message: '請輸入分類名稱' }]}
      >
        <Input placeholder="請輸入" />
      </Form.Item>

      <Form.Item noStyle>
        <Button
          block
          type="primary"
          htmlType="submit"
          loading={loading}
          disabled={loading}
          style={styles.SubmitButton}
        >
          {CATEGORY_SUBMIT_TEXT_MAP?.[type] || '儲存'}
        </Button>
      </Form.Item>
    </Form>
  );
};

CategoryForm.propTypes = {
  type: PropTypes.oneOf(['add', 'edit']),
  category: PropTypes.object,
  onEnd: PropTypes.func,
};

export default CategoryForm;
