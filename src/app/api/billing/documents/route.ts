import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const DEFAULT_DOCUMENTS = [
  {
    id: "INV-099644",
    client: "ARUNRAJ .S",
    type: "Invoice",
    date: "2026-05-14",
    dueDate: "2026-05-24",
    status: "PAID",
    amount: 8999.00,
    gstPercent: 0,
    discountPercent: 0,
    billingAddress: "KH3 WELLNESS\nChennai, Tamil Nadu",
    lineItems: [
      { id: 1, desc: 'Wellness Services / Gym Membership', qty: 1, price: 8999.00 }
    ]
  },
  {
    id: "INV-559714",
    client: "MICRO LASER ART",
    type: "Invoice",
    date: "2026-04-18",
    dueDate: "2026-04-28",
    status: "PAID",
    amount: 4200.00,
    gstPercent: 0,
    discountPercent: 0,
    billingAddress: "MICRO LASER ART\nChennai, Tamil Nadu",
    lineItems: [
      { id: 1, desc: 'Laser Art / Laser Cut Work', qty: 1, price: 4200.00 }
    ]
  },
  {
    id: "INV-587307",
    client: "GOWTHAM",
    type: "Invoice",
    date: "2026-04-02",
    dueDate: "2026-04-12",
    status: "PAID",
    amount: 5000.00,
    gstPercent: 0,
    discountPercent: 0,
    billingAddress: "Olympia gym\nChennai, Tamil Nadu",
    lineItems: [
      { id: 1, desc: 'Fitness Training & Gym Services', qty: 1, price: 5000.00 }
    ]
  },
  {
    id: "INV-581573",
    client: "ANJUGAM",
    type: "Invoice",
    date: "2026-04-02",
    dueDate: "2026-04-12",
    status: "PAID",
    amount: 2500.00,
    gstPercent: 0,
    discountPercent: 0,
    billingAddress: "ANJUGAM HOTEL\nChennai, Tamil Nadu",
    lineItems: [
      { id: 1, desc: 'Catering / Hotel Services', qty: 1, price: 2500.00 }
    ]
  },
  {
    id: "INV-156309",
    client: "VICKY",
    type: "Invoice",
    date: "2026-04-02",
    dueDate: "2026-04-12",
    status: "PAID",
    amount: 10000.00,
    gstPercent: 0,
    discountPercent: 0,
    billingAddress: "BEAST UNISEX FITNESS\nChennai, Tamil Nadu",
    lineItems: [
      { id: 1, desc: 'Personal Training / Gym Services', qty: 1, price: 10000.00 }
    ]
  }
];

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// Get all documents (invoices and quotations) (with auto-seeding if empty)
export async function GET() {
  try {
    let documents = await prisma.billingDocument.findMany({
      orderBy: { createdAt: 'desc' },
    });

    if (documents.length === 0) {
      // Seed default documents
      await Promise.all(
        DEFAULT_DOCUMENTS.map((doc) =>
          prisma.billingDocument.create({
            data: {
              ...doc,
              lineItems: JSON.stringify(doc.lineItems),
            },
          })
        )
      );
      documents = await prisma.billingDocument.findMany({
        orderBy: { createdAt: 'desc' },
      });
    }
    
    // Parse lineItems from string to JSON array
    const parsedDocuments = documents.map(doc => ({
      ...doc,
      lineItems: doc.lineItems ? JSON.parse(doc.lineItems) : []
    }));

    return NextResponse.json(parsedDocuments, { headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch documents' }, { status: 500, headers: corsHeaders });
  }
}

// Create or update document
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, client, type, date, dueDate, status, amount, gstPercent, discountPercent, billingAddress, lineItems } = body;

    if (!id || !client || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400, headers: corsHeaders });
    }

    const doc = await prisma.billingDocument.upsert({
      where: { id },
      update: {
        client,
        type,
        date,
        dueDate,
        status,
        amount: parseFloat(amount) || 0.0,
        gstPercent: parseFloat(gstPercent) || 0.0,
        discountPercent: parseFloat(discountPercent) || 0.0,
        billingAddress: billingAddress || '',
        lineItems: typeof lineItems === 'string' ? lineItems : JSON.stringify(lineItems || []),
      },
      create: {
        id,
        client,
        type,
        date,
        dueDate,
        status,
        amount: parseFloat(amount) || 0.0,
        gstPercent: parseFloat(gstPercent) || 0.0,
        discountPercent: parseFloat(discountPercent) || 0.0,
        billingAddress: billingAddress || '',
        lineItems: typeof lineItems === 'string' ? lineItems : JSON.stringify(lineItems || []),
      },
    });

    const parsedDoc = {
      ...doc,
      lineItems: doc.lineItems ? JSON.parse(doc.lineItems) : []
    };

    return NextResponse.json(parsedDoc, { headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to save document' }, { status: 500, headers: corsHeaders });
  }
}

// Delete document
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing document ID' }, { status: 400, headers: corsHeaders });
    }

    await prisma.billingDocument.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to delete document' }, { status: 500, headers: corsHeaders });
  }
}
