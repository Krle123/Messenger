import type { QuestionDto } from "../../models/questions/QuestionDto";
import type { ResponseData } from "../response/ResponseData";

export interface QuestionData extends ResponseData {
    data: QuestionDto
}

export interface QuestionsData extends ResponseData {
    data: QuestionDto[]
}