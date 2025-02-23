import { useParams } from 'react-router-dom';
import { useQuery } from 'wasp/client/operations';
import { getApplication, updateApplication } from 'wasp/client/operations';
import { 
  Page, 
  Grid, 
  Card, 
  Text, 
  Loading, 
  Badge, 
  Button, 
  Spacer,
  Tabs,
  Toggle,
  Description,
  Code,
  Note,
  useToasts
} from '@geist-ui/core';
import { Activity, Settings, Key, Terminal } from '@geist-ui/icons';
import { useState } from 'react';

export function AppDetailPage() {
  const { id } = useParams();
  const { data: app, isLoading, error } = useQuery(getApplication, { id });
  const [activeTab, setActiveTab] = useState('overview');
  const { setToast } = useToasts();

  if (isLoading) {
    return (
      <Page>
        <Loading>Loading application details</Loading>
      </Page>
    );
  }

  if (error) {
    return (
      <Page>
        <Text type="error">Error: {error.message}</Text>
      </Page>
    );
  }

  const handleToggleStatus = async () => {
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

  return (
    <Page>
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
            onClick={handleToggleStatus}
          >
            {app.enabled ? 'Disable' : 'Enable'} Application
          </Button>
        </Grid>
      </Grid.Container>

      <Spacer h={2} />

      <Grid.Container gap={2}>
        <Grid xs={24} md={6}>
          <Card width="100%">
            <Card.Content>
              <Activity size={24} />
              <Text h4>Connection Status</Text>
              <Badge 
                type={app.enabled ? (app.soketi_connected > 0 ? 'success' : 'warning') : 'error'}
                style={{ width: '100%' }}
              >
                {app.enabled 
                  ? (app.soketi_connected > 0 
                    ? `${app.soketi_connected} Active Connections`
                    : 'No Active Connections')
                  : 'Application Disabled'}
              </Badge>
            </Card.Content>
          </Card>
        </Grid>
        <Grid xs={24} md={6}>
          <Card width="100%">
            <Card.Content>
              <Terminal size={24} />
              <Text h4>Message Stats</Text>
              <Description title="Messages Sent" content={app.soketi_ws_messages_sent_total || 0} />
              <Description title="Messages Received" content={app.soketi_ws_messages_received_total || 0} />
            </Card.Content>
          </Card>
        </Grid>
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
      </Grid.Container>

      <Spacer h={2} />

      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.Item label="Overview" value="overview">
          <Card>
            <Card.Content>
              <Grid.Container gap={2}>
                <Grid xs={24} md={12}>
                  <div>
                    <Text h4>Traffic Statistics</Text>
                    <Description 
                      title="Total Data Received" 
                      content={`${(app.soketi_socket_received_bytes / 1024).toFixed(2)} KB`}
                    />
                    <Description 
                      title="Total Data Sent" 
                      content={`${(app.soketi_socket_transmitted_bytes / 1024).toFixed(2)} KB`}
                    />
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

              
                <Note type="error" label="Danger Zone">
                    Deleting this application will permanently remove all associated data and cannot be undone.
                    <Spacer h={0.5} />
                        <Button type="error" ghost auto>Delete Application</Button>
                </Note>
            </Card.Content>
          </Card>
        </Tabs.Item>
      </Tabs>
    </Page>
  );
} 