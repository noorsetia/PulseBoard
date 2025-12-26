// Mock authentication service
export const authService = {
  login: async (username, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username && password) {
          const user = {
            id: 1,
            username: username,
            name: username.charAt(0).toUpperCase() + username.slice(1),
            email: `${username}@pulseboard.com`,
          };
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  },

  logout: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 300);
    });
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};
