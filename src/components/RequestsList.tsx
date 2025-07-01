import React, { useState } from 'react';
import { Edit2, Trash2, Search, Filter } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';
import { RepairRequest } from '../types';
import EditRequestModal from './EditRequestModal';

const RequestsList: React.FC = () => {
  const { requests, responsiblePersons, language, deleteRequest } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingRequest, setEditingRequest] = useState<RepairRequest | null>(null);

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.requestNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string) => {
    if (window.confirm(language === 'en' ? 'Are you sure you want to delete this request?' : 'คุณแน่ใจหรือไม่ที่จะลบคำขอนี้?')) {
      deleteRequest(id);
    }
  };

  const getResponsiblePersonName = (id: string) => {
    const person = responsiblePersons.find(p => p.id === id);
    return person?.name || 'N/A';
  };

  return (
    <div className="space-y-6">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          {t('requests', language)}
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          {language === 'en' 
            ? 'Manage and track repair requests' 
            : 'จัดการและติดตามคำขอซ่อม'}
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder={language === 'en' ? 'Search requests...' : 'ค้นหาคำขอ...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">{language === 'en' ? 'All Status' : 'สถานะทั้งหมด'}</option>
              <option value="in_progress">{t('inProgress', language)}</option>
              <option value="completed">{t('completed', language)}</option>
              <option value="cancelled">{t('cancelled', language)}</option>
              <option value="unable_to_proceed">{t('unableToProced', language)}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {filteredRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-lg shadow border border-gray-200 p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 truncate">{request.requestNumber}</h3>
                <p className="text-xs text-gray-500">{request.requestDate}</p>
              </div>
              <div className="flex space-x-2 ml-3">
                <button
                  onClick={() => setEditingRequest(request)}
                  className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-md transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(request.id)}
                  className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">{t('repairRequester', language)}:</span>
                <span className="text-xs text-gray-900 font-medium">{request.requester}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">{t('phoneNumber', language)}:</span>
                <span className="text-xs text-gray-900">{request.phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">{t('companyName', language)}:</span>
                <span className="text-xs text-gray-900 truncate ml-2">{request.companyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">{t('deviceModel', language)}:</span>
                <span className="text-xs text-gray-900">{request.deviceModel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">{t('deviceNumber', language)}:</span>
                <span className="text-xs text-gray-900">{request.deviceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">{t('responsiblePerson', language)}:</span>
                <span className="text-xs text-gray-900 truncate ml-2">{getResponsiblePersonName(request.responsiblePersonId)}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-gray-500">{t('taskStatus', language)}:</span>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  request.status === 'completed' ? 'bg-green-100 text-green-800' :
                  request.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                  request.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  request.status === 'unable_to_proceed' ? 'bg-gray-100 text-gray-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {t(request.status, language)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('repairRequestNumber', language)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('repairRequester', language)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('companyName', language)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('deviceModel', language)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('taskStatus', language)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('responsiblePerson', language)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('actions', language)}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.requestNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{request.requester}</div>
                      <div className="text-gray-500">{request.phoneNumber}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.companyName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{request.deviceModel}</div>
                      <div className="text-gray-500">{request.deviceNumber}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      request.status === 'completed' ? 'bg-green-100 text-green-800' :
                      request.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                      request.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      request.status === 'unable_to_proceed' ? 'bg-gray-100 text-gray-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {t(request.status, language)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getResponsiblePersonName(request.responsiblePersonId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingRequest(request)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(request.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {language === 'en' ? 'No requests found' : 'ไม่พบคำขอ'}
            </p>
          </div>
        )}
      </div>

      {/* Mobile No Results */}
      {filteredRequests.length === 0 && (
        <div className="block lg:hidden text-center py-12">
          <p className="text-gray-500">
            {language === 'en' ? 'No requests found' : 'ไม่พบคำขอ'}
          </p>
        </div>
      )}

      {editingRequest && (
        <EditRequestModal
          request={editingRequest}
          onClose={() => setEditingRequest(null)}
        />
      )}
    </div>
  );
};

export default RequestsList;