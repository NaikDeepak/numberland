export interface Student {
  id: string
  name: string
  classCode: string
  grade: number
  coins: number
  streak: number
  totalXP: number
  level: number
  lastLogin: Date
  completedQuests: QuestCompletion[]
}

export interface Teacher {
  id: string
  name: string
  email: string
  classes: Class[]
}

export interface Class {
  id: string
  name: string
  code: string
  grade: number
  students: Student[]
  createdAt: Date
}

export interface QuestCompletion {
  questId: string
  completedAt: Date
  score: number
  accuracy: number
}

export type User = Student | Teacher

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export type AuthAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }
  | { type: "LOGOUT" }
