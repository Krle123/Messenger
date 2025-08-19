import type { QuestionDto } from "../../models/questions/QuestionDto";

export interface IQuestionsAPIService {
  getAllQuestions(): Promise<QuestionDto[]>;
  getRandomQuestions(tezina: number, limit: number): Promise<QuestionDto[]>;
  createQuestion(questionDto: QuestionDto): Promise<QuestionDto>;
  updateQuestion(id: number, questionDto: QuestionDto): Promise<QuestionDto>;
  deleteQuestion(id: number): Promise<boolean>;
}
