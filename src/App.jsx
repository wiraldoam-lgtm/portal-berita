import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

function App() {
  const [berita, setBerita] = useState([]);

  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("");
  const [isi, setIsi] = useState("");
  const [penulis, setPenulis] = useState("");

  async function getBerita() {
    const { data, error } = await supabase.from("berita").select("*").order("id", { ascending: false });

    if (!error) {
      setBerita(data);
    }
  }

  async function tambahBerita() {
    if (!judul || !kategori || !isi || !penulis) {
      alert("Semua field harus diisi");
      return;
    }

    const { error } = await supabase.from("berita").insert([
      {
        judul,
        kategori,
        isi,
        penulis,
      },
    ]);

    if (!error) {
      setJudul("");
      setKategori("");
      setIsi("");
      setPenulis("");

      getBerita();
    }
  }

  async function hapusBerita(id) {
    await supabase.from("berita").delete().eq("id", id);

    getBerita();
  }

  useEffect(() => {
    getBerita();
  }, []);

  return (
    <div className="container">
      <h1>📰 Portal Berita Online</h1>

      <hr />

      <h2>Tambah Berita</h2>

      <input type="text" placeholder="Judul Berita" value={judul} onChange={(e) => setJudul(e.target.value)} />

      <br />
      <br />

      <input type="text" placeholder="Kategori" value={kategori} onChange={(e) => setKategori(e.target.value)} />

      <br />
      <br />

      <input type="text" placeholder="Penulis" value={penulis} onChange={(e) => setPenulis(e.target.value)} />

      <br />
      <br />

      <textarea placeholder="Isi Berita" rows="5" cols="50" value={isi} onChange={(e) => setIsi(e.target.value)} />

      <br />
      <br />

      <button onClick={tambahBerita}>Simpan Berita</button>

      <hr />

      <h2>Daftar Berita</h2>

      {berita.length === 0 ? (
        <p>Belum ada berita.</p>
      ) : (
        berita.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
            }}
          >
            <h3>{item.judul}</h3>

            <p>
              <b>Kategori:</b> {item.kategori}
            </p>

            <p>
              <b>Penulis:</b> {item.penulis}
            </p>

            <p>{item.isi}</p>

            <button onClick={() => hapusBerita(item.id)}>Hapus</button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
