import { news } from "../data/dummyNews";
import NewsCard from "../components/NewsCard";

function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Berita Terbaru</h2>

      {news.map((item) => (
        <NewsCard key={item.id} title={item.title} category={item.category} content={item.content} />
      ))}
    </div>
  );
}

export default Home;
