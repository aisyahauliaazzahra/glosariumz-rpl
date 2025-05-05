import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./frontend/Header";
import { Link } from "react-router-dom";
import LoginPage from "./frontend/Login"; // <-- Tambahkan ini
import AdminPage from "./frontend/admin";
import TambahEditPage from "./frontend/Tambah";
import EditPage from "./frontend/Edit"; 
import IstilahDetail from "./frontend/IstilahDetail";

function MainApp() {
  const [category, setCategory] = useState("en");
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (word) dictionaryAPI();
  }, [category, word]);

  const dictionaryAPI = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost/glosariumzz-api/getIstilah.php?kata=${word}`
      );
      setMeanings(data);
    } catch (error) {
      console.log("Error ambil data dari database:", error);
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
  };

  return (
    <div className="glosariumz-app">
      <div className="hero-section">
        <div className="hero-left">
          <img src="/zingo.png" alt="Zingo" className="zingo" />
          <div className="hero-text">
            <h1>Welcome to <span>GlosariumZ</span></h1>
            <p>Kamu mau Zingo bantu cariin istilah apa?</p>
            <Header
              category={category}
              setCategory={setCategory}
              word={word}
              setWord={setWord}
              lightmode={false}
            />
          </div>
        </div>
      </div>

      <div className="main-section">
        <div className="admin-card">
          <p>Kamu Etmin?</p>
          <img src="/admin-illustration.png" alt="Admin" />
          {isAdmin ? (
            <button className="btn logout" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="btn login" onClick={() => navigate("/login")}>
              Login
            </button>
          )}
        </div>

        <div className="trending-terms">
         <h2>🔥 TOP 10 Istilah si Paling Trending</h2>
             <div className="terms-list">
              {["Rizz", "Walid", "Mokel", "Cegil", "Sus", "MK", "RedFlag", "Siroyoo", "Rialll", "YTTA"].map((term, i) => (
                <button 
                  key={i} 
                  className="term-badge"
                  onClick={() => navigate(`/istilah/${term}`)} // Mengarahkan ke halaman detail
                   >
                           {term}
                </button>
              ))}
               </div>
          </div>

      </div>

      
    </div>
  );
}

// Bungkus seluruh aplikasi dengan Router
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/tambah" element={<TambahEditPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/detail/:nama" element={<IstilahDetail />} />
      </Routes>
    </Router>
  );
}

export default App;