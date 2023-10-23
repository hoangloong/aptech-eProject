export type Category = {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  parentId: number | null;
  categories: Category[];
};
