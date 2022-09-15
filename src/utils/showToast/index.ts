import {toast, ToastContent, ToastOptions} from 'react-toastify';
import i18n from '../../app/i18n';

const showToast = (
  text: string = 'No message to Show',
  options: ToastOptions = {},
) => {
  let defaultOptions: ToastOptions = {
    type: 'warning',
    position: 'bottom-right',
  };
  let toastOptions = {...defaultOptions, ...options};

  //console.log('SHOW-TOAST ===> ', { text, toastOptions })
  toast(i18n.t(text) as ToastContent, toastOptions);

  return null;
};
export default showToast;
