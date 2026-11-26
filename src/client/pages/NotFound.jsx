import { Link } from 'react-router';

export default function NotFound() {
  return (
    <section>
      <h2>Page not found</h2>
      <p>
        <Link to="/">Back to Home</Link>
      </p>
    </section>
  );
}
