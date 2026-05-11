import express from 'express';
import { readdir, readFile } from 'fs/promises';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = express.Router();

// Resolve content directory relative to project root
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CONTENT_DIR = resolve(__dirname, '..', '..', '..', 'content');

// GET /api/notes/categories — List all note categories with their notes
router.get('/categories', async (req, res, next) => {
  try {
    const entries = await readdir(CONTENT_DIR, { withFileTypes: true });
    const categories = [];

    for (const entry of entries) {
      if (entry.isDirectory()) {
        // Read all .md files in this category
        const categoryPath = join(CONTENT_DIR, entry.name);
        const files = await readdir(categoryPath);
        const notes = files
          .filter((f) => f.endsWith('.md'))
          .map((f) => ({
            slug: f.replace('.md', ''),
            title: f
              .replace('.md', '')
              .replace(/-/g, ' ')
              .replace(/\b\w/g, (c) => c.toUpperCase()),
          }));

        categories.push({
          slug: entry.name,
          name: entry.name
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase()),
          notes,
        });
      }
    }

    res.json({ categories });
  } catch (err) {
    next(err);
  }
});

// GET /api/notes/:category/:slug — Get markdown content for a specific note
router.get('/:category/:slug', async (req, res, next) => {
  try {
    const { category, slug } = req.params;

    // Sanitize paths to prevent directory traversal
    const safeCat = category.replace(/[^a-z0-9-]/gi, '');
    const safeSlug = slug.replace(/[^a-z0-9-]/gi, '');

    const filePath = join(CONTENT_DIR, safeCat, `${safeSlug}.md`);

    const content = await readFile(filePath, 'utf-8');

    res.json({
      category: safeCat,
      slug: safeSlug,
      content,
    });
  } catch (err) {
    if (err.code === 'ENOENT') {
      return res.status(404).json({ error: 'Note not found' });
    }
    next(err);
  }
});

export default router;
