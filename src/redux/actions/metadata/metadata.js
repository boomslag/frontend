import { SET_METADATA } from './types';

export const setMetadata = (payload) => {
  return {
    type: SET_METADATA,
    payload,
  };
};
