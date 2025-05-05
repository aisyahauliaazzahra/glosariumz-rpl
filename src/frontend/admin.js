import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style/admin.css";

function AdminPage() {
  const navigate = useNavigate();
  const [terms, setTerms] = useState([]);
  const [error, setError] = useState("");

  // Mengambil data istilah dari API
  useEffect(() => {
    axios
      .get("http://localhost/glosariumzz-api/getAllIstilah.php")
      .then((res) => {
        if (res.data.error) {
          setError(res.data.error); // Menangani error dari backend
        } else {
          setTerms(res.data); // Menyimpan istilah di state
        }
      })
      .catch((err) => {
        setError("Terjadi kesalahan saat mengambil data");
        console.error(err);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus istilah ini?")) {
      // Mengirim request untuk menghapus data istilah ke backend
      axios
        .get(`http://localhost/glosariumzz-api/deleteIstilah.php?id=${id}`)
        .then((res) => {
          if (res.data.success) {
            // Mengupdate daftar istilah setelah berhasil menghapus
            setTerms(terms.filter((term) => term.id !== id));
          } else {
            alert("Gagal menghapus istilah");
          }
        })
        .catch((err) => {
          console.error(err);
          alert("Terjadi kesalahan saat menghapus istilah");
        });
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleAdd = () => {
    navigate("/tambah");
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>🧢 Hello <strong>Admin</strong></h1>
        <button className="btn-add" onClick={handleAdd}>+ Tambah</button>
      </div>

      <h2>Daftar Istilah</h2>
      {error && <p>{error}</p>}
      {terms.length === 0 ? (
        <p>Belum ada istilah</p>
      ) : (
        terms.map((term) => (
          <div key={term.id} className="term-card">
            <span className="term-word">
              <strong>{term.nama}</strong> {term.emoji}
            </span>
            <div className="term-actions">
              <button className="btn-edit" onClick={() => handleEdit(term.id)}>Edit</button>
              <button className="btn-delete" onClick={() => handleDelete(term.id)}>Hapus</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminPage;
