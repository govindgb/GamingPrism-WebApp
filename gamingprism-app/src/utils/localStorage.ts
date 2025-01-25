export const saveUser = (username: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
};
  
export const checkUserExists = (username: string): boolean => {
const users = JSON.parse(localStorage.getItem('users') || '[]');
return users.some((user: any) => user.username === username);
};
  
export const authenticateUser = (username: string, password: string): boolean => {
const users = JSON.parse(localStorage.getItem('users') || '[]');
return users.some((user: any) => 
    user.username === username && user.password === password
);
};