import React from 'react';
import { FileText, CheckCircle, Clock, XCircle, AlertTriangle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';

const Dashboard: React.FC = () => {
  const { requests, language } = useApp();

  const stats = {
    total: requests.length,
    completed: requests.filter(r => r.status === 'completed').length,
    inProgress: requests.filter(r => r.status === 'in_progress').length,
    cancelled: requests.filter(r => r.status === 'cancelled').length,
    unableToProced: requests.filter(r => r.status === 'unable_to_proceed').length,
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

  const recentRequests = requests.slice(-5).reverse();

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('dashboard', language)}
        </h2>
        <p className="text-gray-600">
          {language === 'en' 
            ? 'Overview of repair requests and system status' 
            : 'ภาพรวมของคำขอซ่อมและสถานะระบบ'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`${stat.bgColor} rounded-lg p-6 border ${stat.borderColor} hover:shadow-md transition-shadow`}>
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg shadow-sm`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Status Distribution Chart */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          {language === 'en' ? 'Status Distribution' : 'การแจกแจงสถานะ'}
        </h3>
        <div className="space-y-4">
          {[
            { status: 'in_progress', count: stats.inProgress, color: 'bg-yellow-500' },
            { status: 'completed', count: stats.completed, color: 'bg-green-500' },
            { status: 'cancelled', count: stats.cancelled, color: 'bg-red-500' },
            { status: 'unable_to_proceed', count: stats.unableToProced, color: 'bg-gray-500' },
          ].map((item) => {
            const percentage = stats.total > 0 ? (item.count / stats.total) * 100 : 0;
            return (
              <div key={item.status} className="flex items-center">
                <div className="w-32 text-sm font-medium text-gray-700">
                  {t(item.status, language)}
                </div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`${item.color} h-3 rounded-full transition-all duration-500 ease-out`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
                <div className="w-20 text-right text-sm font-medium text-gray-900">
                  {item.count} ({percentage.toFixed(1)}%)
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Requests */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {language === 'en' ? 'Recent Requests' : 'คำขอล่าสุด'}
          </h3>
        </div>
        <div className="p-6">
          {recentRequests.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              {language === 'en' ? 'No requests found' : 'ไม่พบคำขอ'}
            </p>
          ) : (
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        request.status === 'completed' ? 'bg-green-400' :
                        request.status === 'in_progress' ? 'bg-yellow-400' :
                        request.status === 'cancelled' ? 'bg-red-400' :
                        request.status === 'unable_to_proceed' ? 'bg-gray-400' :
                        'bg-blue-400'
                      }`} />
                      <div>
                        <p className="font-medium text-gray-900">{request.requestNumber}</p>
                        <p className="text-sm text-gray-600">{request.requester}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">{request.deviceModel}</p>
                        <p className="text-sm text-gray-600">{request.companyName}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                      request.status === 'completed' ? 'bg-green-100 text-green-800' :
                      request.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                      request.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      request.status === 'unable_to_proceed' ? 'bg-gray-100 text-gray-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {t(request.status, language)}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{request.requestDate}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;