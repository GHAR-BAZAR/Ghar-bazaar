import React, { useState } from 'react';
import { 
  Users2, 
  IndianRupee, 
  Package, 
  CheckCircle2, 
  Plus, 
  TrendingUp, 
  Building2, 
  Share2, 
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SHGMember } from '../types';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';

export const SHGManagementPage: React.FC = () => {
  const { shgGroup, shgMembers, updateMemberContribution, recordSHGPayout } = useApp();

  const [selectedMember, setSelectedMember] = useState<SHGMember | null>(null);
  const [contributionUnits, setContributionUnits] = useState('5');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [payoutModalMember, setPayoutModalMember] = useState<SHGMember | null>(null);

  const totalMembersCount = shgMembers.length;
  const totalItemsContributed = shgMembers.reduce((sum, m) => sum + m.itemsContributedCount, 0);
  const totalPayoutDistributed = shgMembers
    .filter(m => m.payoutStatus === 'Paid')
    .reduce((sum, m) => sum + m.totalEarningsShare, 0);
  const pendingPayoutTotal = shgMembers
    .filter(m => m.payoutStatus !== 'Paid')
    .reduce((sum, m) => sum + m.totalEarningsShare, 0);

  const handleAddContribution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember || Number(contributionUnits) <= 0) return;

    updateMemberContribution(selectedMember.id, Number(contributionUnits));
    setToastMessage(`Added ${contributionUnits} items to ${selectedMember.name}'s contribution ledger!`);
    setSelectedMember(null);
    setContributionUnits('5');

    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDisbursePayout = (member: SHGMember) => {
    recordSHGPayout(member.id);
    setPayoutModalMember(null);
    setToastMessage(`Simulated payout of ₹${member.totalEarningsShare} to ${member.name}'s Jan Dhan A/C!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-forest-900 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 border border-gold-400 animate-fade-in text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 text-gold-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-forest-50 text-forest-800 rounded-full text-xs font-bold border border-forest-200 mb-2">
            <Users2 className="w-3.5 h-3.5 text-forest-700" />
            <span>NRLM & NABARD SHG Cooperative Hub</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-forest-950">
            {shgGroup.name}
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
            Group Leader: <strong className="text-forest-900">{shgGroup.leaderName}</strong> • {shgGroup.villageOrCity} • {shgGroup.bankLinkedAccount}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Government Registered SHG</span>
          </span>
        </div>
      </div>

      <DisclaimerBanner 
        featureName="SHG Payouts & Member Ledgers"
        backendNeeded="NABARD SHG-Bank Linkage Portal (e-Shakti) and PFMS direct benefit transfer gateways"
      />

      {/* Top 4 Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="bg-white p-5 rounded-3xl border border-sand-200 shadow-soft">
          <span className="text-xs font-semibold text-charcoal-500">Active Women Artisans</span>
          <div className="text-2xl sm:text-3xl font-black text-forest-950 mt-2">
            {totalMembersCount}
          </div>
          <div className="mt-2 text-[11px] text-emerald-700 font-semibold">
            100% active contributors
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-sand-200 shadow-soft">
          <span className="text-xs font-semibold text-charcoal-500">Shared Catalog Production</span>
          <div className="text-2xl sm:text-3xl font-black text-forest-950 mt-2">
            {totalItemsContributed} Units
          </div>
          <div className="mt-2 text-[11px] text-charcoal-500">
            Handicrafts & home textiles
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-sand-200 shadow-soft">
          <span className="text-xs font-semibold text-charcoal-500">Distributed Member Earnings</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-2">
            ₹{totalPayoutDistributed.toLocaleString('en-IN')}
          </div>
          <div className="mt-2 text-[11px] text-charcoal-500">
            Paid directly to members
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-sand-200 shadow-soft">
          <span className="text-xs font-semibold text-charcoal-500">Pooled Revolving Balance</span>
          <div className="text-2xl sm:text-3xl font-black text-gold-600 mt-2">
            ₹{shgGroup.pooledFundBalance.toLocaleString('en-IN')}
          </div>
          <div className="mt-2 text-[11px] text-forest-800 font-semibold">
            Reserved for raw material bulk buy
          </div>
        </div>

      </div>

      {/* Member Contribution & Payout Ledger Table */}
      <div className="bg-white rounded-3xl border border-sand-200 shadow-soft overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-sand-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-base text-forest-950">Artisan Member Ledger & Transparent Payouts</h3>
            <p className="text-xs text-charcoal-500">
              Earnings are automatically computed proportionally based on units crafted and orders fulfilled.
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-sand-100 rounded-xl text-forest-900">
            Pending Payouts: ₹{pendingPayoutTotal.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-sand-50/70 border-b border-sand-200 text-charcoal-500 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-5">Member Name</th>
                <th className="py-3.5 px-5">Specialty Skill / Role</th>
                <th className="py-3.5 px-5">Units Contributed</th>
                <th className="py-3.5 px-5">Last Activity</th>
                <th className="py-3.5 px-5">Earnings Share</th>
                <th className="py-3.5 px-5">Payout Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-200">
              {shgMembers.map(member => (
                <tr key={member.id} className="hover:bg-sand-50/50 transition">
                  <td className="py-3.5 px-5">
                    <div className="font-bold text-xs text-charcoal-900">{member.name}</div>
                    <div className="text-[10px] text-charcoal-400 font-mono">{member.phone}</div>
                  </td>

                  <td className="py-3.5 px-5 text-charcoal-700">
                    <span className="font-medium">{member.role}</span>
                    <span className="text-[10px] text-forest-800 block">{member.specialtySkill}</span>
                  </td>

                  <td className="py-3.5 px-5 font-extrabold text-forest-950">
                    {member.itemsContributedCount} units
                  </td>

                  <td className="py-3.5 px-5 text-charcoal-500">
                    {member.lastContribution}
                  </td>

                  <td className="py-3.5 px-5 font-black text-sm text-forest-900">
                    ₹{member.totalEarningsShare.toLocaleString('en-IN')}
                  </td>

                  <td className="py-3.5 px-5">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] inline-flex items-center gap-1 ${
                      member.payoutStatus === 'Paid'
                        ? 'bg-emerald-100 text-emerald-800'
                        : member.payoutStatus === 'Processing'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {member.payoutStatus === 'Paid' && <CheckCircle2 className="w-3 h-3" />}
                      {member.payoutStatus === 'Processing' && <Clock className="w-3 h-3" />}
                      <span>{member.payoutStatus}</span>
                    </span>
                  </td>

                  <td className="py-3.5 px-5 text-right space-x-1.5">
                    <button
                      onClick={() => setSelectedMember(member)}
                      className="px-2.5 py-1 bg-sand-100 hover:bg-forest-100 text-forest-900 rounded-lg text-[10px] font-bold border border-sand-300 transition"
                    >
                      + Add Batch
                    </button>

                    {member.payoutStatus !== 'Paid' && (
                      <button
                        onClick={() => setPayoutModalMember(member)}
                        className="px-2.5 py-1 bg-forest-800 hover:bg-forest-900 text-white rounded-lg text-[10px] font-bold transition"
                      >
                        Disburse Payout
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Contribution Batch Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-sand-200">
            <h3 className="font-bold text-base text-forest-950 mb-1">
              Log Production Batch for {selectedMember.name}
            </h3>
            <p className="text-xs text-charcoal-500 mb-4">
              Skill: {selectedMember.specialtySkill}
            </p>

            <form onSubmit={handleAddContribution} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-charcoal-800 block mb-1">
                  Number of Finished Units Made*
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={contributionUnits}
                  onChange={(e) => setContributionUnits(e.target.value)}
                  className="w-full px-3 py-2 bg-sand-50 rounded-xl border border-sand-300 font-bold text-sm text-forest-900 focus:outline-none focus:border-forest-600"
                />
              </div>

              <div className="p-3 bg-sand-50 rounded-xl border border-sand-200 text-charcoal-600 text-[11px]">
                Estimated payout addition: <strong className="text-forest-900">+₹{Number(contributionUnits) * 250}</strong> (₹250/unit formula)
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMember(null)}
                  className="w-1/2 py-2 rounded-xl border border-sand-300 font-semibold text-charcoal-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold shadow-md"
                >
                  Confirm Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payout Disbursement Simulation Modal */}
      {payoutModalMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-sand-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-forest-50 text-forest-800 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-forest-800" />
            </div>

            <div>
              <h3 className="font-bold text-lg text-forest-950">
                Disburse Payout to {payoutModalMember.name}
              </h3>
              <p className="text-xs text-charcoal-500">
                Simulated Direct Benefit Transfer (DBT) to Jan Dhan Bank Account
              </p>
            </div>

            <div className="p-4 bg-sand-50 rounded-2xl border border-sand-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-charcoal-500">Payee Name:</span>
                <span className="font-bold text-charcoal-900">{payoutModalMember.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Total Units Contributed:</span>
                <span className="font-bold text-charcoal-900">{payoutModalMember.itemsContributedCount} units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Bank Account Linked:</span>
                <span className="font-mono text-charcoal-800">Bank of Baroda •••• 9812</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-sand-200 text-sm">
                <span className="font-bold text-forest-950">Disbursement Amount:</span>
                <span className="font-extrabold text-forest-900">₹{payoutModalMember.totalEarningsShare}</span>
              </div>
            </div>

            <div className="p-2.5 bg-forest-50 border border-forest-200 rounded-xl text-[11px] text-forest-900">
              Demo Simulation: No real money is transferred. In production, this integrates via PFMS / UPI Autopay.
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPayoutModalMember(null)}
                className="w-1/2 py-2.5 rounded-xl border border-sand-300 font-semibold text-xs text-charcoal-600 hover:bg-sand-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDisbursePayout(payoutModalMember)}
                className="w-1/2 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs shadow-md"
              >
                Simulate Transfer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
