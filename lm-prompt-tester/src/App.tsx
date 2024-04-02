import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import History from "./pages/History";
import Setting from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 1. "/": 홈페이지
// 2. "/chat": 채팅
// 3. "/history": 테스트 이력 조회 및 다운로드
// 4. "/settings": 모델 별 프롬프트/파라미터 입력 및 조회

function App(): JSX.Element {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="dark"
        limit={1}
      />
    </div>
  );
}

export default App;
