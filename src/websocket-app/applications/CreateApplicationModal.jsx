import { useState } from 'react';
import { createApplication, generateCheckoutSession } from 'wasp/client/operations';
import { Modal, Input, Text, Spacer, Textarea, Button, Select } from '@geist-ui/core';
import { useNavigate } from 'react-router-dom';
import { PaymentPlanId } from '../../payment/plans';

export function CreateApplicationModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    subscriptionPlan: PaymentPlanId.Hobby,
  });

  const handleSubmit = async () => {
    try {
      const app = await createApplication(formData);
      
      // Start payment flow
      const { sessionUrl } = await generateCheckoutSession(formData.subscriptionPlan);
      
      // If we have a checkout URL, redirect to it
      if (sessionUrl) {
        window.location.href = sessionUrl;
      } else {
        // If no checkout URL (should not happen), just close the modal
        setFormData({ name: '', description: '', subscriptionPlan: PaymentPlanId.Hobby });
        onClose();
      }
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