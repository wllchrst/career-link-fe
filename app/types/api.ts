import type { TestType } from "./enum";

export type ApiResponse<T> = {
  message: string;
  data: T;
};

export type User = {
  id: string;
  nim?: string;
  name: string;
  email: string;
  phone: string;
  major?: string;
  future_position: string;
  skill: string;
  student_attempts: StudentAttempt[];
  session_attendances: Attendance[];
  session_assignment_results: AssignmentResult[];
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
  bootcamp: Bootcamp;
  user: User;
  created_at: string;
};

export type Bootcamp = {
  id: string;
  name: string;
  shortName: string;
  type_id: string;
  type: BootcampType;
  category_id: string;
  category: BootcampCategory;
  image_path: string;
  description: string;
  sessions: Session[];
};

export type BootcampCategory = {
  id: string;
  name: string;
  description: string;
};

export type BootcampType = {
  id: string;
  name: string;
};

export type SessionData = {
  id: string;
  link: string;
  description: string;
};

export type Option = {
  id: string;
  option: string;
  question_id: string;
  is_answer: boolean;
};

export type Question = {
  id: string;
  test_id: string;
  question: string;
  number: number;
  options: Option[];
};

export type SessionTest = {
  id: string;
  type: TestType;
  title: string;
  open_date: Date;
  close_date: Date;
  attempt_count: string;
  minimum_score: number;
};

export type StudentAttempt = {
  id: string;
  test_id: string;
  user_id: string;
  created_at: Date;
  done_at: Date;
  test: SessionTest;
  score: StudentScore;
};

export type StudentScore = {
  id: string;
  user_id: string;
  attempt_id: string;
  score: number;
  user: User;
  attempt: StudentAttempt;
};

export type Session = {
  id: string;
  bootcamp: Bootcamp;
  session_number: number;
  title: string;
  description: string;
  end_date: Date;
  start_attendance_date: Date;
  materials: SessionData[];
  preTest: SessionTest;
  postTest: SessionTest;
  assignment: Assignment;
};

export type Result = {
  id: string;
  userId: string;
  testId: string;
  score: number;
};

export type Assignment = {
  id: string;
  question_file_path: string;
  answer_file_path: string;
  is_shared: boolean;
  open_date: Date;
  close_date: Date;
};

export type AssignmentAnswer = {
  id: string;
  user_id: string;
  assignment_id: string;
  answer_file_path: string;
  user: User;
};
export type AssignmentResult = {
  id: string;
  user_id: string;
  assignment_id: string;
  result: string;
  user: User;
};

export type Attendance = {
  id: string;
  user: User;
  attendance_type: "clock_in" | "clock_out";
  finished_at: Date;
  session_id: string;
};

export type Enrollment = {
  id: string;
  user: User;
  bootcamp: Bootcamp;
  user_id: string;
  bootcamp_id: string;
};

export type AuthResponse = {
  access_token: string;
  token_type: string;
};

export type EvaluationQuestion = {
  id: string;
  question: string;
  type: string;
}
