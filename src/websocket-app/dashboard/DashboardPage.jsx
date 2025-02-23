import { useState, useEffect } from 'react';
import { useQuery } from 'wasp/client/operations';
import { getConnectedApps } from 'wasp/client/operations';
import { Page, Grid, Card, Text, Loading, Table, Badge, Progress, Spacer } from '@geist-ui/core';
import { Activity, Server, Users } from '@geist-ui/icons';

export const DashboardPage = () => {
  const [metrics, setMetrics] = useState({
    serverStarted: '3 minutes ago',
    memoryUsage: {
      percentage: 6,
      total: '2.0 GB'
    },
    totalConnections: 0,
    soketi_connected: 0
  });

  const { data: connectedApps, isLoading, error } = useQuery(getConnectedApps);

  // Update total connections when apps data changes
  useEffect(() => {
    if (connectedApps) {
      const total = connectedApps.reduce((sum, app) => sum + app.connections, 0);
      setMetrics(prev => ({
        ...prev,
        totalConnections: total,
        soketi_connected: connectedApps.reduce((sum, app) => sum + (app.soketi_connected || 0), 0)
      }));
    }
  }, [connectedApps]);

  // Simulate real-time updates for memory usage
  useEffect(() => {
    const metricsInterval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        memoryUsage: {
          percentage: Math.min(100, prev.memoryUsage.percentage + Math.random() * 2 - 1),
          total: prev.memoryUsage.total
        }
      }));
    }, 5000);

    return () => clearInterval(metricsInterval);
  }, []);

  if (error) {
    return (
      <Page>
        <Text type="error">Error: {error.message}</Text>
      </Page>
    );
  }

  return (
    <Page>
      <Text h1>Dashboard</Text>
      <Text p type="secondary">Monitor your server metrics in real-time</Text>
      <Spacer h={2} />

      <Grid.Container gap={2}>
        <Grid xs={12} sm={8} md={8}>
          <Card width="100%">
            <Card.Content>
              <Server size={24} />
              <Text h4>Server Started</Text>
              <Text>{metrics.serverStarted}</Text>
            </Card.Content>
          </Card>
        </Grid>

        <Grid xs={12} sm={8} md={8}>
          <Card width="100%">
            <Card.Content>
              <Activity size={24} />
              <Text h4>Memory Usage</Text>
              <Text>{metrics.memoryUsage.percentage}% of {metrics.memoryUsage.total}</Text>
              <Spacer h={0.5} />
              <Progress value={metrics.memoryUsage.percentage} />
            </Card.Content>
          </Card>
        </Grid>

        <Grid xs={12} sm={8} md={8}>
          <Card width="100%">
            <Card.Content>
              <Users size={24} />
              <Text h4>Current Active Connections</Text>
              <Text>{metrics.soketi_connected}</Text>
            </Card.Content>
          </Card>
        </Grid>
      </Grid.Container>

      <Spacer h={2} />
      <Text h2>Connected Apps</Text>
      <Text type="secondary">Real-time connection status of your applications</Text>
      <Spacer h={1} />

      {isLoading ? (
        <Loading>Loading connected apps</Loading>
      ) : !connectedApps || connectedApps.length === 0 ? (
        <Card>
          <Card.Content>
            <Text>No connected apps</Text>
          </Card.Content>
        </Card>
      ) : (
        <Table data={connectedApps}>
          <Table.Column prop="id" label="App ID" />
          <Table.Column prop="name" label="Name" />
          <Table.Column prop="soketi_connected" label="Connections">
            {(value) => (
              <Badge type="success">{value} active</Badge>
            )}
          </Table.Column>
        </Table>
      )}
    </Page>
  );
}; 