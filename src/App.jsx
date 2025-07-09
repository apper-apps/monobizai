import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "@/components/organisms/Layout";
import MainChatPage from "@/components/pages/MainChatPage";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainChatPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;