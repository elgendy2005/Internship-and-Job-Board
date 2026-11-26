import { NavLink, Route, Routes } from 'react-router';
import Home from './pages/Home.jsx';
import ComingSoon from './pages/ComingSoon.jsx';
import NotFound from './pages/NotFound.jsx';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/internships', label: 'Internships' },
  { to: '/my-applications', label: 'My Applications' },
  { to: '/recruiter', label: 'Recruiter' },
  { to: '/career-office', label: 'Career Office' },
];

export default function App() {
  return (
    <>
      <header className="site-header">
        <h1>Internship &amp; Job Board</h1>
        <nav aria-label="Main">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'}>
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/internships" element={<ComingSoon title="Internships" />} />
          <Route path="/my-applications" element={<ComingSoon title="My Applications" />} />
          <Route path="/recruiter" element={<ComingSoon title="Recruiter" />} />
          <Route path="/career-office" element={<ComingSoon title="Career Office" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
