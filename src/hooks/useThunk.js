import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

function useThunk(thunk) {
  const { isLoading, error } = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const runThunk = useCallback(
    (payload) => {
      dispatch(thunk(payload));
    },
    [dispatch, thunk]
  );

  return [runThunk, isLoading, error];
}

export default useThunk;
