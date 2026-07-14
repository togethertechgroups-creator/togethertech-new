import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// Get billing settings
export async function GET() {
  try {
    let settings = await prisma.billingSettings.findUnique({
      where: { id: 'billing-settings' },
    });

    if (!settings) {
      // Create and return default settings
      settings = await prisma.billingSettings.create({
        data: {
          id: 'billing-settings',
          businessName: 'Together Tech',
          gstin: '27AAACF4582G1ZX',
          address: 'Suite 405, Tech Plaza, Financial District,\nSan Francisco, CA 94105',
          website: 'togethertechgroups.in',
          email: 'togethertechgroups@gmail.com',
          phone: '+91 90475 49682',
          accountNum: '8829 4410 2293',
          swift: 'BNKUS00129',
          branch: 'Global Business Center',
          brandColor: '#8ec63f',
        },
      });
    }

    return NextResponse.json(settings, { headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch settings' }, { status: 500, headers: corsHeaders });
  }
}

// Create or update billing settings (upsert)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { businessName, gstin, address, website, email, phone, accountNum, swift, branch, brandColor } = body;

    const settings = await prisma.billingSettings.upsert({
      where: { id: 'billing-settings' },
      update: {
        businessName: businessName || 'Together Tech',
        gstin: gstin || '',
        address: address || '',
        website: website || '',
        email: email || '',
        phone: phone || '',
        accountNum: accountNum || '',
        swift: swift || '',
        branch: branch || '',
        brandColor: brandColor || '#8ec63f',
      },
      create: {
        id: 'billing-settings',
        businessName: businessName || 'Together Tech',
        gstin: gstin || '',
        address: address || '',
        website: website || '',
        email: email || '',
        phone: phone || '',
        accountNum: accountNum || '',
        swift: swift || '',
        branch: branch || '',
        brandColor: brandColor || '#8ec63f',
      },
    });

    return NextResponse.json(settings, { headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to save settings' }, { status: 500, headers: corsHeaders });
  }
}
