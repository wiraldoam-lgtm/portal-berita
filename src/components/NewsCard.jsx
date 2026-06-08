function NewsCard({ title, category, content }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        marginBottom: "10px",
        borderRadius: "8px",
      }}
    >
      <h3>{title}</h3>
      <small>{category}</small>
      <p>{content}</p>
      <button>Baca Selengkapnya</button>
    </div>
  );
}

export default NewsCard;
