import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import History from "./pages/History";
import Setting from "./pages/Setting";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";

// 1. "/": 홈페이지
// 2. "/chat": 채팅
// 3. "/setting": 모델 별 프롬프트/파라미터 입력 및 조회
// 4. "/history": 테스트 이력 조회 및 다운로드

function App(): JSX.Element {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
