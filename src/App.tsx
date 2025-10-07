// src/App.tsx
import React, { useState } from "react";
import LoginView from "./views/LoginView";
import DashboardView from "./views/DashboardView"; // tu dashboard actual

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="w-screen h-screen">
      {loggedIn ? (
        <DashboardView />
      ) : (
        <LoginView onLogin={() => setLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
