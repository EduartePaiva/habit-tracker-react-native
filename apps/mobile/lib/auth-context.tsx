import { createContext, useContext } from "react";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  // user: null;
  signUp: (email: string, password: string) => Promise<string | null>;
  signIn: (email: string, password: string) => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const signUp = async (email: string, password: string) => {
    try {
      // await createUserAccount
      // await signUser

      return null;
    } catch (err) {
      if (err instanceof Error) return err.message;

      return "An error occurred during sign up";
    }
  };
  const signIn = async (email: string, password: string) => {
    try {
      // await createUserAccount
      // await signUser

      return null;
    } catch (err) {
      if (err instanceof Error) return err.message;

      return "An error occurred during sign in";
    }
  };

  return <AuthContext.Provider value={{ signUp, signIn }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be inside of the AuthProvider");
  }
  return context;
}
