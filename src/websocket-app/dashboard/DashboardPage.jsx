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
  Tag
} from '@geist-ui/core';
import { Activity, Server, Users, Plus, Key, Terminal, Settings, Code as CodeIcon, Info, FileText, ChevronUp, Zap } from '@geist-ui/icons';

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [pusherConnection, setPusherConnection] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');

  const hasApp = connectedApps && connectedApps.length > 0;
  const app = hasApp ? connectedApps[0] : null;

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

  // Initialize Pusher when Getting Started tab is active and we have app data
  useEffect(() => {
    if (activeTab === 'getting-started' && hasApp && app && !pusherConnection) {
      // Add Pusher script dynamically
      const script = document.createElement('script');
      script.src = 'https://js.pusher.com/8.2.0/pusher.min.js';
      script.async = true;
      script.onload = () => {
        // Initialize Pusher
        console.log("****appKey", app.key);
        const pusher = new window.Pusher(app.key, {
          wsHost: 'ws.jetsocket.io',
          enabledTransports: ['wss',"ws"],
          cluster: 'eu'
        });

        pusher.connection.bind('connected', () => {
          setConnectionStatus('Connected');
          setToast({
            text: 'Successfully connected to Pusher',
            type: 'success'
          });
        });

        pusher.connection.bind('disconnected', () => {
          setConnectionStatus('Disconnected');
        });

        pusher.connection.bind('error', (err) => {
          setConnectionStatus('Error');
          setToast({
            text: 'Connection error: ' + err.message,
            type: 'error'
          });
        });

        setPusherConnection(pusher);
      };

      document.head.appendChild(script);

      return () => {
        if (pusherConnection) {
          pusherConnection.disconnect();
          setPusherConnection(null);
        }
        document.head.removeChild(script);
      };
    }
  }, [activeTab, app, hasApp]);

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

  const handleUpgrade = async (plan) => {
    try {
      // Map the plan name to PaymentPlanId
      const planIdMap = {
        'Startup': PaymentPlanId.Startup,
        'Scale': PaymentPlanId.Scale
      };
      
      const paymentPlanId = planIdMap[plan];
      
      if (!paymentPlanId) {
        throw new Error(`Invalid plan: ${plan}`);
      }
      
      // Generate checkout session
      const { sessionUrl } = await generateCheckoutSession(paymentPlanId);
      
      // Redirect to checkout page if we have a URL
      if (sessionUrl) {
        window.location.href = sessionUrl;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      setToast({
        text: `Error starting payment flow: ${error.message}`,
        type: 'error'
      });
    }
    setIsUpgradeModalOpen(false);
  };

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
                type="success" 
                icon={<ChevronUp />} 
                onClick={() => setIsUpgradeModalOpen(true)}
                auto
              >
                Need more connections? Upgrade Plan
              </Button>
            </Grid>
          </Grid.Container>

          <Spacer h={2} />

          <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.Item label={<div style={{ display: 'flex', alignItems: 'center' }}><Activity size={16} style={{ marginRight: '5px' }} /> Overview</div>} value="overview">
            <Card width="100%">
                <Card.Content>
                  <Zap size={24} />
                  <Text h4>App Limits</Text>
                  <Grid.Container gap={2}>
                    <Grid xs={24} md={6}>
                      <Description 
                        title="Max Connections" 
                        content={
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {app.plan === 'Scale' ? '300' : app.plan === 'Startup' ? '200' : '100'}
                            {app.maxConnections && (
                              <Progress value={(app.soketi_connected || 0) / (app.maxConnections / 100)} type="success" width="120px" />
                            )}
                          </div>
                        } 
                      />
                    </Grid>
                    <Grid xs={24} md={6}>
                      <Description 
                        title="Current Usage" 
                        content={`${app.soketi_connected || 0} / ${app.plan === 'Scale' ? '300' : app.plan === 'Startup' ? '200' : '100'}`} 
                      />
                    </Grid>
                    <Grid xs={24} md={6}>
                      <Description 
                        title="Daily Message Limit" 
                        content={app.plan === 'Scale' ? '1,000,000' : app.plan === 'Startup' ? '500,000' : '100,000'} 
                      />
                    </Grid>
                    <Grid xs={24} md={6}>
                      <Description 
                        title="Plan" 
                        content={
                          <Badge type={app.plan === 'Scale' ? 'secondary' : 'success'}>
                            {app.plan || 'Hobby'}
                          </Badge>
                        } 
                      />
                    </Grid>
                  </Grid.Container>
                </Card.Content>
              </Card>
              <Spacer h={2} />
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
              <Spacer h={2} />
            </Tabs.Item>

            <Tabs.Item label={<div style={{ display: 'flex', alignItems: 'center' }}><CodeIcon size={16} style={{ marginRight: '5px' }} /> Getting Started</div>} value="getting-started">
              <Card>
                <Card.Content>
                  <div>
                    <Text h3>Welcome to JetSocket!</Text>
                    <Text p>Here's how to get started with your WebSocket application.</Text>
                    
                    {hasApp && (
                      <Card shadow style={{ marginBottom: '20px', padding: '15px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Badge 
                              type={connectionStatus === 'Connected' ? 'success' : connectionStatus === 'Error' ? 'error' : 'warning'}
                            >
                              {connectionStatus}
                            </Badge>
                            {connectionStatus === 'Connected' && (
                              <div style={{
                                width: '8px',
                                height: '8px',
                                backgroundColor: '#0070f3',
                                borderRadius: '50%',
                                animation: 'pulse 2s infinite',
                              }} />
                            )}
                            <Text b>Live Demo Running!</Text>
                          </div>
                          <Text small type="secondary">
                            This page is actively using JetSocket right now - you're looking at a live WebSocket connection in action!
                          </Text>
                        </div>
                        <style jsx>{`
                          @keyframes pulse {
                            0% {
                              transform: scale(0.95);
                              box-shadow: 0 0 0 0 rgba(0, 112, 243, 0.7);
                            }
                            
                            70% {
                              transform: scale(1);
                              box-shadow: 0 0 0 6px rgba(0, 112, 243, 0);
                            }
                            
                            100% {
                              transform: scale(0.95);
                              box-shadow: 0 0 0 0 rgba(0, 112, 243, 0);
                            }
                          }
                        `}</style>
                      </Card>
                    )}
                    
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
                        <Code block width="100%">{`JETSOCKET_APP_ID="${app?.id || ''}"
JETSOCKET_APP_KEY="${app?.key || ''}"
JETSOCKET_APP_SECRET="${app?.secret || ''}"`}</Code>
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

      <Modal visible={isUpgradeModalOpen} onClose={() => setIsUpgradeModalOpen(false)} width="35rem">
        <Modal.Title>Upgrade Your Plan</Modal.Title>
        <Modal.Content>
          <Text p>Choose a plan that fits your needs and scale as you grow.</Text>
          <Spacer h={1} />
          
          <Grid.Container gap={2}>
            <Grid xs={24} md={12}>
              <Card shadow width="100%" style={{ height: '100%' }}>
                <Card.Content>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text h4>Startup</Text>
                    <Tag type="success">Popular</Tag>
                  </div>
                  <Text h3>${34.99}<Text small>/month</Text></Text>
                  <Spacer h={1} />
                  <Text p>Perfect for growing applications with moderate traffic.</Text>
                  <Spacer h={1} />
                  <div>
                    <Text p>✓ Up to 200 concurrent connections</Text>
                    <Text p>✓ 500,000 daily messages</Text>
                    <Text p>✓ Advanced analytics</Text>
                    <Text p>✓ 24/7 support</Text>
                    <Text p>✓ Custom domains</Text>
                  </div>
                  <Spacer h={1} />
                  <Button type="success" width="100%" onClick={() => handleUpgrade('Startup')}>Upgrade to Startup</Button>
                </Card.Content>
              </Card>
            </Grid>
            
            <Grid xs={24} md={12}>
              <Card shadow width="100%" style={{ height: '100%' }}>
                <Card.Content>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text h4>Scale</Text>
                    <Tag type="secondary">Enterprise</Tag>
                  </div>
                  <Text h3>${99.99}<Text small>/month</Text></Text>
                  <Spacer h={1} />
                  <Text p>For high-traffic applications with enterprise requirements.</Text>
                  <Spacer h={1} />
                  <div>
                    <Text p>✓ Up to 300 concurrent connections</Text>
                    <Text p>✓ 1,000,000 daily messages</Text>
                    <Text p>✓ Advanced analytics & monitoring</Text>
                    <Text p>✓ Priority 24/7 support</Text>
                    <Text p>✓ Custom domains</Text>
                    <Text p>✓ Dedicated infrastructure</Text>
                  </div>
                  <Spacer h={1} />
                  <Button type="secondary" width="100%" onClick={() => handleUpgrade('Scale')}>Upgrade to Scale</Button>
                </Card.Content>
              </Card>
            </Grid>
          </Grid.Container>
          
          <Spacer h={1} />
          <Note>
            All plans include a 14-day free trial. You can cancel anytime during the trial period.
          </Note>
        </Modal.Content>
        <Modal.Action passive onClick={() => setIsUpgradeModalOpen(false)}>Cancel</Modal.Action>
      </Modal>
    </Page>
  );
}; 