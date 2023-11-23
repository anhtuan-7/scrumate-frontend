import { useGetGroupListQuery } from './groupApi';

const GroupList = () => {
  const { data, error, isFetching } = useGetGroupListQuery({
    id: 1,
  });
  return <div>Is fetching: {isFetching}</div>;
};

export default GroupList;
