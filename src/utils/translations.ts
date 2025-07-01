import { Language } from '../types';

export const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    newRequest: 'New Request',
    requests: 'Requests',
    responsiblePersons: 'Responsible Persons',
    reports: 'Reports',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    add: 'Add',
    search: 'Search',
    filter: 'Filter',
    export: 'Export',
    actions: 'Actions',
    
    // Request Form
    repairRequestNumber: 'Repair Request Number',
    repairRequestDate: 'Repair Request Date',
    repairRequester: 'Repair Requester',
    phoneNumber: 'Phone Number',
    companyName: 'Company Name',
    deviceModel: 'Device Model',
    deviceNumber: 'Device Number',
    damage: 'Damage',
    note: 'Note',
    warranty: 'Warranty',
    responsiblePerson: 'Responsible Person',
    taskStatus: 'Task Status',
    
    // Warranty Options
    underWarranty: 'Under warranty',
    outOfWarranty: 'Out of warranty',
    underMAContract: 'Under MA contract',
    outOfMAContract: 'Out of MA contract',
    
    // Status Options
    inProgress: 'In progress',
    completed: 'Completed',
    cancelled: 'Cancel operation',
    unableToProced: 'Cannot be executed',
    
    // Responsible Person Form
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    department: 'Department',
    
    // Messages
    requestCreated: 'Request created successfully',
    requestUpdated: 'Request updated successfully',
    requestDeleted: 'Request deleted successfully',
    personCreated: 'Person created successfully',
    personUpdated: 'Person updated successfully',
    personDeleted: 'Person deleted successfully',
    
    // Reports
    totalRequests: 'Total Requests',
    completedRequests: 'Completed Requests',
    pendingRequests: 'Pending Requests',
    exportPDF: 'Export PDF',
    exportExcel: 'Export Excel',
  },
  th: {
    // Navigation
    dashboard: 'แดชบอร์ด',
    newRequest: 'คำขอใหม่',
    requests: 'คำขอ',
    responsiblePersons: 'ผู้รับผิดชอบ',
    reports: 'รายงาน',
    
    // Common
    save: 'บันทึก',
    cancel: 'ยกเลิก',
    edit: 'แก้ไข',
    delete: 'ลบ',
    add: 'เพิ่ม',
    search: 'ค้นหา',
    filter: 'กรอง',
    export: 'ส่งออก',
    actions: 'การดำเนินการ',
    
    // Request Form
    repairRequestNumber: 'หมายเลขคำขอซ่อม',
    repairRequestDate: 'วันที่คำขอซ่อม',
    repairRequester: 'ผู้ขอซ่อม',
    phoneNumber: 'หมายเลขโทรศัพท์',
    companyName: 'ชื่อบริษัท',
    deviceModel: 'รุ่นอุปกรณ์',
    deviceNumber: 'หมายเลขอุปกรณ์',
    damage: 'ความเสียหาย',
    note: 'หมายเหตุ',
    warranty: 'การรับประกัน',
    responsiblePerson: 'ผู้รับผิดชอบ',
    taskStatus: 'สถานะงาน',
    
    // Warranty Options
    underWarranty: 'อยู่ในประกัน',
    outOfWarranty: 'หมดประกัน',
    underMAContract: 'อยู่ในสัญญา MA',
    outOfMAContract: 'หมดสัญญา MA',
    
    // Status Options
    inProgress: 'กำลังดำเนินการ',
    completed: 'เสร็จสิ้น',
    cancelled: 'ยกเลิกการดำเนินการ',
    unableToProced: 'ไม่สามารถดำเนินการได้',
    
    // Responsible Person Form
    name: 'ชื่อ',
    email: 'อีเมล',
    phone: 'โทรศัพท์',
    department: 'แผนก',
    
    // Messages
    requestCreated: 'สร้างคำขอเรียบร้อยแล้ว',
    requestUpdated: 'อัปเดตคำขอเรียบร้อยแล้ว',
    requestDeleted: 'ลบคำขอเรียบร้อยแล้ว',
    personCreated: 'สร้างข้อมูลบุคคลเรียบร้อยแล้ว',
    personUpdated: 'อัปเดตข้อมูลบุคคลเรียบร้อยแล้ว',
    personDeleted: 'ลบข้อมูลบุคคลเรียบร้อยแล้ว',
    
    // Reports
    totalRequests: 'คำขอทั้งหมด',
    completedRequests: 'คำขอที่เสร็จสิ้น',
    pendingRequests: 'คำขอที่รอดำเนินการ',
    exportPDF: 'ส่งออก PDF',
    exportExcel: 'ส่งออก Excel',
  },
};

export const t = (key: string, language: Language): string => {
  return translations[language][key as keyof typeof translations[Language]] || key;
};