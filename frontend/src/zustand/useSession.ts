import create from "zustand";
import { persist } from "zustand/middleware";

type UserSession = {
  isLoggedIn: boolean;
  id: string | null;
  name: string | null;
  email: string | null;
  rolePermission: number | null;
  phoneNumber: string | null;
  status: number;
};

export type UserSessionStore = {
  userSession: UserSession;
  setLogin: (
    id: string,
    name: string,
    email: string,
    rolePermission: number,
    phoneNumber: string
  ) => void;
  setLogout: () => void;
  setStatus: (status: number) => void;
};

const useUserSessionStore = create(
  persist(
    (set) => ({
      userSession: {
        isLoggedIn: false,
        id: null,
        email: null,
        name: null,
        phoneNumber: null,
        rolePermission: null,
        status: 0,
      },
      setLogin: (
        id: string,
        name: string,
        email: string,
        rolePermission: number,
        phoneNumber: string
      ) => {
        set((state: any) => ({
          userSession: {
            isLoggedIn: true,
            id: id,
            name: name,
            email: email,
            rolePermission: rolePermission,
            phoneNumber: phoneNumber,
          },
        }));
      },
      setLogout: () => {
        set((state: any) => ({
          userSession: {
            isLoggedIn: false,
            id: null,
            email: null,
            name: null,
            phoneNumber: null,
            rolePermission: null,
            status: 0,
          },
        }));
      },
      setStatus: (status: number) => {
        set((state: any) => ({
          userSession: {
            ...state.userSession,
            status: status,
          },
        }));
      },
    }),
    {
      name: "session-storage",
    }
  )
);

export default useUserSessionStore;
