export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type Product = {
  _id: string;
  name: string;
  image: string;
  price: number;
  category: string;
};