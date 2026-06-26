import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const admin = verifyAdminToken(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const teamMembers = await prisma.teamMember.findMany({ orderBy: { createdAt: 'asc' } });
    return NextResponse.json({ teamMembers });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = verifyAdminToken(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { name, role, photo, bio, skills, socialLinks, status } = body;

    const team = await prisma.teamMember.create({
      data: {
        id: name.toLowerCase().replace(/ /g, '-').replace(/\./g, ''),
        name,
        role,
        photo,
        bio,
        skills,
        socialLinks: typeof socialLinks === 'string' ? socialLinks : JSON.stringify(socialLinks || {}),
        status,
      },
    });
    return NextResponse.json({ success: true, teamMember: team });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const admin = verifyAdminToken(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { id, name, role, photo, bio, skills, socialLinks, status } = body;

    const team = await prisma.teamMember.update({
      where: { id },
      data: {
        name,
        role,
        photo,
        bio,
        skills,
        socialLinks: typeof socialLinks === 'string' ? socialLinks : JSON.stringify(socialLinks || {}),
        status,
      },
    });
    return NextResponse.json({ success: true, teamMember: team });
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

    await prisma.teamMember.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
