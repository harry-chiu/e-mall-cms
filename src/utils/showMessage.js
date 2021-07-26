import { message } from 'antd';

const showMessage = (text, type) => () => {
  message?.[type]?.(text);
};

export default showMessage;
