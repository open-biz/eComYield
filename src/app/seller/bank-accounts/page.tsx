"use client";

import { TreasurySection } from "@/components/treasury-section";
import { SellerBreadcrumb } from "@/components/breadcrumb";

export default function BankAccountsPage() {
  return (
    <div className="max-w-5xl">
      <SellerBreadcrumb items={[{ label: "Bank Accounts", href: "/seller/bank-accounts" }]} />
      <TreasurySection 
        availableBalance={12847.50}
        usdcBalance={2150}
        savingsBalance={5420}
      />
    </div>
  );
}