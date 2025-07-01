import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';

const NewRequestForm: React.FC = () => {
  const { language, responsiblePersons, addRequest } = useApp();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const [formData, setFormData] = useState({
    requestNumber: `REQ-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
    requestDate: new Date().toISOString().split('T')[0],
    requester: '',
    phoneNumber: '',
    companyName: '',
    deviceModel: '',
    deviceNumber: '',
    damage: '',
    note: '',
    warranty: 'under_warranty' as const,
    responsiblePersonId: '',
    status: 'in_progress' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.responsiblePersonId) {
      alert(language === 'en' ? 'Please select a responsible person' : 'กรุณาเลือกผู้รับผิดชอบ');
      return;
    }
    
    addRequest(formData);
    
    // Reset form
    setFormData({
      requestNumber: `REQ-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
      requestDate: new Date().toISOString().split('T')[0],
      requester: '',
      phoneNumber: '',
      companyName: '',
      deviceModel: '',
      deviceNumber: '',
      damage: '',
      note: '',
      warranty: 'under_warranty',
      responsiblePersonId: '',
      status: 'in_progress',
    });
    
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          {t('newRequest', language)}
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          {language === 'en' 
            ? 'Create a new repair request' 
            : 'สร้างคำขอซ่อมใหม่'}
        </p>
      </div>

      {showSuccessMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                {t('requestCreated', language)}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow border border-gray-200">
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('repairRequestNumber', language)}
              </label>
              <input
                type="text"
                name="requestNumber"
                value={formData.requestNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('repairRequestDate', language)}
              </label>
              <input
                type="date"
                name="requestDate"
                value={formData.requestDate}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('repairRequester', language)}
              </label>
              <input
                type="text"
                name="requester"
                value={formData.requester}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('phoneNumber', language)}
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('companyName', language)}
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('deviceModel', language)}
              </label>
              <input
                type="text"
                name="deviceModel"
                value={formData.deviceModel}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('deviceNumber', language)}
              </label>
              <input
                type="text"
                name="deviceNumber"
                value={formData.deviceNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('warranty', language)}
              </label>
              <select
                name="warranty"
                value={formData.warranty}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="under_warranty">{t('underWarranty', language)}</option>
                <option value="out_of_warranty">{t('outOfWarranty', language)}</option>
                <option value="under_ma_contract">{t('underMAContract', language)}</option>
                <option value="out_of_ma_contract">{t('outOfMAContract', language)}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('responsiblePerson', language)}
              </label>
              <select
                name="responsiblePersonId"
                value={formData.responsiblePersonId}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">
                  {language === 'en' ? 'Select responsible person' : 'เลือกผู้รับผิดชอบ'}
                </option>
                {responsiblePersons.map(person => (
                  <option key={person.id} value={person.id}>
                    {person.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('taskStatus', language)}
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="in_progress">{t('inProgress', language)}</option>
                <option value="completed">{t('completed', language)}</option>
                <option value="cancelled">{t('cancelled', language)}</option>
                <option value="unable_to_proceed">{t('unableToProced', language)}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('damage', language)}
            </label>
            <textarea
              name="damage"
              value={formData.damage}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('note', language)}
            </label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
            <button
              type="button"
              className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <X className="h-4 w-4 mr-2 inline" />
              {t('cancel', language)}
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Save className="h-4 w-4 mr-2 inline" />
              {t('save', language)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewRequestForm;