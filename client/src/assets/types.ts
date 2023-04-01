export interface UserContextType {
  user: { name: ''; email: '' };
  ready: boolean;
  setUser: React.Dispatch<React.SetStateAction<string>>;
}
