import { Course } from "./course";

export interface Student {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  course: Course[];
}
