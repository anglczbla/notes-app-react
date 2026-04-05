import { useState, useCallback } from 'react';
import { useAuth } from './useAuth.js';

export const useLogin = () => {
  const { login, register, loading, error: authError } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [localError, setLocalError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const error = localError || authError;

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (localError) setLocalError('');
  }, [localError]);

  const validateForm = useCallback(() => {
    if (!formData.email.trim()) {
      setLocalError('Email tidak boleh kosong');
      return false;
    }
    if (!formData.password.trim()) {
      setLocalError('Password tidak boleh kosong');
      return false;
    }
    if (formData.password.length < 6) {
      setLocalError('Password minimal 6 karakter');
      return false;
    }
    if (isRegisterMode) {
      if (!formData.name.trim()) {
        setLocalError('Nama tidak boleh kosong');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setLocalError('Password dan konfirmasi password tidak sama');
        return false;
      }
    }
    return true;
  }, [formData, isRegisterMode]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      if (isRegisterMode) {
        await register(formData.name, formData.email, formData.password);
        await login(formData.email, formData.password);
      } else {
        await login(formData.email, formData.password);
      }
    } catch (err) {}
  }, [validateForm, isRegisterMode, formData, login, register]);

  const toggleMode = useCallback(() => {
    setIsRegisterMode(prev => !prev);
    setLocalError('');
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  }, []);

  return {
    isRegisterMode,
    formData,
    loading,
    error,
    handleInputChange,
    handleSubmit,
    toggleMode
  };
};
