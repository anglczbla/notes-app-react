import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useNotes } from './useNotes.js';

export const useAddNotePage = () => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const navigate = useNavigate();
  const { addNote, loading } = useNotes();

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.description.trim()) {
      try {
        await addNote(formData.title, formData.description);
        navigate("/");
      } catch (error) {}
    }
  }, [formData, addNote, navigate]);

  const handleCancel = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return {
    formData,
    loading,
    handleInputChange,
    handleSubmit,
    handleCancel
  };
};
