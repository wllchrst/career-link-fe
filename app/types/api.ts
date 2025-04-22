import type {DateTimezoneSetter} from "date-fns/parse/_lib/Setter";

export type Student = {
  nim: string;
  full_name: string;
  email: string;
  curr_semester: number;
};

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
  sessions: Session[];
};

export type BootcampCategory = {
  id: string;
  name: string;
  description: string;
};

export type SessionData = {
  id: string;
  link: string;
  description: string;
}

export type Option = {
  id: string;
  name: string;
}

export type Question = {
  id: string;
  text: string;
  options: Option[];
}

export type SessionTest = {
  id: string;
  questions: Question[];
  scores: Result[];
}

export type Session = {
  id: string;
  bootCamp: Bootcamp;
  number: number;
  title: string;
  description: string;
  materials: SessionData[];
  preTest: SessionTest;
  postTest: SessionTest;
  assignment: Assignment;
}

export type Result = {
  id: string;
  userId: string;
  testId: string;
  score: number;
}

export type Assignment = {
  id: string;
  question: string;
  answer: string;
}




