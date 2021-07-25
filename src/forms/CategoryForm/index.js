import React from 'react';
import PropTypes from 'prop-types';
import { v1 as uuidV1 } from 'uuid';
import firebase from 'firebase/app';
import { Form, Input, Button } from 'antd';
import showMessage from 'utils/showMessage';
import { CATEGORY_FORM_MESSAGE_MAP } from 'constants/index';
import { styles, initialValues } from './config';

const CategoryForm = ({ type, category, onEnd }) => {
  const submitCategory = values => {
    const id = category?.id || uuidV1();
    const successText = CATEGORY_FORM_MESSAGE_MAP?.[type];

    const newCategory = {
      id,
      name: values?.name,
    };

    firebase
      .database()
      .ref(`/categories/${id}`)
      .update(newCategory)
      .then(showMessage(successText, 'success'))
      .catch(showMessage('發生錯誤', 'error'))
      .finally(onEnd);
  };

  return (
    <Form initialValues={category || initialValues} onFinish={submitCategory}>
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
          style={styles.SubmitButton}
        >
          新增
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
