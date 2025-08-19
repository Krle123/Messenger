import { toast } from "react-hot-toast";
import { questionsApi } from "../../../api_services/questions/QuestionsAPIService";
import type { QuestionDto } from "../../../models/questions/QuestionDto";

interface Props {
  question: QuestionDto;
  onDelete: (id: number) => void;
}

const QuestionTableRow: React.FC<Props> = ({ question, onDelete }) => {
  const handleDelete = async () => {
    try {
      const success = await questionsApi.deleteQuestion(question.id);
      if (success) {
        onDelete(question.id);
        toast.success("Pitanje obrisano!");
      } else {
        toast.error("Greška prilikom brisanja.");
      }
    } catch {
      toast.error("Došlo je do greške.");
    }
  };

  return (
    <tr className="border-t border-blue-200 hover:bg-blue-100/20 transition">
      <td className="p-4 text-gray-800">{question.pitanje}</td>
      <td className="p-4 text-gray-800">{question.tezina}</td>
      <td className="p-4">
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 font-medium transition"
        >
          Obriši
        </button>
      </td>
    </tr>
  );
};

export default QuestionTableRow;
