import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const todoListState = atom({
  key: 'todoListState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
