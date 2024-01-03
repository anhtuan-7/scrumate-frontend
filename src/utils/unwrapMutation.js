import Toast, { FireErrorToast } from '../components/Toast';

const unwrapMutation = (mutationFunction, data, successTitle) => {
  return mutationFunction(data)
    .unwrap()
    .then(() => {
      Toast.fire({
        icon: 'success',
        title: successTitle,
      });
    })
    .catch((err) => {
      FireErrorToast(err);
    });
};

export default unwrapMutation;
