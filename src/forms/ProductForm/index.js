import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v1 as uuidV1 } from 'uuid';
import firebase from 'firebase/app';
import { Form, Input, Button, Select } from 'antd';
import {
  PRODUCT_SUBMIT_TEXT_MAP,
  PRODUCT_FORM_MESSAGE_MAP,
} from 'constants/index';
import showMessage from 'utils/showMessage';
import { styles, initialValues } from './config';

const ProductForm = ({ type, product, onEnd }) => {
  const [loading, setLoading] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const submit = values => {
    startLoading();

    const id = product?.id || uuidV1();
    const successText = PRODUCT_FORM_MESSAGE_MAP?.[type];
    const newProduct = {
      id,
      name: values?.name,
      price: values?.price,
      category: values?.category,
      description: values?.description,
    };

    firebase
      .database()
      .ref(`/products/${id}`)
      .update(newProduct)
      .then(showMessage(successText, 'success'))
      .catch(showMessage('發生錯誤', 'error'))
      .then(stopLoading)
      .finally(onEnd);
  };

  useEffect(() => {
    firebase
      .database()
      .ref('/categories')
      .once('value', snapshot => {
        const categories = Object.values(snapshot.val() || {});
        const newCategoryOptions = categories.map(category => ({
          label: category?.name,
          value: category?.name,
        }));

        setCategoryOptions(newCategoryOptions);
      });
  }, []);

  return (
    <Form
      layout="vertical"
      initialValues={product || initialValues}
      onFinish={submit}
    >
      <Form.Item
        name="name"
        label="商品名稱"
        rules={[{ required: true, message: '請輸入商品名稱' }]}
      >
        <Input placeholder="請輸入" maxLength={40} />
      </Form.Item>

      <Form.Item
        name="category"
        label="商品分類"
        rules={[{ required: true, message: '請選擇商品分類' }]}
      >
        <Select options={categoryOptions} placeholder="請選擇" />
      </Form.Item>

      <Form.Item
        validateFirst
        name="price"
        label="商品價格"
        normalize={Number}
        rules={[
          { type: 'number', message: '請輸入數字' },
          { required: true, message: '請輸入商品價格' },
        ]}
      >
        <Input placeholder="請輸入" min={0} max={9999999} />
      </Form.Item>

      <Form.Item
        validateFirst
        name="description"
        label="商品描述"
        rules={[
          { max: 200, message: '超過字數上限 200 字' },
          { required: true, message: '請輸入商品描述' },
        ]}
      >
        <Input.TextArea
          showCount
          autoSize={{ minRows: 3 }}
          placeholder="請輸入"
          maxLength={200}
        />
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
          {PRODUCT_SUBMIT_TEXT_MAP?.[type]}
        </Button>
      </Form.Item>
    </Form>
  );
};

ProductForm.propTypes = {
  type: PropTypes.oneOf(['add', 'edit']),
  product: PropTypes.object,
  onEnd: PropTypes.func,
};

export default ProductForm;
