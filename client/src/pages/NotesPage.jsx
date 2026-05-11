import { useState, useEffect } from 'react';
import MarkdownViewer from '../components/notes/MarkdownViewer';
import './NotesPage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const CATEGORY_ICONS = {
  dbms: '🗄️',
  oops: '🧬',
  os: '💻',
  'system-design': '🏗️',
  cn: '🌐',
};

export default function NotesPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [lmrMode, setLmrMode] = useState(false);

  const token = localStorage.getItem('qp_token');

  // Fetch categories on mount
  useEffect(() => {
    fetch(`${API_URL}/api/notes/categories`)
      .then((r) => r.json())
      .then((data) => {
        setCategories(data.categories || []);
        if (data.categories?.length > 0) {
          setSelectedCategory(data.categories[0]);
          if (data.categories[0].notes?.length > 0) {
            loadNote(data.categories[0].slug, data.categories[0].notes[0].slug);
            setSelectedNote(data.categories[0].notes[0].slug);
          }
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const loadNote = async (category, slug) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/notes/${category}/${slug}`);
      const data = await res.json();
      setContent(data.content || '');
    } catch (err) {
      setContent('# Error\nFailed to load note.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    if (cat.notes?.length > 0) {
      setSelectedNote(cat.notes[0].slug);
      loadNote(cat.slug, cat.notes[0].slug);
    } else {
      setSelectedNote(null);
      setContent('# No notes available\nThis category has no notes yet.');
    }
  };

  const handleNoteClick = (slug) => {
    setSelectedNote(slug);
    if (selectedCategory) {
      loadNote(selectedCategory.slug, slug);
    }
  };

  return (
    <div className="notes-page">
      {/* Category Sidebar */}
      <aside className="notes-sidebar">
        <h3 className="notes-sidebar-title">📚 Categories</h3>
        <nav className="notes-category-list">
          {categories.map((cat) => (
            <div key={cat.slug}>
              <button
                className={`notes-category-btn ${selectedCategory?.slug === cat.slug ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat)}
              >
                <span className="notes-cat-icon">
                  {CATEGORY_ICONS[cat.slug] || '📄'}
                </span>
                {cat.name}
                <span className="notes-cat-count">{cat.notes?.length || 0}</span>
              </button>

              {/* Show notes list when category is selected */}
              {selectedCategory?.slug === cat.slug && cat.notes?.length > 0 && (
                <div className="notes-list">
                  {cat.notes.map((note) => (
                    <button
                      key={note.slug}
                      className={`notes-list-item ${selectedNote === note.slug ? 'active' : ''}`}
                      onClick={() => handleNoteClick(note.slug)}
                    >
                      {note.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Note Content */}
      <main className="notes-content">
        <div className="notes-toolbar">
          <button
            className={`lmr-toggle ${lmrMode ? 'active' : ''}`}
            onClick={() => setLmrMode(!lmrMode)}
            title="Last-Minute Revision: shows only bold text and images"
          >
            ⚡ LMR Mode
          </button>
        </div>

        {isLoading ? (
          <div className="notes-loading">
            <div className="run-spinner" style={{ width: 24, height: 24 }} />
            <span>Loading note…</span>
          </div>
        ) : (
          <div className={`notes-viewer ${lmrMode ? 'lmr-active' : ''}`}>
            <MarkdownViewer content={content} />
          </div>
        )}
      </main>
    </div>
  );
}
