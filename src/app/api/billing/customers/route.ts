import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const DEFAULT_CUSTOMERS = [
  {
    id: "CUST-001",
    name: "ARUNRAJ .S",
    tier: "Standard Partner",
    gstin: "33AAACKH3W1Z1",
    email: "arunraj@kh3wellness.com",
    phone: "+91 98765 43210",
    status: "ACTIVE",
    spend: 8999,
    address: "KH3 WELLNESS\nChennai, Tamil Nadu"
  },
  {
    id: "CUST-002",
    name: "MICRO LASER ART",
    tier: "Standard Partner",
    gstin: "33AAACMLA1Z2",
    email: "info@microlaserart.com",
    phone: "+91 98765 43211",
    status: "ACTIVE",
    spend: 4200,
    address: "MICRO LASER ART\nChennai, Tamil Nadu"
  },
  {
    id: "CUST-003",
    name: "GOWTHAM",
    tier: "Standard Partner",
    gstin: "33AAACOLY1Z3",
    email: "gowtham@olympiagym.com",
    phone: "+91 98765 43212",
    status: "ACTIVE",
    spend: 5000,
    address: "Olympia gym\nChennai, Tamil Nadu"
  },
  {
    id: "CUST-004",
    name: "ANJUGAM",
    tier: "Standard Partner",
    gstin: "33AAACANJ1Z4",
    email: "anjugam@anjugamhotel.com",
    phone: "+91 98765 43213",
    status: "ACTIVE",
    spend: 2500,
    address: "ANJUGAM HOTEL\nChennai, Tamil Nadu"
  },
  {
    id: "CUST-005",
    name: "VICKY",
    tier: "Standard Partner",
    gstin: "33AAACBUN1Z5",
    email: "vicky@beastfitness.com",
    phone: "+91 98765 43214",
    status: "ACTIVE",
    spend: 10000,
    address: "BEAST UNISEX FITNESS\nChennai, Tamil Nadu"
  }
];

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// Get all customers (with auto-seeding if empty)
export async function GET() {
  try {
    let customers = await prisma.billingCustomer.findMany({
      orderBy: { createdAt: 'asc' },
    });

    if (customers.length === 0) {
      // Seed default customers
      await Promise.all(
        DEFAULT_CUSTOMERS.map((cust) =>
          prisma.billingCustomer.create({
            data: cust,
          })
        )
      );
      customers = await prisma.billingCustomer.findMany({
        orderBy: { createdAt: 'asc' },
      });
    }

    return NextResponse.json(customers, { headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch customers' }, { status: 500, headers: corsHeaders });
  }
}

// Create or update customer (upsert)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, tier, gstin, email, phone, status, spend, address } = body;

    if (!id || !name) {
      return NextResponse.json({ error: 'Missing customer ID or name' }, { status: 400, headers: corsHeaders });
    }

    const customer = await prisma.billingCustomer.upsert({
      where: { id },
      update: {
        name,
        tier: tier || 'Standard Partner',
        gstin: gstin || '',
        email: email || '',
        phone: phone || '',
        status: status || 'ACTIVE',
        spend: spend !== undefined ? parseFloat(spend) : 0,
        address: address || '',
      },
      create: {
        id,
        name,
        tier: tier || 'Standard Partner',
        gstin: gstin || '',
        email: email || '',
        phone: phone || '',
        status: status || 'ACTIVE',
        spend: spend !== undefined ? parseFloat(spend) : 0,
        address: address || '',
      },
    });

    return NextResponse.json(customer, { headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to save customer' }, { status: 500, headers: corsHeaders });
  }
}

// Delete customer
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing customer ID' }, { status: 400, headers: corsHeaders });
    }

    await prisma.billingCustomer.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to delete customer' }, { status: 500, headers: corsHeaders });
  }
}
