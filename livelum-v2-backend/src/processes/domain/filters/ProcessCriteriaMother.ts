import { ProcessSheetSearchCriteria } from '../contracts/ProcessSheetRepository';
import { ProcessStatus } from '../enums/ProcessEnums';

export class ProcessCriteriaMother {
  private criteria: ProcessSheetSearchCriteria = {};

  static create(): ProcessCriteriaMother {
    return new ProcessCriteriaMother();
  }

  byName(name: string): ProcessCriteriaMother {
    this.criteria.name = name;
    return this;
  }

  byCode(code: string): ProcessCriteriaMother {
    this.criteria.code = code;
    return this;
  }

  byProcessTypeId(processTypeId: string): ProcessCriteriaMother {
    this.criteria.processTypeId = processTypeId;
    return this;
  }

  byProcessNameId(processNameId: string): ProcessCriteriaMother {
    this.criteria.processNameId = processNameId;
    return this;
  }

  byStatus(status: ProcessStatus): ProcessCriteriaMother {
    this.criteria.status = status;
    return this;
  }

  byResponsible(responsible: string): ProcessCriteriaMother {
    this.criteria.responsible = responsible;
    return this;
  }

  authorized(): ProcessCriteriaMother {
    this.criteria.status = ProcessStatus.AUTORIZADO;
    return this;
  }

  draft(): ProcessCriteriaMother {
    this.criteria.status = ProcessStatus.BORRADOR;
    return this;
  }

  archived(): ProcessCriteriaMother {
    this.criteria.status = ProcessStatus.ARCHIVADO;
    return this;
  }

  latestVersions(): ProcessCriteriaMother {
    this.criteria.latestVersions = true;
    return this;
  }

  withVersionHistory(): ProcessCriteriaMother {
    this.criteria.withVersionHistory = true;
    return this;
  }

  withPagination(page: number, limit: number): ProcessCriteriaMother {
    this.criteria.page = page;
    this.criteria.limit = limit;
    return this;
  }

  withSorting(sortBy: string, sortOrder: 'asc' | 'desc' = 'asc'): ProcessCriteriaMother {
    this.criteria.sortBy = sortBy;
    this.criteria.sortOrder = sortOrder;
    return this;
  }

  build(): ProcessSheetSearchCriteria {
    return { ...this.criteria };
  }
}
