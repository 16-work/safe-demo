import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { SafeStore } from './types';

export default create<SafeStore>()(
  devtools(
    persist(
      (set) => ({
        safeAddresses: {},
        setSafeAddress: (safeAddress, owners) =>
          set((state) => ({
            safeAddresses: {
              ...state.safeAddresses,
              [safeAddress]: owners,
            },
          })),
      }),
      { name: 'safe' }
    )
  )
);
