
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [cards, setCards] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [folder, setFolder] = useState("Default Folder");
  const [scanning, setScanning] = useState(false);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleScan = () => {
    if (!image) return;
    setScanning(true);
    setTimeout(() => {
      const newCard = {
        id: uuidv4(),
        folder,
        image: preview,
        player: "Josh Allen",
        year: "2021",
        brand: "Select",
        value: "$45",
      };
      setCards([...cards, newCard]);
      setImage(null);
      setPreview(null);
      setScanning(false);
    }, 1500);
  };

  const folders = [...new Set(cards.map((c) => c.folder))];

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>CardFlip AI MVP</h1>
      <input type="file" onChange={handleUpload} />
      <input
        placeholder="Folder name"
        value={folder}
        onChange={(e) => setFolder(e.target.value)}
        style={{ marginLeft: "10px" }}
      />
      <div style={{ marginTop: "10px" }}>
        {preview && (
          <>
            <img src={preview} alt="Preview" style={{ width: "200px", display: "block", marginBottom: "10px" }} />
            <button onClick={handleScan} disabled={scanning}>
              {scanning ? "Scanning..." : "Scan & Add to Folder"}
            </button>
          </>
        )}
      </div>
      {folders.map((f) => (
        <div key={f} style={{ marginTop: "20px" }}>
          <h3>{f}</h3>
          {cards.filter((c) => c.folder === f).map((card) => (
            <div key={card.id} style={{ marginBottom: "10px" }}>
              <img src={card.image} alt="Card" style={{ width: "150px" }} />
              <div>{card.player}</div>
              <div>{card.year} {card.brand}</div>
              <div>{card.value}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
