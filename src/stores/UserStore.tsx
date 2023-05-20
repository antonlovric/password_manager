import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  id: number;
}

interface IUserStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
}

export const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set(() => ({ user: user })),
    }),
    {
      name: 'user-storage',
    }
  )
);
