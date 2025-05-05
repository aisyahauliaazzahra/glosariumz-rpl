import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style/Tambah.css";

function TambahEditPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: "",
    definisi: "",
    kelas_kata: "",
    sinonim: "",
    terkait: "",
    emoji: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSimpan = async () => {
    if (formData.nama.trim() === "") {
      alert("Istilah tidak boleh kosong!");
      return;
    }

    try {
      const res = await axios.post("http://localhost/glosariumzz-api/addIstilah.php", formData);
      console.log(res.data); // DEBUG: tampilkan respon dari backend

      if (res.data.success) {
        alert("Berhasil menambah istilah!");
        navigate("/admin");
      } else {
        alert("Gagal menyimpan: " + (res.data.message || "Tidak diketahui"));
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Terjadi kesalahan saat menyimpan.");
    }
  };

  return (
    <div className="form-container">
      <h2>Tambah Istilah</h2>

      <label>Istilah</label>
      <input name="nama" value={formData.nama} onChange={handleChange} />

      <label>Definisi</label>
      <textarea name="definisi" value={formData.definisi} onChange={handleChange} />

      <label>Kelas Kata</label>
      <input name="kelas_kata" value={formData.kelas_kata} onChange={handleChange} />

      <label>Sinonim</label>
      <input name="sinonim" value={formData.sinonim} onChange={handleChange} />

      <label>Kata Terkait</label>
      <input name="terkait" value={formData.terkait} onChange={handleChange} />

      <label>Emoji</label>
      <input name="emoji" value={formData.emoji} onChange={handleChange} />

      <div className="button-group">
        <button onClick={handleSimpan} className="btn-simpan">Simpan</button>
        <button onClick={() => navigate("/admin")} className="btn-batal">Batal</button>
      </div>
    </div>
  );
}

export default TambahEditPage;
