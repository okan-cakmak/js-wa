import { useState, useEffect } from 'react';
import { useQuery } from 'wasp/client/operations';
import { getConnectedApps, createApplication, updateApplication } from 'wasp/client/operations';
import { 
  Page, 
  Grid, 
  Card, 
  Text, 
  Loading, 
  Table, 
  Badge, 
  Progress, 
  Spacer, 
  Button, 
  Input, 
  Textarea, 
  Modal, 
  Description, 
  Code, 
  Tabs,
  useToasts,
  Note
} from '@geist-ui/core';
import { Activity, Server, Users, Plus, Key, Terminal, Settings } from '@geist-ui/icons';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [activeTab, setActiveTab] = useState('overview');
  const { setToast } = useToasts();

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

  const handleCreateApplication = async () => {
    try {
      await createApplication(formData);
      setFormData({ name: '', description: '' });
      setIsModalOpen(false);
      setToast({
        text: 'Application created successfully',
        type: 'success'
      });
    } catch (error) {
      setToast({
        text: 'Error creating application: ' + error.message,
        type: 'error'
      });
    }
  };

  const handleToggleStatus = async (app) => {
    try {
      await updateApplication({
        id: app.id,
        enabled: !app.enabled
      });
      setToast({
        text: `Application ${app.enabled ? 'disabled' : 'enabled'} successfully`,
        type: 'success'
      });
    } catch (error) {
      setToast({
        text: 'Failed to update application status',
        type: 'error'
      });
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setToast({
      text: 'Copied to clipboard!',
      type: 'success'
    });
  };

  const handleChange = (value, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (error) {
    return (
      <Page>
        <Text type="error">Error: {error.message}</Text>
      </Page>
    );
  }

  const hasApp = connectedApps && connectedApps.length > 0;
  const app = hasApp ? connectedApps[0] : null;

  return (
    <Page>
      <Text h1>Dashboard</Text>
      <Text p type="secondary">Monitor your WebSocket application in real-time</Text>
      <Spacer h={2} />

      {isLoading ? (
        <Loading>Loading dashboard data</Loading>
      ) : !hasApp ? (
        <Card shadow>
          <Card.Content>
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Text h3>Welcome to JetSocket!</Text>
              <Text p>Create your WebSocket application to get started.</Text>
              <Spacer h={1} />
              <Button 
                type="secondary" 
                icon={<Plus />} 
                onClick={() => setIsModalOpen(true)}
              >
                Create Application
              </Button>
            </div>
          </Card.Content>
        </Card>
      ) : (
        <>
          <Grid.Container gap={2} justify="space-between" alignItems="center">
            <Grid>
              <div>
                <Text h2 style={{ margin: 0 }}>{app.name}</Text>
                <Text type="secondary">{app.description || 'No description'}</Text>
              </div>
            </Grid>
            <Grid>
              <Button
                type={app.enabled ? 'error' : 'success'}
                ghost
                auto
                onClick={() => handleToggleStatus(app)}
              >
                {app.enabled ? 'Disable' : 'Enable'} Application
              </Button>
            </Grid>
          </Grid.Container>

          <Spacer h={2} />

          <Grid.Container gap={2}>
            <Grid xs={24} md={8}>
              <Card width="100%">
                <Card.Content>
                  <Server size={24} />
                  <Text h4>Server Status</Text>
                  <Text>{metrics.serverStarted}</Text>
                </Card.Content>
              </Card>
            </Grid>

            <Grid xs={24} md={8}>
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

            <Grid xs={24} md={8}>
              <Card width="100%">
                <Card.Content>
                  <Users size={24} />
                  <Text h4>Current Active Connections</Text>
                  <Text>{app.soketi_connected || 0}</Text>
                </Card.Content>
              </Card>
            </Grid>
          </Grid.Container>

          <Spacer h={2} />

          <Grid.Container gap={2}>
            <Grid xs={24} md={12}>
              <Card width="100%">
                <Card.Content>
                  <Key size={24} />
                  <Text h4>Connection Details</Text>
                  <Grid.Container gap={1}>
                    <Grid xs={24}>
                      <Description 
                        title="App ID" 
                        content={
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Code>{app.id}</Code>
                            <Button 
                              auto 
                              scale={1/3} 
                              onClick={() => copyToClipboard(app.id)}
                            >
                              Copy
                            </Button>
                          </div>
                        } 
                      />
                    </Grid>
                    <Grid xs={24}>
                      <Description 
                        title="App Key" 
                        content={
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Code>{app.key}</Code>
                            <Button 
                              auto 
                              scale={1/3} 
                              onClick={() => copyToClipboard(app.key)}
                            >
                              Copy
                            </Button>
                          </div>
                        } 
                      />
                    </Grid>
                    <Grid xs={24}>
                      <Description 
                        title="App Secret" 
                        content={
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Code>{app.secret}</Code>
                            <Button 
                              auto 
                              scale={1/3} 
                              onClick={() => copyToClipboard(app.secret)}
                            >
                              Copy
                            </Button>
                          </div>
                        } 
                      />
                    </Grid>
                  </Grid.Container>
                </Card.Content>
              </Card>
            </Grid>
            <Grid xs={24} md={12}>
              <Card width="100%">
                <Card.Content>
                  <Terminal size={24} />
                  <Text h4>Message Stats</Text>
                  <Description title="Messages Sent" content={app.soketi_ws_messages_sent_total || 0} />
                  <Description title="Messages Received" content={app.soketi_ws_messages_received_total || 0} />
                  <Description 
                    title="Total Data Received" 
                    content={`${((app.soketi_socket_received_bytes || 0) / 1024).toFixed(2)} KB`}
                  />
                  <Description 
                    title="Total Data Sent" 
                    content={`${((app.soketi_socket_transmitted_bytes || 0) / 1024).toFixed(2)} KB`}
                  />
                </Card.Content>
              </Card>
            </Grid>
          </Grid.Container>

          <Spacer h={2} />

          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.Item label="Overview" value="overview">
              <Card>
                <Card.Content>
                  <Grid.Container gap={2}>
                    <Grid xs={24} md={12}>
                      <div>
                        <Text h4>Connection Statistics</Text>
                        <Description 
                          title="Total Connections" 
                          content={app.soketi_new_connections_total || 0} 
                        />
                        <Description 
                          title="Total Disconnections" 
                          content={app.soketi_new_disconnections_total || 0} 
                        />
                      </div>
                    </Grid>
                    <Grid xs={24} md={12}>
                      <div>
                        <Text h4>Application Settings</Text>
                        <Description title="Status" content={
                          <Badge type={app.enabled ? 'success' : 'error'}>
                            {app.enabled ? 'Active' : 'Disabled'}
                          </Badge>
                        } />
                        <Description 
                          title="Created At" 
                          content={new Date(app.createdAt).toLocaleString()} 
                        />
                      </div>
                    </Grid>
                  </Grid.Container>
                </Card.Content>
              </Card>
            </Tabs.Item>
            <Tabs.Item label="Settings" value="settings">
              <Card>
                <Card.Content>
                  <Text h4>Application Settings</Text>
                  <Spacer h={1} />
                  <Note type="secondary">
                    Currently, you can manage one application at a time. More options will be available in future updates.
                  </Note>
                </Card.Content>
              </Card>
            </Tabs.Item>
          </Tabs>
        </>
      )}

      <Modal visible={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Title>Create Application</Modal.Title>
        <Modal.Content>
          <Text type="secondary">Create your WebSocket application.</Text>
          <Spacer h={1} />
          <div>
            <Text small>App Name <Text small type="error" span>*</Text></Text>
            <Input
              width="100%"
              placeholder="Enter app name"
              value={formData.name}
              onChange={(e) => handleChange(e.target.value, 'name')}
              required
            />
          </div>
          <Spacer h={1} />
          <div>
            <Text small>Description</Text>
            <Textarea
              width="100%"
              placeholder="Enter app description"
              value={formData.description}
              onChange={(e) => handleChange(e.target.value, 'description')}
              rows={3}
            />
          </div>
          <Spacer h={1} />
          <Note type="secondary">
            Currently, you can only create one application at a time.
          </Note>
        </Modal.Content>
        <Modal.Action passive onClick={() => setIsModalOpen(false)}>Cancel</Modal.Action>
        <Modal.Action onClick={handleCreateApplication}>Create</Modal.Action>
      </Modal>
    </Page>
  );
}; 