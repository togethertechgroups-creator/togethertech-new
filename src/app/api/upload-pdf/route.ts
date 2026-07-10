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
// Receives Base64 encoded PDF from browser, uploads it to Litterbox temporary hosting, and returns direct link
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileData, fileName } = body;

    if (!fileData) {
      return NextResponse.json({ error: 'No file data provided' }, { status: 400, headers: corsHeaders });
    }

    // Convert base64 data to buffer
    const buffer = Buffer.from(fileData, 'base64');
    const blob = new Blob([buffer], { type: 'application/pdf' });

    // Create FormData for Litterbox upload
    const formData = new FormData();
    formData.append('reqtype', 'fileupload');
    formData.append('time', '24h'); // Keep file online for 24 hours
    formData.append('fileToUpload', blob, fileName || 'document.pdf');

    // Upload to litterbox temporary file hosting
    const uploadRes = await fetch('https://litterbox.catbox.moe/resources/internals/api.php', {
      method: 'POST',
      body: formData,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!uploadRes.ok) {
      throw new Error(`Failed to upload to temporary hosting: ${uploadRes.statusText}`);
    }

    const downloadUrl = await uploadRes.text();
    if (!downloadUrl || !downloadUrl.startsWith('https://')) {
      throw new Error('Temporary hosting returned an invalid URL');
    }

    return NextResponse.json({ success: true, url: downloadUrl.trim() }, { headers: corsHeaders });
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

