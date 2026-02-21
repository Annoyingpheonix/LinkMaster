import React, { useState } from 'react';
import { User, Mail, Bell, Shield, CreditCard, Save, LogOut, FileText, Download, Link2, Unlink } from 'lucide-react';

const AccountSettings: React.FC = () => {
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    title: 'Senior Product Manager',
    email: 'john.doe@example.com',
    bio: 'Building products that matter. Passionate about AI and Growth.',
  });

  const [notifications, setNotifications] = useState({
    emailDigest: true,
    newFeatures: true,
    marketing: false,
  });

  const [connections, setConnections] = useState({
    google: true,
    linkedin: false,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  const toggleConnection = (service: 'google' | 'linkedin') => {
    setConnections(prev => ({ ...prev, [service]: !prev[service] }));
  };

  const invoices = [
    { id: 'INV-2024-001', date: 'Dec 01, 2024', amount: '$29.00', status: 'Paid' },
    { id: 'INV-2024-002', date: 'Nov 01, 2024', amount: '$29.00', status: 'Paid' },
    { id: 'INV-2024-003', date: 'Oct 01, 2024', amount: '$29.00', status: 'Paid' },
  ];

  const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );

  const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#0077b5" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Account Settings</h2>
          <p className="text-slate-500">Manage your profile, preferences, and billing.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-70"
        >
          {isSaving ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={18} />
              Save Changes
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          
          {/* Profile Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <User size={20} />
              </div>
              <h3 className="font-semibold text-slate-800">Profile Information</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="email"
                    value={profile.email}
                    readOnly
                    className="w-full pl-9 p-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-500 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">Contact support to change your email.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Short Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows={3}
                  className="w-full p-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Connected Accounts Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                <Link2 size={20} />
              </div>
              <h3 className="font-semibold text-slate-800">Connected Accounts</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <GoogleIcon />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Google</p>
                    <p className="text-xs text-slate-500">{connections.google ? 'Connected as john.doe@gmail.com' : 'Not connected'}</p>
                  </div>
                </div>
                <button 
                  onClick={() => toggleConnection('google')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    connections.google 
                      ? 'border-slate-200 text-slate-600 hover:bg-slate-100' 
                      : 'border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100'
                  }`}
                >
                  {connections.google ? 'Disconnect' : 'Connect'}
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <LinkedInIcon />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">LinkedIn</p>
                    <p className="text-xs text-slate-500">{connections.linkedin ? 'Connected' : 'Sync your profile data'}</p>
                  </div>
                </div>
                <button 
                  onClick={() => toggleConnection('linkedin')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    connections.linkedin 
                      ? 'border-slate-200 text-slate-600 hover:bg-slate-100' 
                      : 'border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100'
                  }`}
                >
                  {connections.linkedin ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                <Bell size={20} />
              </div>
              <h3 className="font-semibold text-slate-800">Notification Preferences</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-800">Weekly Performance Digest</p>
                  <p className="text-xs text-slate-500">Get a summary of your top posts every Monday.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={notifications.emailDigest}
                    onChange={() => setNotifications({...notifications, emailDigest: !notifications.emailDigest})}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <hr className="border-slate-100" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-800">Product Updates</p>
                  <p className="text-xs text-slate-500">Be the first to know about new AI features.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={notifications.newFeatures}
                    onChange={() => setNotifications({...notifications, newFeatures: !notifications.newFeatures})}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg text-green-600">
                <Shield size={20} />
              </div>
              <h3 className="font-semibold text-slate-800">Security</h3>
            </div>
            <div className="p-6">
              <button className="text-sm text-blue-600 font-medium hover:underline">Change Password</button>
              <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-slate-800">Two-Factor Authentication</p>
                  <p className="text-xs text-slate-500">Add an extra layer of security to your account.</p>
                </div>
                <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 shadow-sm">
                  Enable
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Billing & Subscription */}
        <div className="space-y-6">
          {/* Subscription Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
             <div className="p-6 border-b border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                <CreditCard size={20} />
              </div>
              <h3 className="font-semibold text-slate-800">Subscription</h3>
            </div>
            <div className="p-6">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-5 text-white mb-6">
                <p className="text-indigo-100 text-xs font-medium uppercase tracking-wider mb-1">Current Plan</p>
                <h4 className="text-2xl font-bold">Pro Plan</h4>
                <p className="text-sm text-indigo-100 mt-2 opacity-90">$29.00 / month</p>
                <div className="mt-4 text-xs bg-white/20 inline-block px-2 py-1 rounded">
                  Renews on Dec 12, 2024
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">AI Generations</span>
                  <span className="font-medium text-slate-800">1,450 / 2,000</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>

              <button className="w-full py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                Upgrade Plan
              </button>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
             <div className="p-6 border-b border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
                <CreditCard size={20} />
              </div>
              <h3 className="font-semibold text-slate-800">Payment Method</h3>
            </div>
            <div className="p-6">
               <div className="flex items-center gap-4 p-3 border border-slate-200 rounded-lg bg-slate-50">
                  <div className="w-10 h-6 bg-slate-200 rounded flex items-center justify-center text-xs font-bold text-slate-500">VISA</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">•••• 4242</p>
                    <p className="text-xs text-slate-500">Expires 12/28</p>
                  </div>
               </div>
               <button className="mt-4 text-sm text-blue-600 font-medium hover:underline">Update card</button>
            </div>
          </div>

          {/* Invoice History */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
             <div className="p-6 border-b border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
                <FileText size={20} />
              </div>
              <h3 className="font-semibold text-slate-800">Billing History</h3>
            </div>
            <div className="p-0">
               {invoices.map((inv) => (
                 <div key={inv.id} className="flex items-center justify-between p-4 border-b border-slate-50 last:border-none hover:bg-slate-50 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{inv.date}</p>
                      <p className="text-xs text-slate-500">{inv.amount}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Paid</span>
                      <button className="text-slate-400 hover:text-slate-600">
                        <Download size={16} />
                      </button>
                    </div>
                 </div>
               ))}
            </div>
            <div className="p-4 text-center border-t border-slate-100">
                <button className="text-sm text-blue-600 font-medium hover:underline">View all invoices</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;