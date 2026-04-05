import { useCallback, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNotes } from './useNotes.js';

export const useHome = () => {
  const { 
    activeNotes, 
    archivedNotes, 
    loading, 
    error, 
    deleteNote, 
    loadNotes 
  } = useNotes();
  
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const currentTab = searchParams.get("tab") || "active";

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const handleDeleteNote = useCallback((id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus catatan ini?")) {
      deleteNote(id);
    }
  }, [deleteNote]);

  const handleSearchChange = useCallback((e) => {
    const newSearch = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (newSearch) {
      newParams.set("search", newSearch);
    } else {
      newParams.delete("search");
    }
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  const handleTabChange = useCallback((tab) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("tab", tab);
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  const clearSearch = useCallback(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("search");
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  const filteredNotes = useMemo(() => {
    const notes = currentTab === "active" ? activeNotes : archivedNotes;
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.body.toLowerCase().includes(search.toLowerCase())
    );
  }, [currentTab, activeNotes, archivedNotes, search]);

  return {
    search,
    currentTab,
    filteredNotes,
    activeCount: activeNotes.length,
    archivedCount: archivedNotes.length,
    loading,
    error,
    handleDeleteNote,
    handleSearchChange,
    handleTabChange,
    clearSearch,
    loadNotes
  };
};
