import { useState, useEffect } from 'react';
import { useQuery } from 'wasp/client/operations';
import { getConnectedApps, createApplication, updateApplication, deleteApplication, generateCheckoutSession } from 'wasp/client/operations';
import { PaymentPlanId } from '../../payment/plans';
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
  Note,
  Checkbox,
  Divider,
  Toggle,
  Select
} from '@geist-ui/core';
import { Activity, Server, Users, Plus, Key, Terminal, Settings, Code as CodeIcon, Info, FileText } from '@geist-ui/icons';

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
    subscriptionPlan: PaymentPlanId.Hobby,
  });
  const [activeTab, setActiveTab] = useState('getting-started');
  const { setToast } = useToasts();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
      const app = await createApplication(formData);
      
      // Start payment flow
      const { sessionUrl } = await generateCheckoutSession(formData.subscriptionPlan);
      
      // If we have a checkout URL, redirect to it
      if (sessionUrl) {
        window.location.href = sessionUrl;
      } else {
        // If no checkout URL (should not happen), just clear form and close modal
        setFormData({ name: '', description: '', subscriptionPlan: PaymentPlanId.Hobby });
        setIsModalOpen(false);
        setToast({
          text: 'Application created successfully',
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Error creating application:', error);
      setToast({
        text: error.message || 'Error creating application',
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

  const handleDeleteApplication = async (app) => {
    try {
      await deleteApplication({ id: app.id });
      setIsDeleteModalOpen(false);
      setToast({
        text: 'Application deleted successfully',
        type: 'success'
      });
    } catch (error) {
      setToast({
        text: 'Failed to delete application: ' + error.message,
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
          </Grid.Container>

          <Spacer h={2} />

          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.Item label={<div style={{ display: 'flex', alignItems: 'center' }}><CodeIcon size={16} style={{ marginRight: '5px' }} /> Getting Started</div>} value="getting-started">
              <Card>
                <Card.Content>
                  <div>
                    <Text h3>Welcome to JetSocket!</Text>
                    <Text p>Here's how to get started with your WebSocket application.</Text>
                    
                    <Spacer h={1} />
                    <Text h4>1. Install the client library</Text>
                    <Card>
                      <div style={{ padding: '10px' }}>
                        <Code block width="100%">npm install jetsocket-js</Code>
                      </div>
                    </Card>
                    
                    <Spacer h={1} />
                    <Text h4>2. Configure your environment</Text>
                    <Card>
                      <div style={{ padding: '10px' }}>
                        <Code block width="100%">{`JETSOCKET_APP_ID="${app.id}"
JETSOCKET_APP_KEY="${app.key}"
JETSOCKET_APP_SECRET="${app.secret}"`}</Code>
                      </div>
                    </Card>
                    
                    <Spacer h={1} />
                    <Text h4>3. Initialize the client</Text>
                    <Card>
                      <div style={{ padding: '10px' }}>
                        <Code block width="100%">{`import JetSocket from 'jetsocket-js';

const jetSocket = new JetSocket({
  appId: process.env.JETSOCKET_APP_ID,
  key: process.env.JETSOCKET_APP_KEY,
  secret: process.env.JETSOCKET_APP_SECRET,
});`}</Code>
                      </div>
                    </Card>
                    
                    <Spacer h={1} />
                    <Text h4>4. Subscribe to a channel</Text>
                    <Card>
                      <div style={{ padding: '10px' }}>
                        <Code block width="100%">{`const channel = jetSocket.subscribe('my-channel');

channel.bind('my-event', (data) => {
  console.log('Received event:', data);
});`}</Code>
                      </div>
                    </Card>
                    
                    <Spacer h={1} />
                    <Text h4>5. Publish an event</Text>
                    <Card>
                      <div style={{ padding: '10px' }}>
                        <Code block width="100%">{`jetSocket.trigger('my-channel', 'my-event', {
  message: 'Hello World!'
});`}</Code>
                      </div>
                    </Card>
                    
                    <Spacer h={1} />
                    <Note>
                      For more detailed documentation and examples, visit our <a href="#" style={{ color: '#0070f3', textDecoration: 'underline' }}>documentation</a>.
                    </Note>
                  </div>
                </Card.Content>
              </Card>
            </Tabs.Item>
            
            <Tabs.Item label={<div style={{ display: 'flex', alignItems: 'center' }}><Key size={16} style={{ marginRight: '5px' }} /> App Keys</div>} value="app-keys">
              <Card>
                <Card.Content>
                  <Text h3>Application Keys</Text>
                  <Text p>Use these credentials to connect to your WebSocket application.</Text>
                  <Spacer h={1} />
                  
                  <Grid.Container gap={2}>
                    <Grid xs={24}>
                      <Card width="100%" shadow>
                        <Card.Content>
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
                  </Grid.Container>
                  
                  <Spacer h={1} />
                  <Note type="warning">
                    Keep your App Secret secure! Never expose it in client-side code.
                  </Note>
                </Card.Content>
              </Card>
            </Tabs.Item>
            
            <Tabs.Item label={<div style={{ display: 'flex', alignItems: 'center' }}><Settings size={16} style={{ marginRight: '5px' }} /> App Settings</div>} value="app-settings">
              <Card>
                <Card.Content>
                  <Text h3>Application Settings</Text>
                  <Text p>Configure your WebSocket application settings.</Text>
                  <Spacer h={1} />
                  
                  <Card shadow width="100%" style={{ marginBottom: '20px' }}>
                    <Card.Content>
                      <Text h4>General Settings</Text>
                      <Divider />
                      <Grid.Container gap={2}>
                        <Grid xs={24}>
                          <div style={{ width: '100%' }}>
                            <Text small>App Name</Text>
                            <Input 
                              width="100%" 
                              value={app.name} 
                              placeholder="Application name"
                            />
                          </div>
                        </Grid>
                        <Grid xs={24}>
                          <div style={{ width: '100%' }}>
                            <Text small>Description</Text>
                            <Textarea 
                              width="100%" 
                              value={app.description || ''} 
                              placeholder="Application description"
                            />
                          </div>
                        </Grid>
                        <Grid xs={24}>
                          <Button type="secondary" auto>Update</Button>
                        </Grid>
                      </Grid.Container>
                    </Card.Content>
                  </Card>
                  
                  <Card shadow width="100%" style={{ marginBottom: '20px' }}>
                    <Card.Content>
                      <Text h4>Connection Settings</Text>
                      <Divider />
                      <Grid.Container gap={2}>
                        <Grid xs={24}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <div>
                              <Text>Force TLS</Text>
                              <Text small type="secondary">Only WebSocket connections over TLS will be accepted</Text>
                            </div>
                            <Toggle />
                          </div>
                        </Grid>
                        <Grid xs={24}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <div>
                              <Text>Enable Client Events</Text>
                              <Text small type="secondary">Allow clients to communicate directly with each other</Text>
                            </div>
                            <Toggle />
                          </div>
                        </Grid>
                        <Grid xs={24}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <div>
                              <Text>Enable Subscription Counting</Text>
                              <Text small type="secondary">Track the number of subscribers on each channel</Text>
                            </div>
                            <Toggle />
                          </div>
                        </Grid>
                      </Grid.Container>
                    </Card.Content>
                  </Card>
                  
                  <Card shadow width="100%" style={{ marginBottom: '20px' }}>
                    <Card.Content>
                      <Text h4 type="error">Danger Zone</Text>
                      <Divider />
                      <Text p>Deleting your application is permanent and cannot be undone.</Text>
                      <Spacer h={1} />
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <Button
                          type={app.enabled ? 'error' : 'success'}
                          ghost
                          onClick={() => handleToggleStatus(app)}
                        >
                          {app.enabled ? 'Disable' : 'Enable'} Application
                        </Button>
                        <Button 
                          type="error" 
                          ghost
                          onClick={() => setIsDeleteModalOpen(true)}
                        >
                          Delete Application
                        </Button>
                      </div>
                    </Card.Content>
                  </Card>
                </Card.Content>
              </Card>
            </Tabs.Item>
            
            <Tabs.Item label={<div style={{ display: 'flex', alignItems: 'center' }}><Activity size={16} style={{ marginRight: '5px' }} /> Overview</div>} value="overview">
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
                  
                  <Spacer h={2} />
                </Card.Content>
              </Card>
              <Spacer h={2} />
              <Card width="100%">
                    <Card.Content>
                      <Terminal size={24} />
                      <Text h4>Message Stats</Text>
                      <Grid.Container gap={2}>
                        <Grid xs={24} md={6}>
                          <Description title="Messages Sent" content={app.soketi_ws_messages_sent_total || 0} />
                        </Grid>
                        <Grid xs={24} md={6}>
                          <Description title="Messages Received" content={app.soketi_ws_messages_received_total || 0} />
                        </Grid>
                        <Grid xs={24} md={6}>
                          <Description 
                            title="Total Data Received" 
                            content={`${((app.soketi_socket_received_bytes || 0) / 1024).toFixed(2)} KB`}
                          />
                        </Grid>
                        <Grid xs={24} md={6}>
                          <Description 
                            title="Total Data Sent" 
                            content={`${((app.soketi_socket_transmitted_bytes || 0) / 1024).toFixed(2)} KB`}
                          />
                        </Grid>
                      </Grid.Container>
                    </Card.Content>
                  </Card>
            </Tabs.Item>
            
            <Tabs.Item label={<div style={{ display: 'flex', alignItems: 'center' }}><Server size={16} style={{ marginRight: '5px' }} /> Advanced</div>} value="settings">
              <Card>
                <Card.Content>
                  <Text h4>Advanced Settings</Text>
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
          <div>
            <Text small>Payment Plan <Text small type="error" span>*</Text></Text>
            <Select
              width="100%"
              value={formData.subscriptionPlan}
              onChange={(val) => handleChange(val, 'subscriptionPlan')}
            >
              <Select.Option value={PaymentPlanId.Hobby}>Hobby</Select.Option>
              <Select.Option value={PaymentPlanId.Startup}>Startup</Select.Option>
              <Select.Option value={PaymentPlanId.Scale}>Scale</Select.Option>
            </Select>
          </div>
          <Spacer h={1} />
          <Note type="secondary">
            Currently, you can only create one application at a time.
          </Note>
        </Modal.Content>
        <Modal.Action passive onClick={() => setIsModalOpen(false)}>Cancel</Modal.Action>
        <Modal.Action onClick={handleCreateApplication}>Create</Modal.Action>
      </Modal>

      <Modal visible={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <Modal.Title>Delete Application</Modal.Title>
        <Modal.Content>
          <Text>Are you sure you want to delete this application? This action cannot be undone.</Text>
          <Spacer h={1} />
          <Note type="error">
            All associated data, including connection history and metrics, will be permanently deleted.
          </Note>
        </Modal.Content>
        <Modal.Action passive onClick={() => setIsDeleteModalOpen(false)}>Cancel</Modal.Action>
        <Modal.Action type="error" onClick={() => handleDeleteApplication(app)}>Delete</Modal.Action>
      </Modal>
    </Page>
  );
}; 