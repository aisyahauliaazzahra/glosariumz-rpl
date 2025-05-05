import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function IstilahDetail() {
  const { nama } = useParams(); // ambil kata dari URL
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  console.log("Nama dari URL:", nama); // Debugging untuk melihat nama yang diterima

  // Mengambil data dari API ketika 'nama' berubah
  useEffect(() => {
    axios
      .get(`http://localhost/glosariumzz-api/getDetail.php?nama=${encodeURIComponent(nama)}`)
      .then((res) => {
        console.log(res.data); // Debugging untuk melihat respons dari API
        if (res.data.error) {
          setError(res.data.error);
        } else {
          setData(res.data); // Menyimpan data ke state
        }
      })
      .catch((err) => {
        setError('Terjadi kesalahan saat mengambil data.');
      });
  }, [nama]); // Menjalankan useEffect setiap kali nama berubah

  // Menampilkan loading ketika data masih kosong
  if (error) return <p>{error}</p>;
  if (!data) return <p>Loading...</p>;

  // Menampilkan detail istilah
  return (
    <div className="istilah-container">
      <div className="detail-content">
        <h1>{data.nama} {data.emoji}</h1>
        <p><strong>Kelas Kata:</strong> {data.kelas_kata}</p>
        
        <div className="card">
          <strong>Definisi:</strong>
          <ol>
            {data.definisi.split("\n").map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ol>
        </div>
        
        <div className="card">
          <strong>Sinonim:</strong>
          <p>{data.sinonim}</p>
        </div>
        
        <div className="card">
          <strong>Kata Terkait:</strong>
          <p>{data.terkait}</p>
        </div>
      </div>
    </div>
  );
}

export default IstilahDetail;
