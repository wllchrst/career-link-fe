export type Announcement = {
  id: string;
  title: string;
  type: string;
  imageUrl: string;
  description: string;
  createdAt: string;
};

export type Certificate = {
  id: string;
  title: string;
  type: string;
  method: string;
  createdAt: string;
  imageUrl: string;
};

export type Bootcamp = {
  id: string;
  name: string;
  type: string;
  method: string;
  description: string;
};
