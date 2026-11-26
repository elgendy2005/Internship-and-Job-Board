import { useEffect, useState } from 'react';

export default function Home() {
  const [apiStatus, setApiStatus] = useState('checking…');

  useEffect(() => {
    let cancelled = false;

    fetch('/api/health')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((body) => {
        if (!cancelled) setApiStatus(body.status);
      })
      .catch(() => {
        if (!cancelled) setApiStatus('unreachable');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section>
      <h2>Welcome</h2>
      <p>
        Recruiters post internships, the Career Office approves them, and students apply with a
        CV link and track their application status.
      </p>
      <p className="api-status" data-status={apiStatus}>
        API: {apiStatus}
      </p>
    </section>
  );
}
