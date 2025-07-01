import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { RepairRequest, ResponsiblePerson, Language } from '../types';
import { t } from './translations';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => void;
  }
}

export const exportToPDF = (
  requests: RepairRequest[],
  responsiblePersons: ResponsiblePerson[],
  language: Language
) => {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(16);
  doc.text(language === 'en' ? 'Repair Requests Report' : 'รายงานคำขอซ่อม', 14, 15);
  
  // Create table data
  const tableData = requests.map(request => {
    const responsible = responsiblePersons.find(p => p.id === request.responsiblePersonId);
    return [
      request.requestNumber,
      request.requestDate,
      request.requester,
      request.companyName,
      request.deviceModel,
      t(request.status, language),
      responsible?.name || 'N/A',
    ];
  });
  
  doc.autoTable({
    head: [[
      t('repairRequestNumber', language),
      t('repairRequestDate', language),
      t('repairRequester', language),
      t('companyName', language),
      t('deviceModel', language),
      t('taskStatus', language),
      t('responsiblePerson', language),
    ]],
    body: tableData,
    startY: 25,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [37, 99, 235] },
  });
  
  doc.save(`repair-requests-${new Date().toISOString().split('T')[0]}.pdf`);
};

export const exportToExcel = (
  requests: RepairRequest[],
  responsiblePersons: ResponsiblePerson[],
  language: Language
) => {
  const worksheetData = requests.map(request => {
    const responsible = responsiblePersons.find(p => p.id === request.responsiblePersonId);
    return {
      [t('repairRequestNumber', language)]: request.requestNumber,
      [t('repairRequestDate', language)]: request.requestDate,
      [t('repairRequester', language)]: request.requester,
      [t('phoneNumber', language)]: request.phoneNumber,
      [t('companyName', language)]: request.companyName,
      [t('deviceModel', language)]: request.deviceModel,
      [t('deviceNumber', language)]: request.deviceNumber,
      [t('damage', language)]: request.damage,
      [t('note', language)]: request.note,
      [t('warranty', language)]: t(request.warranty, language),
      [t('taskStatus', language)]: t(request.status, language),
      [t('responsiblePerson', language)]: responsible?.name || 'N/A',
    };
  });
  
  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Repair Requests');
  
  XLSX.writeFile(workbook, `repair-requests-${new Date().toISOString().split('T')[0]}.xlsx`);
};