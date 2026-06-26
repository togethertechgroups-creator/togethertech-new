import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

// 1. Submit Enquiry (Public)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, mobile, email, businessName, requiredService, budget, message } = body;

    if (!name || !mobile || !email || !requiredService || !budget || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        name,
        mobile,
        email,
        businessName,
        requiredService,
        budget,
        message,
        status: 'NEW',
      },
    });

    // Mock email notification trigger
    console.log(`[EMAIL NOTIFICATION MOCK] Send to: contact@togethertechgroups.in. Content: New enquiry received from ${name} (${email}) for service: ${requiredService}.`);

    return NextResponse.json({ success: true, enquiry });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

// 2. Fetch Enquiries (Admin Protected)
export async function GET(req: NextRequest) {
  const admin = verifyAdminToken(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ enquiries });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

// 3. Update Enquiry Status (Admin Protected)
export async function PUT(req: NextRequest) {
  const admin = verifyAdminToken(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const updatedEnquiry = await prisma.enquiry.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, enquiry: updatedEnquiry });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
