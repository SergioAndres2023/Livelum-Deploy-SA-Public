import { Document } from '@/documents/domain/entities/Document';
import { DocumentType, DocumentStatus } from '@/documents/domain/enums/DocumentEnums';

describe('Document', () => {
  it('should create a document instance', () => {
    const document = Document.create({
      code: 'DOC-001',
      title: 'Manual de Procesos Administrativos',
      description: 'Manual que describe los procesos administrativos de la empresa',
      type: DocumentType.MANUAL,
      author: 'María García',
      expiryDate: new Date('2024-12-31'),
    });

    expect(document).toBeInstanceOf(Document);
    expect(document.code).toBe('DOC-001');
    expect(document.title).toBe('Manual de Procesos Administrativos');
    expect(document.description).toBe('Manual que describe los procesos administrativos de la empresa');
    expect(document.type).toBe(DocumentType.MANUAL);
    expect(document.status).toBe(DocumentStatus.BORRADOR);
    expect(document.author).toBe('María García');
    expect(document.version).toBe('1.0');
    expect(document.id).toBeDefined();
    expect(document.createdAt).toBeInstanceOf(Date);
    expect(document.updatedAt).toBeInstanceOf(Date);
  });

  it('should update document properties', () => {
    const document = Document.create({
      code: 'DOC-001',
      title: 'Manual Original',
      type: DocumentType.MANUAL,
      author: 'María García',
    });

    document.updateInfo({
      title: 'Manual Actualizado',
      description: 'Nueva descripción',
      type: DocumentType.PROCEDIMIENTO,
    });

    expect(document.title).toBe('Manual Actualizado');
    expect(document.description).toBe('Nueva descripción');
    expect(document.type).toBe(DocumentType.PROCEDIMIENTO);
    expect(document.updatedAt).toBeInstanceOf(Date);
    expect(document.updatedAt > document.createdAt).toBe(true);
  });

  it('should increment version when updating significant fields', () => {
    const document = Document.create({
      code: 'DOC-001',
      title: 'Manual Original',
      type: DocumentType.MANUAL,
      author: 'María García',
    });

    const originalVersion = document.version;
    document.updateInfo({
      title: 'Manual Actualizado',
    });
    document.incrementVersion();

    expect(document.version).not.toBe(originalVersion);
    expect(document.version).toBe('1.1');
  });

  it('should approve document', () => {
    const document = Document.create({
      code: 'DOC-001',
      title: 'Manual de Procesos',
      type: DocumentType.MANUAL,
      author: 'María García',
    });

    // Enviar a revisión primero
    document.sendToReview();
    expect(document.status).toBe(DocumentStatus.EN_REVISION);

    // Aprobar
    document.approve();
    expect(document.status).toBe(DocumentStatus.APROBADO);
  });

  it('should reject document', () => {
    const document = Document.create({
      code: 'DOC-001',
      title: 'Manual de Procesos',
      type: DocumentType.MANUAL,
      author: 'María García',
    });

    // Enviar a revisión primero
    document.sendToReview();
    expect(document.status).toBe(DocumentStatus.EN_REVISION);

    // Rechazar
    document.reject();
    expect(document.status).toBe(DocumentStatus.BORRADOR);
  });

  it('should archive document', () => {
    const document = Document.create({
      code: 'DOC-001',
      title: 'Manual de Procesos',
      type: DocumentType.MANUAL,
      author: 'María García',
    });

    document.archive();
    expect(document.status).toBe(DocumentStatus.VENCIDO);
  });

  it('should attach file information', () => {
    const document = Document.create({
      code: 'DOC-001',
      title: 'Manual de Procesos',
      type: DocumentType.MANUAL,
      author: 'María García',
    });

    document.attachFile(
      'https://s3.amazonaws.com/bucket/document.pdf',
      'manual.pdf',
      1024000,
      'application/pdf'
    );

    expect(document.fileUrl).toBe('https://s3.amazonaws.com/bucket/document.pdf');
    expect(document.fileName).toBe('manual.pdf');
    expect(document.fileSize).toBe(1024000);
    expect(document.mimeType).toBe('application/pdf');
  });

  it('should check if document is expired', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);

    const document = Document.create({
      code: 'DOC-001',
      title: 'Manual de Procesos',
      type: DocumentType.MANUAL,
      author: 'María García',
      expiryDate: pastDate,
    });

    expect(document.isExpired()).toBe(true);
  });

  it('should check if document is expiring soon', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 15); // 15 días en el futuro

    const document = Document.create({
      code: 'DOC-001',
      title: 'Manual de Procesos',
      type: DocumentType.MANUAL,
      author: 'María García',
      expiryDate: futureDate,
    });

    expect(document.isExpiringSoon(30)).toBe(true);
    expect(document.isExpiringSoon(10)).toBe(false);
  });

  it('should validate document creation', () => {
    expect(() => {
      Document.create({
        code: 'AB', // Muy corto
        title: 'Manual de Procesos',
        type: DocumentType.MANUAL,
        author: 'María García',
      });
    }).toThrow('El código debe tener al menos 3 caracteres');

    expect(() => {
      Document.create({
        code: 'DOC-001',
        title: 'A', // Muy corto
        type: DocumentType.MANUAL,
        author: 'María García',
      });
    }).toThrow('El título debe tener al menos 2 caracteres');

    expect(() => {
      Document.create({
        code: 'DOC-001',
        title: 'Manual de Procesos',
        type: DocumentType.MANUAL,
        author: 'A', // Muy corto
      });
    }).toThrow('El autor debe tener al menos 2 caracteres');
  });

  it('should validate expiry date', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);

    expect(() => {
      Document.create({
        code: 'DOC-001',
        title: 'Manual de Procesos',
        type: DocumentType.MANUAL,
        author: 'María García',
        expiryDate: pastDate,
      });
    }).toThrow('La fecha de vencimiento debe ser posterior a la fecha de creación');
  });

  it('should prevent invalid state transitions', () => {
    const document = Document.create({
      code: 'DOC-001',
      title: 'Manual de Procesos',
      type: DocumentType.MANUAL,
      author: 'María García',
    });

    // No se puede aprobar un documento en borrador
    expect(() => {
      document.approve();
    }).toThrow('Solo se pueden aprobar documentos en revisión');

    // No se puede rechazar un documento en borrador
    expect(() => {
      document.reject();
    }).toThrow('Solo se pueden rechazar documentos en revisión');
  });

  it('should convert to primitives', () => {
    const document = Document.create({
      code: 'DOC-001',
      title: 'Manual de Procesos',
      type: DocumentType.MANUAL,
      author: 'María García',
    });

    const primitives = document.toPrimitives();

    expect(primitives).toHaveProperty('id');
    expect(primitives).toHaveProperty('code', 'DOC-001');
    expect(primitives).toHaveProperty('title', 'Manual de Procesos');
    expect(primitives).toHaveProperty('type', DocumentType.MANUAL);
    expect(primitives).toHaveProperty('status', DocumentStatus.BORRADOR);
    expect(primitives).toHaveProperty('author', 'María García');
    expect(primitives).toHaveProperty('version', '1.0');
    expect(primitives).toHaveProperty('createdAt');
    expect(primitives).toHaveProperty('updatedAt');
  });
});
