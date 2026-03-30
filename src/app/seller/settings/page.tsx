"use client";

import { useState } from "react";
import { User, Building, Banknote, Bell, Shield, Key, Save } from "lucide-react";
import { SellerBreadcrumb } from "@/components/breadcrumb";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "business", label: "Business", icon: Building },
  { id: "payouts", label: "Payouts", icon: Banknote },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="max-w-4xl">
      <SellerBreadcrumb items={[{ label: "Settings", href: "/seller/settings" }]} />
      <h1 className="text-3xl font-bold text-[#1C1B18] tracking-tight mb-8">Settings</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:w-56 flex-shrink-0">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-2.5 text-sm rounded-sm whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-[#0A2E20] text-[#F5F3EC]"
                      : "text-[#1C1B18]/60 hover:text-[#1C1B18] hover:bg-[#EBE8DE]"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.5} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white border border-[#1C1B18]/10 rounded-sm p-6">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-[#1C1B18]">Profile Settings</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1C1B18]/70 mb-2">First Name</label>
                  <input
                    type="text"
                    defaultValue="John"
                    className="w-full border border-[#1C1B18]/10 px-4 py-2.5 text-sm focus:border-[#0A2E20] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1C1B18]/70 mb-2">Last Name</label>
                  <input
                    type="text"
                    defaultValue="Seller"
                    className="w-full border border-[#1C1B18]/10 px-4 py-2.5 text-sm focus:border-[#0A2E20] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1C1B18]/70 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="john@seller.com"
                  className="w-full border border-[#1C1B18]/10 px-4 py-2.5 text-sm focus:border-[#0A2E20] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1C1B18]/70 mb-2">Phone</label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="w-full border border-[#1C1B18]/10 px-4 py-2.5 text-sm focus:border-[#0A2E20] focus:outline-none"
                />
              </div>

              <button className="flex items-center gap-2 bg-[#0A2E20] text-[#F5F3EC] px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-colors">
                <Save size={16} />
                Save Changes
              </button>
            </div>
          )}

          {activeTab === "business" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-[#1C1B18]">Business Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-[#1C1B18]/70 mb-2">Business Name</label>
                <input
                  type="text"
                  defaultValue="Your Business LLC"
                  className="w-full border border-[#1C1B18]/10 px-4 py-2.5 text-sm focus:border-[#0A2E20] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1C1B18]/70 mb-2">Business Type</label>
                <select className="w-full border border-[#1C1B18]/10 px-4 py-2.5 text-sm focus:border-[#0A2E20] focus:outline-none">
                  <option>LLC</option>
                  <option>Corporation</option>
                  <option>Sole Proprietorship</option>
                  <option>Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1C1B18]/70 mb-2">Tax ID (EIN)</label>
                <input
                  type="text"
                  defaultValue="12-3456789"
                  className="w-full border border-[#1C1B18]/10 px-4 py-2.5 text-sm focus:border-[#0A2E20] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1C1B18]/70 mb-2">Business Address</label>
                <textarea
                  defaultValue="123 Business St, San Francisco, CA 94102"
                  rows={3}
                  className="w-full border border-[#1C1B18]/10 px-4 py-2.5 text-sm focus:border-[#0A2E20] focus:outline-none resize-none"
                />
              </div>

              <button className="flex items-center gap-2 bg-[#0A2E20] text-[#F5F3EC] px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-colors">
                <Save size={16} />
                Save Changes
              </button>
            </div>
          )}

          {activeTab === "payouts" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-[#1C1B18]">Payout Settings</h2>
              
              <div>
                <label className="block text-sm font-medium text-[#1C1B18]/70 mb-2">Default Payout Method</label>
                <select className="w-full border border-[#1C1B18]/10 px-4 py-2.5 text-sm focus:border-[#0A2E20] focus:outline-none">
                  <option>Bank Transfer (ACH)</option>
                  <option>Wire Transfer</option>
                  <option>USDC (Solana)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1C1B18]/70 mb-2">Minimum Payout Amount</label>
                <input
                  type="number"
                  defaultValue="100"
                  className="w-full border border-[#1C1B18]/10 px-4 py-2.5 text-sm focus:border-[#0A2E20] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="autoPayout" defaultChecked className="w-4 h-4" />
                <label htmlFor="autoPayout" className="text-sm text-[#1C1B18]/70">
                  Enable automatic daily payouts
                </label>
              </div>

              <button className="flex items-center gap-2 bg-[#0A2E20] text-[#F5F3EC] px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-colors">
                <Save size={16} />
                Save Changes
              </button>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-[#1C1B18]">Notification Preferences</h2>
              
              <div className="space-y-4">
                {[
                  { label: "Email me when I receive an advance", defaultChecked: true },
                  { label: "Email me when a payment is deposited", defaultChecked: true },
                  { label: "Email me when my advance is approved", defaultChecked: true },
                  { label: "Weekly summary of activity", defaultChecked: false },
                  { label: "Marketing and promotional emails", defaultChecked: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked={item.defaultChecked} className="w-4 h-4" />
                    <label className="text-sm text-[#1C1B18]/70">{item.label}</label>
                  </div>
                ))}
              </div>

              <button className="flex items-center gap-2 bg-[#0A2E20] text-[#F5F3EC] px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-colors">
                <Save size={16} />
                Save Changes
              </button>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-[#1C1B18]">Security Settings</h2>
              
              <div className="p-4 bg-[#EBE8DE] rounded-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Key size={20} className="text-[#0A2E20]" />
                  <span className="font-medium text-[#1C1B18]">Two-Factor Authentication</span>
                </div>
                <p className="text-sm text-[#1C1B18]/60 mb-3">Add an extra layer of security to your account</p>
                <button className="text-sm font-medium text-[#0A2E20] hover:underline">Enable 2FA</button>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1C1B18]/70 mb-2">Change Password</label>
                <input
                  type="password"
                  placeholder="Current password"
                  className="w-full border border-[#1C1B18]/10 px-4 py-2.5 text-sm mb-3 focus:border-[#0A2E20] focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="New password"
                  className="w-full border border-[#1C1B18]/10 px-4 py-2.5 text-sm mb-3 focus:border-[#0A2E20] focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full border border-[#1C1B18]/10 px-4 py-2.5 text-sm focus:border-[#0A2E20] focus:outline-none"
                />
              </div>

              <button className="flex items-center gap-2 bg-[#0A2E20] text-[#F5F3EC] px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-colors">
                <Save size={16} />
                Update Password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}