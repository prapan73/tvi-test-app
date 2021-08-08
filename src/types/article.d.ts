export type Category = "";

export type Comment = {
  name: string;
  message: string;
  isLike?: boolean;
};

export type Article = {
  summary: string;
  author: string;
  link: string;
  media: string;
  title: string;
  media_content: string;
  rights?: string;
  isLike?: boolean;
  comments?: Comment[];
  lastUpdatedAt: Date | null;
};
