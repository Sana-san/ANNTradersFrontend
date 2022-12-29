import { Category } from "./Category";
import { User } from "./User";

export class Product{
   id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  user: User;
 category: Category;


}