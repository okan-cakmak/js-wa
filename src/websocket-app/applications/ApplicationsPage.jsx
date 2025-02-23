import { useState } from 'react';
import { useQuery } from 'wasp/client/operations';
import { getApplications, updateApplication } from 'wasp/client/operations';
import { CreateApplicationModal } from './CreateApplicationModal';
import { useNavigate } from 'react-router-dom';
import { routes } from 'wasp/client/router';
import { Page, Grid, Card, Text, Loading, Table, Badge, Button, Input, Spacer, Select } from '@geist-ui/core';
import { Plus, Search, Activity } from '@geist-ui/icons';

export function ApplicationsPage() {
  const { data: applications, isLoading, error } = useQuery(getApplications);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  if (error) {
    return (
      <Page>
        <Text type="error">Error: {error.message}</Text>
      </Page>
    );
  }

  const filteredApps = applications?.filter(app => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'active' && app.enabled) || 
      (filter === 'inactive' && !app.enabled);
    
    const matchesSearch = 
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.description?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  }) || [];

  const totalApps = applications?.length || 0;
  const activeApps = applications?.filter(app => app.enabled).length || 0;
  const inactiveApps = applications?.filter(app => !app.enabled).length || 0;

  const handleFilterChange = value => {
    setFilter(value);
  };

  const handleRowClick = (app) => {
    navigate(`/applications/${app.id}`);
  };

  return (
    <Page>
      <Text h1>Applications</Text>
      <Text p type="secondary">Manage your applications and their status</Text>
      <Spacer h={2} />

      <Grid.Container gap={2}>
        <Grid xs={24} sm={8}>
          <Card width="100%">
            <Card.Content>
              <Activity size={24} />
              <Text h4>Total Applications</Text>
              <Text h2>{totalApps}</Text>
              <Text small type="secondary">
                {activeApps} active, {inactiveApps} inactive
              </Text>
            </Card.Content>
          </Card>
        </Grid>
      </Grid.Container>

      <Spacer h={2} />

      <Grid.Container gap={2}>
        <Grid xs={24} md={8}>
          <Select 
            value={filter} 
            onChange={handleFilterChange}
            width="100%"
          >
            <Select.Option value="all">All Applications</Select.Option>
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
          </Select>
        </Grid>
        <Grid xs={24} md={8}>
          <Input 
            icon={<Search />}
            placeholder="Search applications..." 
            width="100%"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid xs={24} md={8} justify="flex-end">
          <Button 
            auto 
            type="secondary"
            icon={<Plus />}
            onClick={() => setIsModalOpen(true)}
          >
            New Application
          </Button>
        </Grid>
      </Grid.Container>

      <Spacer h={2} />

      {isLoading ? (
        <Loading>Loading applications</Loading>
      ) : filteredApps.length === 0 ? (
        <Card>
          <Card.Content>
            <Text>No applications found</Text>
          </Card.Content>
        </Card>
      ) : (
        <Table 
          data={filteredApps}
          hover
        >
          <Table.Column prop="name" label="Name" render={(value, app) => (
            <div style={{ cursor: 'pointer' }} onClick={() => handleRowClick(app)}>
              {value}
            </div>
          )} />
          <Table.Column prop="description" label="Description" render={(value, app) => (
            <div style={{ cursor: 'pointer' }} onClick={() => handleRowClick(app)}>
              {value}
            </div>
          )} />
          <Table.Column prop="enabled" label="Status" render={(value, app) => (
            <div style={{ cursor: 'pointer' }} onClick={() => handleRowClick(app)}>
              <Badge type={value ? 'success' : 'error'}>
                {value ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          )} />
          <Table.Column prop="soketi_connected" label="Connections" render={(value, app) => (
            <div style={{ cursor: 'pointer' }} onClick={() => handleRowClick(app)}>
              <Badge type={value > 0 ? 'success' : 'secondary'}>
                {value || 0} active
              </Badge>
            </div>
          )} />
        </Table>
      )}

      <CreateApplicationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Page>
  );
} 