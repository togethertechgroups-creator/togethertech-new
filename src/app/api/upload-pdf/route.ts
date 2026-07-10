import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// 1. Upload PDF Endpoint (POST)
// Receives Base64 encoded PDF from browser, stores it in SQLite, and returns our own custom download link
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileData, fileName } = body;

    if (!fileData) {
      return NextResponse.json({ error: 'No file data provided' }, { status: 400, headers: corsHeaders });
    }

    // Save to SQLite database using Prisma
    const savedFile = await prisma.pdfFile.create({
      data: {
        name: fileName || 'document.pdf',
        data: fileData // Store base64 string directly
      }
    });

    // Return the URL on our custom domain
    const downloadUrl = `https://www.togethertechgroups.in/api/upload-pdf?id=${savedFile.id}`;

    return NextResponse.json({ success: true, url: downloadUrl }, { headers: corsHeaders });
  } catch (err: any) {
    console.error('Server PDF upload helper failed:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500, headers: corsHeaders });
  }
}

// 2. Fetch PDF Endpoint (GET)
// Retrieves PDF from SQLite by ID and serves it as a raw PDF file
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return new NextResponse('Missing document ID', { status: 400, headers: corsHeaders });
    }

    const fileRecord = await prisma.pdfFile.findUnique({
      where: { id }
    });

    if (!fileRecord) {
      return new NextResponse('PDF document not found or expired', { status: 404, headers: corsHeaders });
    }

    // Convert Base64 back to Buffer to serve as raw binary PDF
    const fileBuffer = Buffer.from(fileRecord.data, 'base64');

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${fileRecord.name}"`,
        ...corsHeaders,
      }
    });
  } catch (err: any) {
    console.error('Fetching PDF failed:', err);
    return new NextResponse('Internal Server Error', { status: 500, headers: corsHeaders });
  }
}

