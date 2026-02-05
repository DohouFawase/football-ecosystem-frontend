// hooks/useMatchScheduler.ts
import { useCallback } from 'react';
import { ScheduleConfig } from '../types/tournament.types';
import { useDateTimeFormatter } from './useDateTimeFormatter';

export const useMatchScheduler = (config: ScheduleConfig) => {
  const { formatDateTime } = useDateTimeFormatter();

  const calculateMatchDateTime = useCallback((matchIndex: number): Date | null => {
    if (!config.startDate || !config.startTime) return null;
    
    const [year, month, day] = config.startDate.split('-').map(Number);
    const [hours, minutes] = config.startTime.split(':').map(Number);
    const startDateTime = new Date(year, month - 1, day, hours, minutes);
    
    const daysPassed = Math.floor(matchIndex / config.matchesPerDay);
    const matchOfDay = matchIndex % config.matchesPerDay;
    const totalMinutes = matchOfDay * (config.matchDuration + config.breakBetweenMatches);
    
    const matchDateTime = new Date(startDateTime);
    matchDateTime.setDate(matchDateTime.getDate() + daysPassed);
    matchDateTime.setMinutes(matchDateTime.getMinutes() + totalMinutes);
    
    return matchDateTime;
  }, [config]);

  const getMatchScheduleInfo = useCallback((matchIndex: number) => {
    const matchDateTime = calculateMatchDateTime(matchIndex);
    return formatDateTime(matchDateTime);
  }, [calculateMatchDateTime, formatDateTime]);

  return { calculateMatchDateTime, getMatchScheduleInfo };
};