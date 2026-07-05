import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

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
    console.log(`[EMAIL NOTIFICATION MOCK] Send to: togethertechgroups@gmail.com. Content: New enquiry received from ${name} (${email}) for service: ${requiredService}.`);

    return NextResponse.json({ success: true, enquiry });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

