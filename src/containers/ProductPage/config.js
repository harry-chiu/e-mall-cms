import React from 'react';
import { Typography } from 'antd';

export const columns = [
  {
    title: '商品名稱',
    width: 120,
    dataIndex: 'name',
  },
  {
    title: '商品分類',
    width: 120,
    dataIndex: 'category',
  },
  {
    title: '商品價格',
    width: 120,
    dataIndex: 'price',
    render: price => `$${price}`,
  },
  {
    title: '商品描述',
    width: 240,
    dataIndex: 'description',
    render: description => (
      <Typography.Text ellipsis>{description}</Typography.Text>
    ),
  },
];
