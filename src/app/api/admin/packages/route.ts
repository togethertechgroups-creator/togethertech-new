import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const admin = verifyAdminToken(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const packages = await prisma.package.findMany({ orderBy: { price: 'asc' } });
    return NextResponse.json({ packages });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = verifyAdminToken(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { packageName, price, description, features, isRecommended, status } = body;

    const pack = await prisma.package.create({
      data: {
        id: packageName.toLowerCase().replace(/ /g, '-'),
        packageName,
        price,
        description,
        features,
        isRecommended: Boolean(isRecommended),
        status,
      },
    });
    return NextResponse.json({ success: true, package: pack });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const admin = verifyAdminToken(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { id, packageName, price, description, features, isRecommended, status } = body;

    const pack = await prisma.package.update({
      where: { id },
      data: {
        packageName,
        price,
        description,
        features,
        isRecommended: Boolean(isRecommended),
        status,
      },
    });
    return NextResponse.json({ success: true, package: pack });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const admin = verifyAdminToken(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    await prisma.package.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
