import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectNoteById } from "../store/notesSlice.js";
import { getSingleNote } from "../utils/index.js";
import { useNotes } from "./useNotes.js";

export const useNoteDetailPage = () => {
  const { id } = useParams();
  const { loading: notesLoading, loadNotes } = useNotes();
  const noteFromStore = useSelector(state => selectNoteById(state, id));
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNoteDetail = async () => {
      if (noteFromStore) {
        setNote(noteFromStore);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      try {
        const response = await getSingleNote(id);
        setNote(response.data);
      } catch (err) {
        setError('Gagal memuat detail catatan');
      } finally {
        setLoading(false);
      }
    };
    loadNoteDetail();
  }, [id, noteFromStore]);

  useEffect(() => {
    if (!noteFromStore) {
      loadNotes();
    }
  }, [noteFromStore, loadNotes]);

  return {
    note,
    loading: loading || (notesLoading && !note),
    error
  };
};
