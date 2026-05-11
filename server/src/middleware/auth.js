import jwt from 'jsonwebtoken';

// JWT verification middleware — protects routes
export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('[AUTH] Authorization header:', authHeader ? `Bearer ${authHeader.split(' ')[1]?.substring(0, 20)}...` : 'MISSING');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('[AUTH] Decoded JWT:', decoded);
    req.user = decoded; // { user_id, email, role } // Attach user payload to request
    next();
  } catch (err) {
    console.error('[AUTH] JWT verify error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Optional: role-based guard
export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};
