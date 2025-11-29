import React, { useState, useEffect } from "react";
import useUser from "../hooks/useUser";
import ReferralDashboard from "./ReferralDashboard";
import {
  User,
  Lock,
  Share2,
  Trash2,
  Save,
  Key,
  Mail,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Shield
} from 'lucide-react';

const Profile = () => {
  const { user, updateUser, deleteUser, changePassword, fetchUser } = useUser();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileForm, setProfileForm] = useState({ name: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({ 
    currentPassword: "", 
    newPassword: "", 
    confirmPassword: "" 
  });
  const [loading, setLoading] = useState({ profile: false, password: false });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [notifications, setNotifications] = useState({
    profile: { show: false, message: "", type: "" },
    password: { show: false, message: "", type: "" }
  });

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setProfileForm({ 
        name: user.name || "", 
        email: user.email || "" 
      });
    }
  }, [user]);

  const showNotification = (type, message, section) => {
    setNotifications(prev => ({
      ...prev,
      [section]: { show: true, message, type }
    }));
    setTimeout(() => {
      setNotifications(prev => ({
        ...prev,
        [section]: { ...prev[section], show: false }
      }));
    }, 5000);
  };

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, profile: true }));
    
    try {
      await updateUser(profileForm);
      showNotification('success', 'Profile updated successfully!', 'profile');
      fetchUser();
    } catch (err) {
      console.error(err);
      showNotification('error', 'Failed to update profile. Please try again.', 'profile');
    } finally {
      setLoading(prev => ({ ...prev, profile: false }));
    }
  };

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showNotification('error', 'New password and confirm password do not match.', 'password');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      showNotification('error', 'Password must be at least 6 characters long.', 'password');
      return;
    }

    setLoading(prev => ({ ...prev, password: true }));
    
    try {
      await changePassword({ 
        currentPassword: passwordForm.currentPassword, 
        newPassword: passwordForm.newPassword 
      });
      showNotification('success', 'Password changed successfully!', 'password');
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      console.error(err);
      showNotification('error', 'Failed to change password. Please check your current password.', 'password');
    } finally {
      setLoading(prev => ({ ...prev, password: false }));
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    const confirm1 = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirm1) return;
    
    const confirm2 = window.confirm("This will permanently delete all your data, including referral history and team progress. Type 'DELETE' to confirm.");
    if (!confirm2) return;

    const userInput = prompt("Please type 'DELETE' to confirm account deletion:");
    if (userInput !== 'DELETE') {
      alert('Account deletion cancelled.');
      return;
    }

    try {
      await deleteUser();
      alert("Account deleted successfully!");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Failed to delete account. Please try again.");
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    const strengths = {
      0: { label: 'Very Weak', color: 'bg-red-500' },
      1: { label: 'Weak', color: 'bg-red-400' },
      2: { label: 'Fair', color: 'bg-yellow-500' },
      3: { label: 'Good', color: 'bg-blue-500' },
      4: { label: 'Strong', color: 'bg-green-500' },
      5: { label: 'Very Strong', color: 'bg-green-600' }
    };

    return { strength, ...strengths[strength] };
  };

  const passwordStrength = getPasswordStrength(passwordForm.newPassword);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            {user.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-lg text-gray-600">Manage your account settings and preferences</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className={`w-2 h-2 rounded-full ${
              user.role === 'admin' ? 'bg-red-500' : 
              user.role === 'vendor' ? 'bg-orange-500' : 'bg-green-500'
            }`}></div>
            <span className="text-sm text-gray-500 capitalize">{user.role}</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'password', label: 'Security', icon: Lock },
              { id: 'referral', label: 'Referral Program', icon: Share2 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all flex-1 min-w-[140px] justify-center ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="space-y-3 mb-6">
          {notifications.profile.show && (
            <div className={`flex items-center gap-3 p-4 rounded-lg border ${
              notifications.profile.type === 'success' 
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              {notifications.profile.type === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              {notifications.profile.message}
            </div>
          )}

          {notifications.password.show && (
            <div className={`flex items-center gap-3 p-4 rounded-lg border ${
              notifications.password.type === 'success' 
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              {notifications.password.type === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              {notifications.password.message}
            </div>
          )}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
              </div>
              
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600">
                      Last updated: {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'Never'}
                    </p>
                  </div>
                  <button
                    type="submit"
                    disabled={loading.profile}
                    className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    {loading.profile ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>

              {/* Danger Zone */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <Trash2 className="w-6 h-6 text-red-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Danger Zone</h2>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-red-800 mb-2">
                        Delete Account
                      </h3>
                      <p className="text-red-700 mb-4 max-w-2xl">
                        Once you delete your account, there is no going back. This will permanently delete all your data, 
                        including your profile, referral history, team progress, and all associated information.
                      </p>
                      <ul className="text-sm text-red-600 space-y-1 mb-4">
                        <li>• All your personal data will be erased</li>
                        <li>• Your referral links will stop working</li>
                        <li>• Team members under you will remain in the system</li>
                        <li>• This action cannot be undone</li>
                      </ul>
                    </div>
                  </div>
                  <button
                    onClick={handleDeleteAccount}
                    className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete My Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'password' && (
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">Security Settings</h2>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPasswords.current ? "text" : "password"}
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="w-full pl-11 pr-11 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter current password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('current')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPasswords.new ? "text" : "password"}
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="w-full pl-11 pr-11 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter new password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('new')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    
                    {/* Password Strength Meter */}
                    {passwordForm.newPassword && (
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Password strength:</span>
                          <span className={`font-medium ${
                            passwordStrength.strength <= 2 ? 'text-red-600' :
                            passwordStrength.strength <= 3 ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {passwordStrength.label}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                            style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPasswords.confirm ? "text" : "password"}
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full pl-11 pr-11 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Confirm new password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('confirm')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    
                    {/* Password Match Indicator */}
                    {passwordForm.confirmPassword && (
                      <div className={`flex items-center gap-2 mt-2 text-sm ${
                        passwordForm.newPassword === passwordForm.confirmPassword 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {passwordForm.newPassword === passwordForm.confirmPassword ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <AlertCircle className="w-4 h-4" />
                        )}
                        {passwordForm.newPassword === passwordForm.confirmPassword 
                          ? 'Passwords match' 
                          : 'Passwords do not match'
                        }
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={loading.password || passwordForm.newPassword !== passwordForm.confirmPassword}
                    className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Key className="w-4 h-4" />
                    {loading.password ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>

              {/* Security Tips */}
              <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Security Tips</h3>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li>• Use a unique password that you don't use elsewhere</li>
                  <li>• Include numbers, symbols, and both uppercase and lowercase letters</li>
                  <li>• Avoid using personal information like your name or birthdate</li>
                  <li>• Consider using a password manager to generate and store secure passwords</li>
                </ul>
              </div>
            </div>
          )}

          {/* Referral Tab */}
          {activeTab === 'referral' && (
            <div className="p-1">
              <ReferralDashboard />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;