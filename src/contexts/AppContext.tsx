import React, { createContext, useContext, useState, useEffect } from 'react';
import { RepairRequest, ResponsiblePerson, Language } from '../types';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  requests: RepairRequest[];
  responsiblePersons: ResponsiblePerson[];
  addRequest: (request: Omit<RepairRequest, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateRequest: (id: string, request: Partial<RepairRequest>) => void;
  deleteRequest: (id: string) => void;
  addResponsiblePerson: (person: Omit<ResponsiblePerson, 'id' | 'createdAt'>) => void;
  updateResponsiblePerson: (id: string, person: Partial<ResponsiblePerson>) => void;
  deleteResponsiblePerson: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [requests, setRequests] = useState<RepairRequest[]>([]);
  const [responsiblePersons, setResponsiblePersons] = useState<ResponsiblePerson[]>([]);

  // Initialize with sample data
  useEffect(() => {
    const samplePersons: ResponsiblePerson[] = [
      {
        id: '1',
        name: 'John Smith / จอห์น สมิธ',
        email: 'john@company.com',
        phone: '+66-2-123-4567',
        department: 'IT Support / ฝ่ายสนับสนุน IT',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Sarah Johnson / ซาร่าห์ จอห์นสัน',
        email: 'sarah@company.com',
        phone: '+66-2-234-5678',
        department: 'Technical / ฝ่ายเทคนิค',
        createdAt: new Date().toISOString(),
      },
    ];

    const sampleRequests: RepairRequest[] = [
      {
        id: '1',
        requestNumber: 'REQ-2024-001',
        requestDate: '2024-01-15',
        requester: 'Alice Brown / อลิซ บราวน์',
        phoneNumber: '+66-81-123-4567',
        companyName: 'Tech Solutions Ltd. / เทค โซลูชั่น จำกัด',
        deviceModel: 'MacBook Pro 14"',
        deviceNumber: 'MB001234',
        damage: 'Screen cracked / หน้าจอแตก',
        note: 'Dropped from desk / ตกจากโต๊ะ',
        warranty: 'under_warranty',
        responsiblePersonId: '1',
        status: 'in_progress',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    setResponsiblePersons(samplePersons);
    setRequests(sampleRequests);
  }, []);

  const addRequest = (request: Omit<RepairRequest, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newRequest: RepairRequest = {
      ...request,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setRequests(prev => [...prev, newRequest]);
  };

  const updateRequest = (id: string, updates: Partial<RepairRequest>) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === id
          ? { ...req, ...updates, updatedAt: new Date().toISOString() }
          : req
      )
    );
  };

  const deleteRequest = (id: string) => {
    setRequests(prev => prev.filter(req => req.id !== id));
  };

  const addResponsiblePerson = (person: Omit<ResponsiblePerson, 'id' | 'createdAt'>) => {
    const newPerson: ResponsiblePerson = {
      ...person,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setResponsiblePersons(prev => [...prev, newPerson]);
  };

  const updateResponsiblePerson = (id: string, updates: Partial<ResponsiblePerson>) => {
    setResponsiblePersons(prev =>
      prev.map(person =>
        person.id === id ? { ...person, ...updates } : person
      )
    );
  };

  const deleteResponsiblePerson = (id: string) => {
    setResponsiblePersons(prev => prev.filter(person => person.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        requests,
        responsiblePersons,
        addRequest,
        updateRequest,
        deleteRequest,
        addResponsiblePerson,
        updateResponsiblePerson,
        deleteResponsiblePerson,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};