const API_BASE_URL = 'https://notes-api.dicoding.dev/v1';

// Auth Functions
const register = async (name, email, password) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }
  
  return data;
};

const login = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }
  
  // Store access token in localStorage
  if (data.data && data.data.accessToken) {
    localStorage.setItem('accessToken', data.data.accessToken);
  }
  
  return data;
};

const getLoggedUser = async () => {
  const token = localStorage.getItem('accessToken');
  
  if (!token) {
    throw new Error('No access token found');
  }
  
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to get user data');
  }
  
  return data;
};

// Notes Functions
const createNote = async (title, body) => {
  const token = localStorage.getItem('accessToken');
  
  if (!token) {
    throw new Error('No access token found');
  }
  
  const response = await fetch(`${API_BASE_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ title, body }),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to create note');
  }
  
  return data;
};

const getNotes = async () => {
  const token = localStorage.getItem('accessToken');
  
  if (!token) {
    throw new Error('No access token found');
  }
  
  const response = await fetch(`${API_BASE_URL}/notes`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to get notes');
  }
  
  return data;
};

const getArchivedNotes = async () => {
  const token = localStorage.getItem('accessToken');
  
  if (!token) {
    throw new Error('No access token found');
  }
  
  const response = await fetch(`${API_BASE_URL}/notes/archived`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to get archived notes');
  }
  
  return data;
};

const getSingleNote = async (noteId) => {
  const token = localStorage.getItem('accessToken');
  
  if (!token) {
    throw new Error('No access token found');
  }
  
  const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to get note');
  }
  
  return data;
};

const archiveNote = async (noteId) => {
  const token = localStorage.getItem('accessToken');
  
  if (!token) {
    throw new Error('No access token found');
  }
  
  const response = await fetch(`${API_BASE_URL}/notes/${noteId}/archive`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to archive note');
  }
  
  return data;
};

const unarchiveNote = async (noteId) => {
  const token = localStorage.getItem('accessToken');
  
  if (!token) {
    throw new Error('No access token found');
  }
  
  const response = await fetch(`${API_BASE_URL}/notes/${noteId}/unarchive`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  const data = await response.json();
  
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to unarchive note');
  }
  
  return data;
};

const deleteNote = async (noteId) => {
  const token = localStorage.getItem('accessToken');
  
  if (!token) {
    throw new Error('No access token found');
  }
  
  const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete note');
  }
  
  return data;
};

// Utility function to format date
const showFormattedDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  return new Date(date).toLocaleDateString("id-ID", options);
};

// Utility function to check if user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem('accessToken') !== null;
};

// Utility function to logout
const logout = () => {
  localStorage.removeItem('accessToken');
};

// Replace getInitialData with API calls
const getInitialData = async () => {
  try {
    const response = await getNotes();
    return response.data || [];
  } catch (error) {
    console.error('Failed to load initial data:', error);
    return [];
  }
};

// Export all functions
export {
  // Auth functions
  register,
  login,
  logout,
  getLoggedUser,
  isAuthenticated,
  
  // Notes functions
  createNote,
  getNotes,
  getArchivedNotes,
  getSingleNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
  
  // Utility functions
  showFormattedDate,
  getInitialData,
};