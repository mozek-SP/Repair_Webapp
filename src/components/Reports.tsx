import React, { useState } from 'react';
import { Download, FileText, Calendar, BarChart, Filter, CheckCircle, Clock, XCircle, AlertTriangle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';
import { exportToPDF, exportToExcel } from '../utils/exportUtils';

const Reports: React.FC = () => {
  const { requests, responsiblePersons, language } = useApp();
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });
  const [statusFilter, setStatusFilter] = useState('all');
  const [responsiblePersonFilter, setResponsiblePersonFilter] = useState('all');

  const filteredRequests = requests.filter(request => {
    const requestDate = new Date(request.requestDate);
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    const dateMatch = requestDate >= startDate && requestDate <= endDate;
    const statusMatch = statusFilter === 'all' || request.status === statusFilter;
    const personMatch = responsiblePersonFilter === 'all' || request.responsiblePersonId === responsiblePersonFilter;
    return dateMatch && statusMatch && personMatch;
  });

  const stats = {
    total: filteredRequests.length,
    completed: filteredRequests.filter(r => r.status === 'completed').length,
    inProgress: filteredRequests.filter(r => r.status === 'in_progress').length,
    cancelled: filteredRequests.filter(r => r.status === 'cancelled').length,
    unableToProced: filteredRequests.filter(r => r.status === 'unable_to_proceed').length,
  };

  const handleExportPDF = () => {
    exportToPDF(filteredRequests, responsiblePersons, language);
  };

  const handleExportExcel = () => {
    exportToExcel(filteredRequests, responsiblePersons, language);
  };

  const statCards = [
    {
      title: t('totalRequests', language),
      value: stats.total,
      icon: FileText,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200',
    },
    {
      title: t('inProgress', language),
      value: stats.inProgress,
      icon: Clock,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700',
      borderColor: 'border-yellow-200',
    },
    {
      title: t('completed', language),
      value: stats.completed,
      icon: CheckCircle,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      borderColor: 'border-green-200',
    },
    {
      title: t('cancelled', language),
      value: stats.cancelled,
      icon: XCircle,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      borderColor: 'border-red-200',
    },
    {
      title: t('unableToProced', language),
      value: stats.unableToProced,
      icon: AlertTriangle,
      color: 'bg-gray-500',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-200',
    },
  ];

  const statusDistribution = [
    { status: 'in_progress', count: stats.inProgress, color: 'bg-yellow-500' },
    { status: 'completed', count: stats.completed, color: 'bg-green-500' },
    { status: 'cancelled', count: stats.cancelled, color: 'bg-red-500' },
    { status: 'unable_to_proceed', count: stats.unableToProced, color: 'bg-gray-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          {t('reports', language)}
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          {language === 'en' 
            ? 'Analyze repair request data and export reports'
            : 'วิเคราะห์ข้อมูลคำขอซ่อมและส่งออกรายงาน'}
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <h3 className="text-base sm:text-lg font-medium text-gray-900">
            {language === 'en' ? 'Filters' : 'ตัวกรอง'}
          </h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'en' ? 'Start Date' : 'วันที่เริ่มต้น'}
            </label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'en' ? 'End Date' : 'วันที่สิ้นสุด'}
            </label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('taskStatus', language)}
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">{language === 'en' ? 'All Status' : 'สถานะทั้งหมด'}</option>
              <option value="in_progress">{t('inProgress', language)}</option>
              <option value="completed">{t('completed', language)}</option>
              <option value="cancelled">{t('cancelled', language)}</option>
              <option value="unable_to_proceed">{t('unableToProced', language)}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('responsiblePerson', language)}
            </label>
            <select
              value={responsiblePersonFilter}
              onChange={(e) => setResponsiblePersonFilter(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">{language === 'en' ? 'All Persons' : 'ทุกคน'}</option>
              {responsiblePersons.map(person => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="sm:col-span-2 lg:col-span-1 xl:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'en' ? 'Export' : 'ส่งออก'}
            </label>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                onClick={handleExportPDF}
                className="flex-1 px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                <FileText className="h-4 w-4 mr-1 inline" />
                PDF
              </button>
              <button
                onClick={handleExportExcel}
                className="flex-1 px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                <Download className="h-4 w-4 mr-1 inline" />
                Excel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`${stat.bgColor} rounded-lg p-4 sm:p-6 border ${stat.borderColor} hover:shadow-md transition-shadow`}>
              <div className="flex items-center">
                <div className={`${stat.color} p-2 sm:p-3 rounded-lg shadow-sm`}>
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                  <p className={`text-xl sm:text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Status Distribution Chart */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4 sm:mb-6">
          {language === 'en' ? 'Status Distribution' : 'การแจกแจงสถานะ'}
        </h3>
        <div className="space-y-3 sm:space-y-4">
          {statusDistribution.map((item) => {
            const percentage = stats.total > 0 ? (item.count / stats.total) * 100 : 0;
            return (
              <div key={item.status} className="flex items-center">
                <div className="w-24 sm:w-32 text-xs sm:text-sm font-medium text-gray-700 truncate">
                  {t(item.status, language)}
                </div>
                <div className="flex-1 mx-3 sm:mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                    <div
                      className={`${item.color} h-2 sm:h-3 rounded-full transition-all duration-500 ease-out`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
                <div className="w-16 sm:w-20 text-right text-xs sm:text-sm font-medium text-gray-900">
                  {item.count} ({percentage.toFixed(1)}%)
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <h3 className="text-base sm:text-lg font-medium text-gray-900">
            {language === 'en' ? 'Filtered Results' : 'ผลการกรอง'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {language === 'en' 
              ? `Showing ${filteredRequests.length} of ${requests.length} requests`
              : `แสดง ${filteredRequests.length} จาก ${requests.length} คำขอ`}
          </p>
        </div>
        <div className="p-4 sm:p-6">
          {filteredRequests.length === 0 ? (
            <p className="text-gray-500 text-center py-8 text-sm sm:text-base">
              {language === 'en' ? 'No data found for the selected filters' : 'ไม่พบข้อมูลสำหรับตัวกรองที่เลือก'}
            </p>
          ) : (
            <div className="space-y-3">
              {filteredRequests.slice(0, 10).map((request) => (
                <div key={request.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors space-y-2 sm:space-y-0">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      request.status === 'completed' ? 'bg-green-400' :
                      request.status === 'in_progress' ? 'bg-yellow-400' :
                      request.status === 'cancelled' ? 'bg-red-400' :
                      request.status === 'unable_to_proceed' ? 'bg-gray-400' :
                      'bg-blue-400'
                    }`} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{request.requestNumber}</p>
                          <p className="text-xs text-gray-500 truncate">{request.requester}</p>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm text-gray-900 truncate">{request.deviceModel}</p>
                          <p className="text-xs text-gray-500 truncate">{request.companyName}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end sm:text-right space-x-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      request.status === 'completed' ? 'bg-green-100 text-green-800' :
                      request.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                      request.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      request.status === 'unable_to_proceed' ? 'bg-gray-100 text-gray-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {t(request.status, language)}
                    </span>
                    <p className="text-xs text-gray-500 whitespace-nowrap">{request.requestDate}</p>
                  </div>
                </div>
              ))}
              {filteredRequests.length > 10 && (
                <div className="text-center pt-4">
                  <p className="text-sm text-gray-500">
                    {language === 'en' 
                      ? `Showing first 10 of ${filteredRequests.length} results`
                      : `แสดง 10 รายการแรกจาก ${filteredRequests.length} ผลลัพธ์`}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;