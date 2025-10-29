import { DocumentSearchCriteria } from '../contracts/DocumentRepository';
import { DocumentType, DocumentStatus } from '../enums/DocumentEnums';

export class DocumentSearchCriteriaBuilder {
  private criteria: DocumentSearchCriteria = {};

  static create(): DocumentSearchCriteriaBuilder {
    return new DocumentSearchCriteriaBuilder();
  }

  byTitle(title: string): DocumentSearchCriteriaBuilder {
    this.criteria.title = title;
    return this;
  }

  byCode(code: string): DocumentSearchCriteriaBuilder {
    this.criteria.code = code;
    return this;
  }

  byType(type: DocumentType): DocumentSearchCriteriaBuilder {
    this.criteria.type = type;
    return this;
  }

  byStatus(status: DocumentStatus): DocumentSearchCriteriaBuilder {
    this.criteria.status = status;
    return this;
  }

  byAuthor(author: string): DocumentSearchCriteriaBuilder {
    this.criteria.author = author;
    return this;
  }

  expiringSoon(): DocumentSearchCriteriaBuilder {
    this.criteria.expiringSoon = true;
    return this;
  }

  expired(): DocumentSearchCriteriaBuilder {
    this.criteria.expired = true;
    return this;
  }

  approved(): DocumentSearchCriteriaBuilder {
    this.criteria.status = DocumentStatus.APROBADO;
    return this;
  }

  inReview(): DocumentSearchCriteriaBuilder {
    this.criteria.status = DocumentStatus.EN_REVISION;
    return this;
  }

  draft(): DocumentSearchCriteriaBuilder {
    this.criteria.status = DocumentStatus.BORRADOR;
    return this;
  }

  withPagination(page: number, limit: number): DocumentSearchCriteriaBuilder {
    this.criteria.page = page;
    this.criteria.limit = limit;
    return this;
  }

  withSorting(sortBy: string, sortOrder: 'asc' | 'desc'): DocumentSearchCriteriaBuilder {
    this.criteria.sortBy = sortBy;
    this.criteria.sortOrder = sortOrder;
    return this;
  }

  build(): DocumentSearchCriteria {
    return { ...this.criteria };
  }
}

export class DocumentCriteriaMother {
  static createBasicCriteria(): DocumentSearchCriteria {
    return DocumentSearchCriteriaBuilder.create()
      .withPagination(1, 10)
      .withSorting('createdAt', 'desc')
      .build();
  }

  static createByTypeCriteria(type: DocumentType): DocumentSearchCriteria {
    return DocumentSearchCriteriaBuilder.create()
      .byType(type)
      .withPagination(1, 10)
      .withSorting('createdAt', 'desc')
      .build();
  }

  static createByStatusCriteria(status: DocumentStatus): DocumentSearchCriteria {
    return DocumentSearchCriteriaBuilder.create()
      .byStatus(status)
      .withPagination(1, 10)
      .withSorting('createdAt', 'desc')
      .build();
  }

  static createExpiringSoonCriteria(): DocumentSearchCriteria {
    return DocumentSearchCriteriaBuilder.create()
      .expiringSoon()
      .withPagination(1, 10)
      .withSorting('expiryDate', 'asc')
      .build();
  }

  static createExpiredCriteria(): DocumentSearchCriteria {
    return DocumentSearchCriteriaBuilder.create()
      .expired()
      .withPagination(1, 10)
      .withSorting('expiryDate', 'desc')
      .build();
  }

  static createSearchCriteria(searchTerm: string): DocumentSearchCriteria {
    return DocumentSearchCriteriaBuilder.create()
      .byTitle(searchTerm)
      .withPagination(1, 10)
      .withSorting('createdAt', 'desc')
      .build();
  }
}
