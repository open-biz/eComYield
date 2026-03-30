import { NextResponse } from "next/server";

export async function GET() {
  // In production, this would fetch from your database
  // For now, return realistic mock data that could come from a DB
  const data = {
    availableAdvance: 4250.0,
    advanceLimit: 10000.0,
    feeRate: 1.5,
    stats: {
      todaySales: 1842.30,
      todaySalesChange: 12.4,
      pendingSettlement: 6210.0,
      pendingSettlementDays: 3,
      ordersShipped: 47,
      ordersShippedToday: 8,
      nextPayout: 3105.0,
      nextPayoutDate: "Tomorrow",
    },
    recentAdvances: [
      { date: "Jun 12, 2025", amount: 2500.0, status: "Repaid" },
      { date: "Jun 5, 2025", amount: 3800.0, status: "Repaid" },
      { date: "May 28, 2025", amount: 1900.0, status: "Repaid" },
    ],
    accountSummary: {
      totalAdvancedMTD: 12450.0,
      totalRepaidMTD: 8200.0,
      outstandingBalance: 4250.0,
    },
  };

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}