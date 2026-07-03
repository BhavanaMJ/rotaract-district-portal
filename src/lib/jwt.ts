export async function generateSupabaseJWT(role: string): Promise<string> {
  const secret = process.env.SUPABASE_JWT_SECRET;
  if (!secret) throw new Error('SUPABASE_JWT_SECRET is missing');

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    role,
    iss: 'supabase',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600 // 1 hour expiry
  };

  const base64UrlEncode = (obj: any) =>
    Buffer.from(JSON.stringify(obj)).toString('base64url').replace(/=/g, '');

  const dataToSign = `${base64UrlEncode(header)}.${base64UrlEncode(payload)}`;
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(dataToSign)
  );

  const signatureBase64Url = Buffer.from(signature).toString('base64url').replace(/=/g, '');

  return `${dataToSign}.${signatureBase64Url}`;
}
