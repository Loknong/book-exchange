export interface User {
  userId: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  userPassword: string;
}

export interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}
