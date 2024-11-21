import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthChange } from '../lib/auth';
import { getUser } from '../lib/firestore';

interface AuthContextType {
  user: any;
  userDetails: any;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userDetails: null,
  loading: true
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      setUser(user);
      
      if (user) {
        const details = await getUser(user.uid);
        setUserDetails(details);
      } else {
        setUserDetails(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, userDetails, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);