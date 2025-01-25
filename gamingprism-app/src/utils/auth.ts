export const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('users');
      window.location.href = '/signup'; // Hard redirect to signup
    }
  };
  