import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const settings = await prisma.settings.findUnique({ where: { id: 'global' } });
    return NextResponse.json({ settings });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const admin = verifyAdminToken(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { companyName, phone, email, whatsapp, address, logo, socialLinks, seoTitle, seoDescription } = body;

    const settings = await prisma.settings.upsert({
      where: { id: 'global' },
      update: {
        companyName,
        phone,
        email,
        whatsapp,
        address,
        logo,
        socialLinks: typeof socialLinks === 'string' ? socialLinks : JSON.stringify(socialLinks || {}),
        seoTitle,
        seoDescription,
      },
      create: {
        id: 'global',
        companyName,
        phone,
        email,
        whatsapp,
        address,
        logo,
        socialLinks: typeof socialLinks === 'string' ? socialLinks : JSON.stringify(socialLinks || {}),
        seoTitle,
        seoDescription,
      },
    });

    return NextResponse.json({ success: true, settings });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
