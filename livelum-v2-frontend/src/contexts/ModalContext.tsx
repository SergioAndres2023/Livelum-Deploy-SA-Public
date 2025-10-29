import React, { createContext, useContext, useState, ReactNode } from 'react';

// Tipos de modales disponibles
export type ModalType = 
  | 'document'
  | 'process'
  | 'indicator'
  | 'risk'
  | 'objective'
  | 'audit'
  | 'maintenance'
  | 'finances'
  | 'onboarding'
  | 'onboarding-edit'
  | 'personal-list'
  | 'process-type'
  | 'process-name';

interface ModalState {
  [key: string]: boolean;
}

interface ModalContextType {
  isOpen: (modalType: ModalType) => boolean;
  open: (modalType: ModalType) => void;
  close: (modalType: ModalType) => void;
  toggle: (modalType: ModalType) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = (modalType?: ModalType) => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  // Si se proporciona un modalType específico, devolver métodos específicos para ese modal
  if (modalType) {
    return {
      isOpen: context.isOpen(modalType),
      open: () => context.open(modalType),
      close: () => context.close(modalType),
      toggle: () => context.toggle(modalType),
    };
  }

  // Si no, devolver el contexto completo
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modalState, setModalState] = useState<ModalState>({
    document: false,
    process: false,
    indicator: false,
    risk: false,
    objective: false,
    audit: false,
    maintenance: false,
    finances: false,
    onboarding: false,
    'onboarding-edit': false,
    'personal-list': false,
    'process-type': false,
    'process-name': false,
  });

  const isOpen = (modalType: ModalType): boolean => {
    return modalState[modalType] || false;
  };

  const open = (modalType: ModalType) => {
    setModalState(prev => ({ ...prev, [modalType]: true }));
  };

  const close = (modalType: ModalType) => {
    setModalState(prev => ({ ...prev, [modalType]: false }));
  };

  const toggle = (modalType: ModalType) => {
    setModalState(prev => ({ ...prev, [modalType]: !prev[modalType] }));
  };

  return (
    <ModalContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </ModalContext.Provider>
  );
};

