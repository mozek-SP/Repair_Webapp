export interface RepairRequest {
  id: string;
  requestNumber: string;
  requestDate: string;
  requester: string;
  phoneNumber: string;
  companyName: string;
  deviceModel: string;
  deviceNumber: string;
  damage: string;
  note: string;
  warranty: 'under_warranty' | 'out_of_warranty' | 'under_ma_contract' | 'out_of_ma_contract';
  responsiblePersonId: string;
  status: 'in_progress' | 'completed' | 'cancelled' | 'unable_to_proceed';
  createdAt: string;
  updatedAt: string;
}

export interface ResponsiblePerson {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  createdAt: string;
}

export type Language = 'en' | 'th';

export type PageView = 'dashboard' | 'new-request' | 'requests' | 'responsible-persons' | 'reports';