import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiHome,
  FiBriefcase,
  FiGrid,
  FiTerminal,
  FiFileText,
  FiCpu,
  FiUser,
  FiLogOut,
} from 'react-icons/fi';

export default function Sidebar({ isOpen, setIsOpen }) {
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiHome /> },
    { name: 'Companies', path: '/dashboard/companies', icon: <FiBriefcase /> },
    { name: 'Patterns', path: '/dashboard/patterns', icon: <FiGrid /> },
    { name: 'Notes', path: '/dashboard/notes', icon: <FiFileText /> },
    { name: 'Aptitude', path: '/dashboard/aptitude', icon: <FiCpu /> },
    { name: 'Profile', path: '/dashboard/profile', icon: <FiUser /> },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-brand">QuickPlace</h2>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            <span className="sidebar-link-icon">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-user">
        <div className="user-avatar">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="user-avatar-img" />
          ) : (
            user?.email?.charAt(0).toUpperCase() || 'U'
          )}
        </div>
        <div className="user-info">
          <p className="user-name">{user?.name || 'Student'}</p>
          <p className="user-email">{user?.email || 'student@example.com'}</p>
        </div>
        <button className="sidebar-logout-btn" onClick={logout} title="Sign out">
          <FiLogOut />
        </button>
      </div>
    </aside>
  );
}
