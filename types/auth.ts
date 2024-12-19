export interface User {
    id: string;
    username: string;
    email: string;
    role: 'admin' | 'lawyer' | 'citizen';
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    token: string | null;
  }
  
  export interface LoginCredentials {
    username: string;
    password: string;
  }
  
  export interface RegisterData extends LoginCredentials {
    email: string;
    role: 'lawyer' | 'citizen';
    firstName?: string;
    lastName?: string;
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }
  
  