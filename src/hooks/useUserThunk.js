import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function useUserThunk(thunk) {
  const { isLoading, error } = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const runThunk = useCallback(
    async (payload) => {
      dispatch(thunk(payload));
    },
    [dispatch, thunk],
  );

  return [runThunk, isLoading, error];
}

export default useUserThunk;
