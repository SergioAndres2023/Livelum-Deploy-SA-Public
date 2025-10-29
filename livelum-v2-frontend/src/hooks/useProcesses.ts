import { useState, useEffect } from 'react';
import { ProcessTypesService, ProcessNamesService } from '@/services/processes';
import { ProcessType, ProcessName } from '@/types/api';

interface ProcessesData {
  processTypes: ProcessType[];
  processNames: ProcessName[];
  loading: boolean;
  error: string | null;
}

export const useProcesses = () => {
  const [data, setData] = useState<ProcessesData>({
    processTypes: [],
    processNames: [],
    loading: true,
    error: null,
  });

  const fetchProcessesData = async () => {
    setData(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Obtener tipos de proceso y nombres de proceso en paralelo
      const [processTypesResponse, processNamesResponse] = await Promise.allSettled([
        ProcessTypesService.getProcessTypes(),
        ProcessNamesService.getProcessNames(),
      ]);

      const processTypes = processTypesResponse.status === 'fulfilled' 
        ? processTypesResponse.value.data || []
        : [];
      
      const processNames = processNamesResponse.status === 'fulfilled' 
        ? processNamesResponse.value.data || []
        : [];

      // Si hay errores, los registramos pero no bloqueamos la UI
      const errors = [];
      if (processTypesResponse.status === 'rejected') {
        console.error('Error fetching process types:', processTypesResponse.reason);
        errors.push('Tipos de proceso');
      }
      if (processNamesResponse.status === 'rejected') {
        console.error('Error fetching process names:', processNamesResponse.reason);
        errors.push('Nombres de proceso');
      }

      setData({
        processTypes,
        processNames,
        loading: false,
        error: errors.length > 0 ? `Error cargando: ${errors.join(', ')}` : null,
      });
    } catch (error) {
      console.error('Error fetching processes data:', error);
      setData(prev => ({
        ...prev,
        loading: false,
        error: 'Error al cargar los datos de procesos',
      }));
    }
  };

  useEffect(() => {
    fetchProcessesData();
  }, []);

  return {
    ...data,
    refetch: fetchProcessesData,
  };
};
