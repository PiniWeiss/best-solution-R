import type { categoryTypes, urgencyTypes } from "./CriteriaType"

export interface IReport {
  _id: string
  userId: string
  category: categoryTypes
  urgency: urgencyTypes
  message: string
  imagePath: string
  sourceType: string
  createdAt: string
}
