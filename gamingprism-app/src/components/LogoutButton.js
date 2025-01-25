"use client";
import { Button } from 'antd';
import { logout } from '@/utils/auth';

export const LogoutButton = () => {
  return (
    <Button 
      type="primary" 
      danger 
      onClick={logout}
      className="absolute top-4 right-4"
    >
      Logout
    </Button>
  );
};