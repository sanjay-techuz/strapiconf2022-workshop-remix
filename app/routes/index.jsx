import { Link } from "remix";

export default function Index() {
  return (
    <main className="container">
      <Link to="/works">👉 Our Work.</Link>
    </main>
  );
}