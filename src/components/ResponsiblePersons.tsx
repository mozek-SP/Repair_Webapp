import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Users } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';
import { ResponsiblePerson } from '../types';
import ResponsiblePersonModal from './ResponsiblePersonModal';

const ResponsiblePersons: React.FC = () => {
  const { responsiblePersons, language, deleteResponsiblePerson } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingPerson, setEditingPerson] = useState<ResponsiblePerson | null>(null);

  const handleEdit = (person: ResponsiblePerson) => {
    setEditingPerson(person);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm(language === 'en' ? 'Are you sure you want to delete this person?' : 'คุณแน่ใจหรือไม่ที่จะลบบุคคลนี้?')) {
      deleteResponsiblePerson(id);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPerson(null);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            {t('responsiblePersons', language)}
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            {language === 'en' 
              ? 'Manage responsible persons for repair requests' 
              : 'จัดการผู้รับผิดชอบสำหรับคำขอซ่อม'}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2 inline" />
          {t('add', language)} {t('responsiblePerson', language)}
        </button>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {responsiblePersons.map((person) => (
          <div key={person.id} className="bg-white rounded-lg shadow border border-gray-200 p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center flex-1 min-w-0">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium text-gray-900 truncate">{person.name}</h3>
                  <p className="text-xs text-gray-500 truncate">{person.department}</p>
                </div>
              </div>
              <div className="flex space-x-2 ml-3">
                <button
                  onClick={() => handleEdit(person)}
                  className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-md transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(person.id)}
                  className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">{t('email', language)}:</span>
                <span className="text-xs text-gray-900 truncate ml-2">{person.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">{t('phone', language)}:</span>
                <span className="text-xs text-gray-900">{person.phone}</span>
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
                  {t('name', language)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('email', language)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('phone', language)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('department', language)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('actions', language)}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {responsiblePersons.map((person) => (
                <tr key={person.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {person.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {person.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {person.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {person.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(person)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(person.id)}
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
        
        {responsiblePersons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {language === 'en' ? 'No responsible persons found' : 'ไม่พบผู้รับผิดชอบ'}
            </p>
          </div>
        )}
      </div>

      {/* Mobile No Results */}
      {responsiblePersons.length === 0 && (
        <div className="block lg:hidden text-center py-12">
          <p className="text-gray-500">
            {language === 'en' ? 'No responsible persons found' : 'ไม่พบผู้รับผิดชอบ'}
          </p>
        </div>
      )}

      {showModal && (
        <ResponsiblePersonModal
          person={editingPerson}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ResponsiblePersons;