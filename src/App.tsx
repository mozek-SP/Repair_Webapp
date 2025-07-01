import React, { useState } from 'react';
import { AppProvider } from './contexts/AppContext';
import { PageView } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import NewRequestForm from './components/NewRequestForm';
import RequestsList from './components/RequestsList';
import ResponsiblePersons from './components/ResponsiblePersons';
import Reports from './components/Reports';

function App() {
  const [currentView, setCurrentView] = useState<PageView>('dashboard');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'new-request':
        return <NewRequestForm />;
      case 'requests':
        return <RequestsList />;
      case 'responsible-persons':
        return <ResponsiblePersons />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppProvider>
      <Layout currentView={currentView} onViewChange={setCurrentView}>
        {renderCurrentView()}
      </Layout>
    </AppProvider>
  );
}

export default App;