import React, { useState } from "react";
import { toast } from "react-hot-toast";
import type { QuestionDto } from "../../../models/questions/QuestionDto";

interface Props {
  availableQuestions: QuestionDto[];
}

const QuestionsForExam: React.FC<Props> = ({ availableQuestions }) => {
  const [numQuestions, setNumQuestions] = useState(3);
  const [generatedQuestions, setGeneratedQuestions] = useState<QuestionDto[]>(
    []
  );

  const handleGenerate = async () => {
    try {
      setGeneratedQuestions([]);
      const byDifficulty: Record<1 | 2 | 3, QuestionDto[]> = {
        1: availableQuestions.filter((q) => q.tezina === 1),
        2: availableQuestions.filter((q) => q.tezina === 2),
        3: availableQuestions.filter((q) => q.tezina === 3),
      };

      const result: QuestionDto[] = [];
      let remaining = numQuestions;

      for (let i = 1; i <= 3; i++) {
        const pool = byDifficulty[i as 1 | 2 | 3];
        if (pool.length && remaining > 0) {
          const pick = pool[Math.floor(Math.random() * pool.length)];
          result.push(pick);
          remaining--;
        }
      }

      if (remaining > 0) {
        const all = availableQuestions.sort(() => Math.random() - 0.5);
        result.push(...all.slice(0, remaining));
      }

      setGeneratedQuestions(result);
      toast.success("Pitanja kreirana");
    } catch {
      toast.error("Greška prilikom kreiranja pitanja");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl text-blue-800/70 font-semibold">Kreiranja pitanja</h2>

      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="w-full md:w-1/2">
          <label
            htmlFor="numQuestions"
            className="text-sm text-gray-700 block mb-1"
          >
            Broj pitanja
          </label>
          <input
            type="number"
            id="numQuestions"
            min={1}
            max={availableQuestions.length}
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="w-full md:w-1/2">
          <button
            onClick={handleGenerate}
            className="w-full py-3 bg-blue-800/90 text-white rounded-lg shadow hover:shadow-lg transition"
          >
            Kreiranje pitanja
          </button>
        </div>
      </div>

      {generatedQuestions.length > 0 && (
        <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-200">
          <ul className="list-disc list-inside space-y-1 text-gray-800">
            {generatedQuestions.map((q) => (
              <li key={q.id}>
                {q.pitanje}{" "}
                <span className="text-sm text-gray-500">
                  (Poena: {Math.round(1.5 * q.tezina)})
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuestionsForExam;
