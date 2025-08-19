import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { QuestionDto } from "../../models/questions/QuestionDto";
import type { IQuestionsAPIService } from "../../api_services/questions/IQuestionsAPIService";
import AddQuestionForm from "../../components/questions/add_question/AddQuestionForm";
import QuestionsForExam from "../../components/questions/questions_for_exam/QuestionsForExam";
import QuestionTable from "../../components/questions/questions_table/QuestionsTable";
import Navbar from "../../components/layout/navbar/Navbar";


const HomePage = ({ questionsApi }: { questionsApi: IQuestionsAPIService }) => {
  const [questions, setQuestions] = useState<QuestionDto[]>([]);
  const [activeTab, setActiveTab] = useState<number>(2); // default to Generate

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetched = await questionsApi.getAllQuestions();
        setQuestions(fetched);
      } catch {
        toast.error("Greška prilikom učitavanja pitanja");
      }
    };
    fetchQuestions();
  }, [questionsApi]);

  return (
    <>
      <div className="min-h-screen flex align-middle items-center bg-blue-200 md:bg-blue-gradient py-8 px-4">
        <div className="w-full max-w-6xl mx-auto relative">
          <div className="relative z-10 p-4 md:p-8 space-y-8 bg-white/60 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold text-center text-blue-900 uppercase">
              OSNOVE DISTRIBUIRANOG PROGRAMIRANJA 2024/2025
            </h1>

            <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === 1 && (
              <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                <AddQuestionForm
                  questionsApi={questionsApi}
                  onRefreshQuestions={setQuestions}
                />
              </div>
            )}

            {activeTab === 2 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <QuestionsForExam availableQuestions={questions} />
              </div>
            )}

            {activeTab === 3 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <QuestionTable
                  questions={questions}
                  setQuestions={setQuestions}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;