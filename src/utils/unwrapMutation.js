import Toast, { FireErrorToast } from '../components/Toast';

const unwrapMutation = (mutationFunction, data, successTitle) => {
  return mutationFunction(data)
    .unwrap()
    .then((result) => {
      const { affectedCount } = result.data;
      if (affectedCount)
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
