import { useState, useEffect } from 'react';
import { DocumentsService } from '@/services/documents';
import { AuditsService } from '@/services/audits';
import { RisksService } from '@/services/risks';
import { DocumentStats, AuditStats, RiskStats } from '@/types/api';

interface DashboardData {
  documentStats: DocumentStats | null;
  auditStats: AuditStats | null;
  riskStats: RiskStats | null;
  loading: boolean;
  error: string | null;
}

export const useDashboard = () => {
  const [data, setData] = useState<DashboardData>({
    documentStats: null,
    auditStats: null,
    riskStats: null,
    loading: true,
    error: null,
  });

  const fetchDashboardData = async () => {
    setData(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Hacer las llamadas en paralelo para mejor rendimiento
      const [documentsResponse, auditsResponse, risksResponse] = await Promise.allSettled([
        DocumentsService.getStats(),
        AuditsService.getStats(),
        RisksService.getStats(),
      ]);

      const documentStats = documentsResponse.status === 'fulfilled' 
        ? documentsResponse.value.data 
        : null;
      
      const auditStats = auditsResponse.status === 'fulfilled' 
        ? auditsResponse.value.data 
        : null;
      
      const riskStats = risksResponse.status === 'fulfilled' 
        ? risksResponse.value.data 
        : null;

      // Si hay errores, los registramos pero no bloqueamos la UI
      const errors = [];
      if (documentsResponse.status === 'rejected') {
        console.error('Error fetching document stats:', documentsResponse.reason);
        errors.push('Estadísticas de documentos');
      }
      if (auditsResponse.status === 'rejected') {
        console.error('Error fetching audit stats:', auditsResponse.reason);
        errors.push('Estadísticas de auditorías');
      }
      if (risksResponse.status === 'rejected') {
        console.error('Error fetching risk stats:', risksResponse.reason);
        errors.push('Estadísticas de riesgos');
      }

      setData({
        documentStats,
        auditStats,
        riskStats,
        loading: false,
        error: errors.length > 0 ? `Error cargando: ${errors.join(', ')}` : null,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setData(prev => ({
        ...prev,
        loading: false,
        error: 'Error al cargar los datos del dashboard',
      }));
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    ...data,
    refetch: fetchDashboardData,
  };
};
