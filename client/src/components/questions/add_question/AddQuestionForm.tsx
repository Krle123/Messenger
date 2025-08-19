import { useState } from "react";
import toast from "react-hot-toast";
import { QuestionDto } from "../../../models/questions/QuestionDto";
import { ValidateNewQuestionEntry } from "../../../api_services/validators/questions/NewQuestionValidator";
import type { IQuestionsAPIService } from "../../../api_services/questions/IQuestionsAPIService";

const AddQuestionForm = ({
  questionsApi,
  onRefreshQuestions,
}: {
  questionsApi: IQuestionsAPIService;
  onRefreshQuestions: (qs: QuestionDto[]) => void;
}) => {
  const [questionData, setQuestionData] = useState({
    pitanje: "",
    tezina: 1,
    id: 0,
  });
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setQuestionData((prev) => ({
      ...prev,
      [name]: name === "tezina" ? +value : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = ValidateNewQuestionEntry(
      questionData.pitanje,
      questionData.tezina
    );

    if (!validation.uspesno) {
      setError(validation.poruka ?? "");
      return;
    }

    try {
      await questionsApi.createQuestion(
        new QuestionDto(0, questionData.pitanje, questionData.tezina)
      );
      toast.success("Pitanje dodato");

      setQuestionData({ pitanje: "", tezina: 1, id: 0 });
      setError("");
      const refreshed = await questionsApi.getAllQuestions();
      onRefreshQuestions(refreshed);
    } catch {
      toast.error("Greška prilikom čuvanja pitanja");
    }
  };

  return (
    <>
      <h2 className="text-xl text-blue-800/70 font-semibold">
        Dodavanje pitanja
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-gray-700">Pitanje</label>
          <input
            type="text"
            name="pitanje"
            value={questionData.pitanje}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <label className="text-sm text-gray-700 block mb-2">Težina</label>
            <div className="flex gap-4">
              {[1, 2, 3].map((v) => (
                <label key={v} className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="tezina"
                    value={v}
                    checked={questionData.tezina === v}
                    onChange={handleChange}
                    className="accent-blue-600 mt-1 w-4 h-4"
                  />
                  <span className="text-xl font-medium text-gray-800">{v}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <button
              type="submit"
              className="w-full py-3 bg-blue-800/90 text-white rounded-lg shadow hover:shadow-lg transition"
            >
              Sačuvaj pitanje
            </button>
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
    </>
  );
};

export default AddQuestionForm;
