export default interface PostAttributes {
  title: string;
  slug: string;
  date: string;
  description: string;
  coverImage?: string;
  images?: string[];
}
