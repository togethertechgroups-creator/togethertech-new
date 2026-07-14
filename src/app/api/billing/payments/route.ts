import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const DEFAULT_PAYMENTS = [
  {
    id: 'RCP-0001',
    invoiceId: 'INV-099644',
    customerId: 'CUST-001',
    customerName: 'ARUNRAJ .S',
    date: '2026-05-14',
    amount: 8999.0,
    mode: 'UPI',
    reference: 'UPI-TXN-0996',
    notes: 'Full payment received',
  },
  {
    id: 'RCP-0002',
    invoiceId: 'INV-559714',
    customerId: 'CUST-002',
    customerName: 'MICRO LASER ART',
    date: '2026-04-18',
    amount: 4200.0,
    mode: 'UPI',
    reference: 'UPI-TXN-5597',
    notes: 'Full payment received',
  },
  {
    id: 'RCP-0003',
    invoiceId: 'INV-587307',
    customerId: 'CUST-003',
    customerName: 'GOWTHAM',
    date: '2026-04-02',
    amount: 5000.0,
    mode: 'UPI',
    reference: 'UPI-TXN-5873',
    notes: 'Full payment received',
  },
  {
    id: 'RCP-0004',
    invoiceId: 'INV-581573',
    customerId: 'CUST-004',
    customerName: 'ANJUGAM',
    date: '2026-04-02',
    amount: 2500.0,
    mode: 'UPI',
    reference: 'UPI-TXN-5815',
    notes: 'Full payment received',
  },
  {
    id: 'RCP-0005',
    invoiceId: 'INV-156309',
    customerId: 'CUST-005',
    customerName: 'VICKY',
    date: '2026-04-02',
    amount: 10000.0,
    mode: 'UPI',
    reference: 'UPI-TXN-1563',
    notes: 'Full payment received',
  },
];

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// Get all payments (with auto-seeding if empty)
export async function GET() {
  try {
    let payments = await prisma.billingPayment.findMany({
      orderBy: { createdAt: 'desc' },
    });

    if (payments.length === 0) {
      // Seed default payments
      await Promise.all(
        DEFAULT_PAYMENTS.map((payment) =>
          prisma.billingPayment.create({
            data: payment,
          })
        )
      );
      payments = await prisma.billingPayment.findMany({
        orderBy: { createdAt: 'desc' },
      });
    }

    return NextResponse.json(payments, { headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch payments' }, { status: 500, headers: corsHeaders });
  }
}

// Create or update payment (upsert)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, invoiceId, customerId, customerName, date, amount, mode, reference, notes } = body;

    if (!id || !invoiceId || !customerId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400, headers: corsHeaders });
    }

    const payment = await prisma.billingPayment.upsert({
      where: { id },
      update: {
        invoiceId,
        customerId,
        customerName: customerName || '',
        date,
        amount: parseFloat(amount) || 0.0,
        mode: mode || 'UPI',
        reference: reference || '',
        notes: notes || '',
      },
      create: {
        id,
        invoiceId,
        customerId,
        customerName: customerName || '',
        date,
        amount: parseFloat(amount) || 0.0,
        mode: mode || 'UPI',
        reference: reference || '',
        notes: notes || '',
      },
    });

    return NextResponse.json(payment, { headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to save payment' }, { status: 500, headers: corsHeaders });
  }
}

// Delete payment
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing payment ID' }, { status: 400, headers: corsHeaders });
    }

    await prisma.billingPayment.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to delete payment' }, { status: 500, headers: corsHeaders });
  }
}
