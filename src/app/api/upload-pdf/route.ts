import { NextRequest, NextResponse } from 'next/server';

// 1. Upload PDF Endpoint (POST)
// Receives the PDF from browser, uploads it to Uguu.se from backend (bypassing CORS), and returns the direct link
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create a new FormData to upload to Uguu.se
    const uguuForm = new FormData();
    const fileBlob = new Blob([buffer], { type: file.type || 'application/pdf' });
    uguuForm.append('files[]', fileBlob, file.name || 'document.pdf');

    // Make the upload request to Uguu.se (bypasses browser CORS)
    const uguuRes = await fetch('https://uguu.se/upload', {
      method: 'POST',
      body: uguuForm
    });

    if (!uguuRes.ok) {
      const errText = await uguuRes.text();
      throw new Error('Failed to upload to storage server: ' + errText);
    }

    const uguuData = await uguuRes.json();
    if (!uguuData.success || !uguuData.files || !uguuData.files[0]) {
      throw new Error('Storage server responded with failure or missing file info');
    }

    const directUrl = uguuData.files[0].url;

    return NextResponse.json({ success: true, url: directUrl }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  } catch (err: any) {
    console.error('Server PDF upload helper failed:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }
}

// 2. Handle Preflight Options Request
export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
