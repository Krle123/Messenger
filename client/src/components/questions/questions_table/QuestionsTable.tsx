import React from "react";
import type { QuestionDto } from "../../../models/questions/QuestionDto";
import QuestionTableRow from "./QuestionsTableRow";

interface Props {
  questions: QuestionDto[];
  setQuestions: React.Dispatch<React.SetStateAction<QuestionDto[]>>;
}

const QuestionTable: React.FC<Props> = ({ questions, setQuestions }) => {
  const handleRemove = (id: number) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <div className="group relative overflow-hidden bg-blue-500/10 rounded-lg border border-blue-300 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-300">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <table className="w-full relative z-10">
        <thead>
          <tr className="bg-blue-200/50 text-left text-blue-700 uppercase text-sm tracking-wide">
            <th className="p-4">Pitanje</th>
            <th className="p-4">Težina</th>
            <th className="p-4">Akcije</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <QuestionTableRow key={q.id} question={q} onDelete={handleRemove} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionTable;
