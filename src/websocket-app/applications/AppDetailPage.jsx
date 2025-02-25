import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page, Loading, Text } from '@geist-ui/core';

export function AppDetailPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the dashboard since we've merged the functionality
    navigate('/dashboard');
  }, [navigate]);

  return (
    <Page>
      <Loading>Redirecting to dashboard...</Loading>
      <Text p type="secondary">The application details are now available on the dashboard.</Text>
    </Page>
  );
} 