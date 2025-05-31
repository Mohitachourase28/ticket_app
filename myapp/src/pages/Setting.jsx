import { useState } from 'react';

export default function Settings() {
  const [theme, setTheme] = useState('Light');
  const [compactMode, setCompactMode] = useState(false);
  const [autoAssign, setAutoAssign] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState({
    newAssignments: true,
    updates: true,
    mentions: false,
    summaries: false,
  });

  const handleEmailChange = (field) => {
    setEmailNotifications({
      ...emailNotifications,
      [field]: !emailNotifications[field],
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 text-sm">
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">System Preferences</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">System Language</label>
            <select className="w-full border rounded p-2">
              <option>English (US)</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Time Zone</label>
            <select className="w-full border rounded p-2">
              <option>UTC-8 (Pacific Time)</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Date Format</label>
            <select className="w-full border rounded p-2">
              <option>MM/DD/YYYY</option>
            </select>
          </div>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Display Settings</h2>
        <div className="space-y-2">
          <div className="flex gap-4">
            {['Light', 'Dark', 'System'].map((mode) => (
              <label key={mode} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="theme"
                  value={mode}
                  checked={theme === mode}
                  onChange={() => setTheme(mode)}
                />
                {mode}
              </label>
            ))}
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={compactMode}
              onChange={() => setCompactMode(!compactMode)}
            />
            Compact Mode
          </label>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Ticket Settings</h2>
        <div className="space-y-2">
          <div>
            <label className="block mb-1 font-medium">Default Ticket View</label>
            <select className="w-full md:w-1/2 border rounded p-2">
              <option>List View</option>
            </select>
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={autoAssign}
              onChange={() => setAutoAssign(!autoAssign)}
            />
            Auto-assignment Rules
          </label>
          <div className="flex gap-2">
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">High</span>
            <span className="bg-yellow-400 text-white text-xs px-2 py-1 rounded-full">Medium</span>
            <span className="bg-green-400 text-white text-xs px-2 py-1 rounded-full">Low</span>
          </div>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Email Notifications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {Object.keys(emailNotifications).map((key) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={emailNotifications[key]}
                onChange={() => handleEmailChange(key)}
              />
              {key
                .replace('newAssignments', 'New ticket assignments')
                .replace('updates', 'Ticket updates')
                .replace('mentions', 'Mentions')
                .replace('summaries', 'Daily summaries')}
            </label>
          ))}
        </div>
      </section>

      <div className="flex gap-4 pt-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save Changes
        </button>
        <button className="text-gray-500 underline">Reset to Default</button>
      </div>
    </div>
  );
}
