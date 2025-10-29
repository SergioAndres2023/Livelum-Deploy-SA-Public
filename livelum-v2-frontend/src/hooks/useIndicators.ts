import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Indicator {
  id: string;
  title: string;
  description?: string;
  current_value: number | null;
  target_value: number | null;
  unit: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export const useIndicators = () => {
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIndicators = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('objectives')
        .select('id, title, description, current_value, target_value, unit, status, created_at, updated_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setIndicators(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching indicators');
    } finally {
      setLoading(false);
    }
  };

  const getIndicatorsByStatus = () => {
    // Map objective status to indicator status categories
    const getStatusCategory = (status: string) => {
      const lowerStatus = status.toLowerCase();
      if (lowerStatus.includes('completado') || lowerStatus.includes('completed') || lowerStatus === 'good') return 'good';
      if (lowerStatus.includes('progreso') || lowerStatus.includes('progress') || lowerStatus === 'warning') return 'warning';
      if (lowerStatus.includes('atrasado') || lowerStatus.includes('delayed') || lowerStatus === 'critical') return 'critical';
      return 'warning'; // default
    };

    const good = indicators.filter(i => getStatusCategory(i.status) === 'good').length;
    const warning = indicators.filter(i => getStatusCategory(i.status) === 'warning').length;
    const critical = indicators.filter(i => getStatusCategory(i.status) === 'critical').length;
    
    return { good, warning, critical, total: indicators.length };
  };

  const getProgressValue = (current: number | null, target: number | null): number => {
    if (!target || target === 0 || !current) return 0;
    return Math.round((current / target) * 100);
  };

  useEffect(() => {
    fetchIndicators();
  }, []);

  return {
    indicators,
    loading,
    error,
    refetch: fetchIndicators,
    getIndicatorsByStatus,
    getProgressValue
  };
};