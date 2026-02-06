import { useMemo } from 'react';

interface DateTimeFormat {
  date: string;
  time: string;
  dayName: string;
  fullDate: string;
}

export const useDateTimeFormatter = () => {
  const formatDateTime = useMemo(() => {
    return (date: Date | null): DateTimeFormat => {
      if (!date) return { date: '', time: '', dayName: '', fullDate: '' };
      
      const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
      const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
      
      const dayName = days[date.getDay()];
      const formattedDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
      const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
      const fullDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      
      return { date: formattedDate, time: formattedTime, dayName, fullDate };
    };
  }, []);

  return { formatDateTime };
};