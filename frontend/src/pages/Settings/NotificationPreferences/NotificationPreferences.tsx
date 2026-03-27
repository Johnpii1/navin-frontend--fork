import React, { useState } from 'react';
import { Bell, Loader2, Save, CheckCircle2 } from 'lucide-react';
import './NotificationPreferences.css';

interface NotificationCategory {
  key: string;
  label: string;
  description: string;
}

const CATEGORIES: NotificationCategory[] = [
  {
    key: 'shipmentUpdates',
    label: 'Shipment Updates',
    description: 'Get notified when shipment status changes or milestones are reached',
  },
  {
    key: 'paymentAlerts',
    label: 'Payment Alerts',
    description: 'Receive alerts for payment settlements and transaction events',
  },
  {
    key: 'deliveryConfirmations',
    label: 'Delivery Confirmations',
    description: 'Be notified when deliveries are confirmed on-chain',
  },
  {
    key: 'systemAnnouncements',
    label: 'System Announcements',
    description: 'Platform updates, maintenance notices, and feature announcements',
  },
];

type Preferences = Record<string, boolean>;

const NotificationPreferences: React.FC = () => {
  const [preferences, setPreferences] = useState<Preferences>({
    shipmentUpdates: true,
    paymentAlerts: true,
    deliveryConfirmations: true,
    systemAnnouncements: false,
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const toggle = (key: string) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setLoading(true);
    setSuccessMsg('');
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg('Preferences saved successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    }, 1500);
  };

  return (
    <div className="notif-pref-container">
      <div className="notif-pref-header">
        <Bell className="notif-pref-icon" size={24} />
        <div>
          <h2>Notification Preferences</h2>
          <p>Choose which in-app notifications you want to receive.</p>
        </div>
      </div>

      <div className="notif-pref-list">
        {CATEGORIES.map(({ key, label, description }) => (
          <div key={key} className="notif-pref-row">
            <div className="notif-pref-info">
              <span className="notif-pref-label">{label}</span>
              <span className="notif-pref-desc">{description}</span>
            </div>
            <label className="notif-switch">
              <input
                type="checkbox"
                checked={preferences[key]}
                onChange={() => toggle(key)}
                aria-label={`Toggle ${label}`}
              />
              <span className="notif-slider round"></span>
            </label>
          </div>
        ))}
      </div>

      <div className="notif-pref-footer">
        {successMsg && (
          <div className="notif-success-toast">
            <CheckCircle2 size={16} />
            {successMsg}
          </div>
        )}
        <button
          className="notif-save-btn"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="notif-spinner" size={16} />
              Saving...
            </>
          ) : (
            <>
              <Save size={16} />
              Save Preferences
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default NotificationPreferences;
