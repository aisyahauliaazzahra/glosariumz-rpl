import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/Header.css";

const Header = () => {
  const [word, setWord] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setWord(e.target.value);
  };

  const handleSearch = () => {
    if (word.trim() !== "") {
      navigate(`/detail/${encodeURIComponent(word)}`);
    }
  };

  return (
    <div className="glosariumz-header">
      <div className="search-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          value={word}
          onChange={handleInputChange}
          placeholder="Cari istilah..."
        />
        <button className="btn login" onClick={handleSearch}>
          Cari
        </button>
      </div>
    </div>
  );
};

export default Header;
