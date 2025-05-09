import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Habits from "./pages/habits/Habits";
import Items from "./pages/items/items";

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="flex flex-col h-screen">
          <Navbar />
          <div className="flex-1 overflow-auto">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Habits />} />
                <Route path="/items" element={<Items />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App; 