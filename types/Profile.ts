export interface User {
  firstName: string;
  lastName: string;
  type: 'admin' | 'teacher' | 'student';
}

export default interface Profile extends User {
  darkTheme: boolean;
}
