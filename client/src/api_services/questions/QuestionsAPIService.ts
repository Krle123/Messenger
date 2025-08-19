import axios from "axios";
import { QuestionDto } from "../../models/questions/QuestionDto";
import type { IQuestionsAPIService } from "./IQuestionsAPIService";
import type { QuestionData, QuestionsData } from "../../types/questions/QuestionData";

const API_URL: string = import.meta.env.VITE_API_URL + "questions";

export const questionsApi: IQuestionsAPIService = {
  async getAllQuestions(): Promise<QuestionDto[]> {
    try {
      const res = await axios.get<QuestionsData>(API_URL);
      return res.data.data;
    } catch  {
      return [];
    }
  },

  async getRandomQuestions(
    tezina: number,
    limit: number
  ): Promise<QuestionDto[]> {
    try {
      const res = await axios.get<QuestionsData>(`${API_URL}/random`, {
        params: {
          tezina,
          limit,
        },
      });
      return res.data.data;
    } catch  {
      return [];
    }
  },

  async createQuestion(questionDto: QuestionDto): Promise<QuestionDto> {
    try {
      const res = await axios.post<QuestionData>(API_URL, questionDto);
      return res.data.data;
    } catch  {
      return new QuestionDto();
    }
  },

  async updateQuestion(
    id: number,
    questionDto: QuestionDto
  ): Promise<QuestionDto> {
    try {
      const res = await axios.put<QuestionData>(`${API_URL}/${id}`, questionDto);
      return res.data.data;
    } catch  {
      return new QuestionDto();
    }
  },

  async deleteQuestion(id: number): Promise<boolean> {
    try {
      const res = await axios.delete(`${API_URL}/${id}`);
      return res.data.success;
    } catch  {
      return false;
    }
  },
};
