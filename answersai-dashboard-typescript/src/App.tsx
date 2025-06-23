import React from "react";
import ChargingStation from "./pages/ChargingStation";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <div className="flex min-h-screen text-white font-sans" style={{ backgroundColor: "#0E0D0D" }}>
      <div className="flex flex-col items-center py-4 w-20 min-h-screen md:h-auto">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <main
          className="flex-1 bg-[#1C1C1C] border-t border-r border-b border-l border-[#3A3A3A] rounded-md overflow-y-auto"
          style={{ padding: "40px 36px 32px 40px", marginLeft: 0 }}
        >
          <ChargingStation />
        </main>

      </div>
    </div>
  );
};

export default App;
