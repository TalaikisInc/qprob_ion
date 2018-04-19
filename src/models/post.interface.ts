import { Category } from '../models/category.interface';

export interface Post {
  title: string,
  slug: string,
  url: string,
  summary: string,
  date: number,
  sentiment: number,
  image: string,
  category_id: Category
}
