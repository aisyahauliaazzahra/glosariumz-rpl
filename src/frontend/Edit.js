import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditIstilah() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: "",
    kelas_kata: "",
    definisi: "",
    sinonim: "",
    terkait: "",
    emoji: ""
  });

  // Ambil data berdasarkan ID saat komponen dimount
  useEffect(() => {
    axios
      .get(`http://localhost/glosariumzz-api/getDetail.php?nama=${id}`)
      .then((res) => {
        const data = res.data;
        if (data) {
          setFormData({
            nama: data.nama || "",
            kelas_kata: data.kelas_kata || "",
            definisi: data.definisi || "",
            sinonim: data.sinonim || "",
            terkait: data.terkait || "",
            emoji: data.emoji || ""
          });
        }
      })
      .catch((err) => {
        console.error("Gagal mengambil data:", err);
        alert("Gagal mengambil data dari server");
      });
  }, [id]);

  // Tangani perubahan input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit data ke backend
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost/glosariumzz-api/editIstilah.php", {
        id,
        ...formData
      })
      .then((res) => {
        if (res.data.success) {
          alert("Berhasil disimpan");
          navigate("/admin");
        } else {
          alert("Gagal menyimpan");
        }
      })
      .catch((err) => {
        console.error("Gagal update:", err);
        alert("Terjadi kesalahan saat menyimpan");
      });
  };

  return (
    <div className="edit-page">
      <h2>Edit Istilah</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="nama"
          value={formData.nama}
          onChange={handleChange}
          placeholder="Nama"
        />
        <input
          name="kelas_kata"
          value={formData.kelas_kata}
          onChange={handleChange}
          placeholder="Kelas Kata"
        />
        <textarea
          name="definisi"
          value={formData.definisi}
          onChange={handleChange}
          placeholder="Definisi"
        />
        <input
          name="sinonim"
          value={formData.sinonim}
          onChange={handleChange}
          placeholder="Sinonim"
        />
        <input
          name="terkait"
          value={formData.terkait}
          onChange={handleChange}
          placeholder="Kata Terkait"
        />
        <input
          name="emoji"
          value={formData.emoji}
          onChange={handleChange}
          placeholder="Emoji"
        />
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}

export default EditIstilah;
