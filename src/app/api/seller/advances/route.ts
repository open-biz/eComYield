import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "All";
  const dateRange = searchParams.get("dateRange") || "All";
  const search = searchParams.get("search") || "";

  // In production, this would be a database query with proper filtering
  const advances = [
    {
      id: "ADV-001",
      date: "Jun 12, 2025",
      amount: 2500.0,
      fee: 37.5,
      net: 2462.5,
      sales: 3125.0,
      status: "Repaid",
      settledDate: "Jun 26, 2025",
      daysToSettle: 14,
    },
    {
      id: "ADV-002",
      date: "Jun 11, 2025",
      amount: 1800.0,
      fee: 27.0,
      net: 1773.0,
      sales: 2250.0,
      status: "Repaid",
      settledDate: "Jun 25, 2025",
      daysToSettle: 14,
    },
    {
      id: "ADV-003",
      date: "Jun 10, 2025",
      amount: 3200.0,
      fee: 48.0,
      net: 3152.0,
      sales: 4000.0,
      status: "Repaid",
      settledDate: "Jun 24, 2025",
      daysToSettle: 14,
    },
    {
      id: "ADV-004",
      date: "Jun 9, 2025",
      amount: 1500.0,
      fee: 22.5,
      net: 1477.5,
      sales: 1875.0,
      status: "Repaid",
      settledDate: "Jun 23, 2025",
      daysToSettle: 14,
    },
    {
      id: "ADV-005",
      date: "Jun 8, 2025",
      amount: 2800.0,
      fee: 42.0,
      net: 2758.0,
      sales: 3500.0,
      status: "Repaid",
      settledDate: "Jun 22, 2025",
      daysToSettle: 14,
    },
    {
      id: "ADV-006",
      date: "Jun 7, 2025",
      amount: 2100.0,
      fee: 31.5,
      net: 2068.5,
      sales: 2625.0,
      status: "Repaid",
      settledDate: "Jun 21, 2025",
      daysToSettle: 14,
    },
    {
      id: "ADV-007",
      date: "Jun 6, 2025",
      amount: 1900.0,
      fee: 28.5,
      net: 1871.5,
      sales: 2375.0,
      status: "Repaid",
      settledDate: "Jun 20, 2025",
      daysToSettle: 14,
    },
    {
      id: "ADV-008",
      date: "Jun 5, 2025",
      amount: 3800.0,
      fee: 57.0,
      net: 3743.0,
      sales: 4750.0,
      status: "Repaid",
      settledDate: "Jun 19, 2025",
      daysToSettle: 14,
    },
    {
      id: "ADV-009",
      date: "Jun 4, 2025",
      amount: 1650.0,
      fee: 24.75,
      net: 1625.25,
      sales: 2062.5,
      status: "Repaid",
      settledDate: "Jun 18, 2025",
      daysToSettle: 14,
    },
    {
      id: "ADV-010",
      date: "Jun 3, 2025",
      amount: 2200.0,
      fee: 33.0,
      net: 2167.0,
      sales: 2750.0,
      status: "Repaid",
      settledDate: "Jun 17, 2025",
      daysToSettle: 14,
    },
  ];

  // Server-side filtering
  let filtered = advances;
  if (status !== "All") {
    filtered = filtered.filter((a) => a.status === status);
  }
  if (search) {
    filtered = filtered.filter((a) =>
      a.id.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Date range filtering
  if (dateRange !== "All") {
    const now = new Date();
    const parseDate = (dateStr: string) => {
      const [month, day, year] = dateStr.replace(",", "").split(" ");
      const monthNum = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(month);
      return new Date(parseInt(year), monthNum, parseInt(day));
    };

    filtered = filtered.filter((a) => {
      const advDate = parseDate(a.date);
      const daysDiff = Math.floor((now.getTime() - advDate.getTime()) / (1000 * 60 * 60 * 24));
      if (dateRange === "7D" && daysDiff > 7) return false;
      if (dateRange === "30D" && daysDiff > 30) return false;
      if (dateRange === "90D" && daysDiff > 90) return false;
      return true;
    });
  }

  // Calculate totals from filtered results
  const totalAdvanced = filtered.reduce((sum, adv) => sum + adv.amount, 0);
  const totalFees = filtered.reduce((sum, adv) => sum + adv.fee, 0);
  const totalNet = filtered.reduce((sum, adv) => sum + adv.net, 0);

  return NextResponse.json({
    advances: filtered,
    totals: {
      totalAdvanced,
      totalFees,
      totalNet,
    },
    pagination: {
      page: 1,
      pageSize: 10,
      total: filtered.length,
    },
  });
}