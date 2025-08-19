import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/homepage/Homepage";
import { questionsApi } from "./api_services/questions/QuestionsAPIService";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="*" element={<HomePage questionsApi={questionsApi} />} />
      </Routes>
    </>
  );
}

export default App;
