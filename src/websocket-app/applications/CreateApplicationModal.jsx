import { useState } from 'react';
import { createApplication } from 'wasp/client/operations';
import { Modal, Input, Text, Spacer, Textarea, Button } from '@geist-ui/core';

export function CreateApplicationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleSubmit = async () => {
    try {
      await createApplication(formData);
      setFormData({ name: '', description: '' });
      onClose();
    } catch (error) {
      console.error('Error creating application:', error);
    }
  };

  const handleChange = (value, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Modal visible={isOpen} onClose={onClose}>
      <Modal.Title>Create Application</Modal.Title>
      <Modal.Content>
        <Text type="secondary">Create a new application to manage your WebSocket connections.</Text>
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
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Button auto type="default" onClick={onClose}>
            Cancel
          </Button>
          <Button auto type="secondary" onClick={handleSubmit}>
            Create
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
} 