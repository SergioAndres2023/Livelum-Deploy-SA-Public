import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown, Loader2 } from 'lucide-react';

export interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  centered?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  emptyMessage?: string;
  onSort?: (key: string) => void;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  emptyMessage = 'No se encontraron datos',
  onSort,
  sortBy,
  sortOrder = 'asc',
  className = ''
}: DataTableProps<T>) {
  const handleSort = (key: string) => {
    if (onSort) {
      onSort(key);
    }
  };

  return (
    <div className={`rounded-md border ${className}`}>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            {columns.map((column) => (
              <TableHead
                key={String(column.key)}
                className={`${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''} ${
                  column.centered ? 'text-center' : ''
                } ${column.className || ''}`}
                onClick={column.sortable ? () => handleSort(column.key) : undefined}
              >
                {column.sortable ? (
                  <div className={`flex items-center gap-2 ${column.centered ? 'justify-center' : ''}`}>
                    {column.label}
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                ) : (
                  column.label
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-8">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                <p className="text-sm text-muted-foreground mt-2">Cargando datos...</p>
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-8">
                <div className="w-12 h-12 mx-auto text-muted-foreground mb-2">⚠</div>
                <p className="text-sm text-muted-foreground">{emptyMessage}</p>
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, index) => (
              <TableRow key={item.id || index} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <TableCell
                    key={String(column.key)}
                    className={`${column.centered ? 'text-center' : ''} ${
                      column.className || ''
                    }`}
                  >
                    {column.render ? (
                      column.render(item)
                    ) : (
                      <div className={column.centered ? 'font-medium' : ''}>
                        {item[column.key] || '-'}
                      </div>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

// Componente para badges de estado
export const StatusBadge = ({ 
  status, 
  variant = 'default' 
}: { 
  status: string; 
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}) => {
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'activo':
      case 'active':
      case 'riesgo':
        return 'destructive';
      case 'monitoreado':
      case 'monitored':
        return 'outline';
      case 'mitigado':
      case 'mitigated':
      case 'oportunidad':
        return 'secondary';
      case 'interno':
        return 'default';
      case 'externo':
        return 'outline';
      default:
        return variant;
    }
  };

  return (
    <Badge variant={getStatusVariant(status)}>
      {status}
    </Badge>
  );
};

// Componente para badges de valor
export const ValueBadge = ({ 
  value, 
  type = 'value' 
}: { 
  value: number; 
  type?: 'value' | 'assessment';
}) => {
  const getValueVariant = (value: number, type: string) => {
    if (type === 'assessment') {
      switch (value) {
        case 9:
        case 6:
          return 'destructive';
        case 4:
          return 'outline';
        case 3:
        case 2:
          return 'secondary';
        default:
          return 'default';
      }
    } else {
      if (value >= 6) return 'destructive';
      if (value >= 4) return 'outline';
      if (value >= 2) return 'secondary';
      return 'default';
    }
  };

  const getValueColor = (value: number, type: string) => {
    if (type === 'assessment') {
      switch (value) {
        case 9:
        case 6:
          return 'bg-red-100 text-red-800 border-red-200';
        case 4:
          return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 3:
        case 2:
          return 'bg-green-100 text-green-800 border-green-200';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    } else {
      if (value >= 6) return 'bg-red-100 text-red-800 border-red-200';
      if (value >= 4) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      if (value >= 2) return 'bg-green-100 text-green-800 border-green-200';
      return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Badge className={getValueColor(value, type)}>
      {value}
    </Badge>
  );
};
