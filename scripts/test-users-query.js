const crypto = require('crypto');
const http = require('http');

async function generateSupabaseJWT(role) {
  const secret = "9ea8ff2057430ac5ddf8a2bbd9be60ce5a577d45c64cacf41b7ba2c38eaa828b";
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    role,
    iss: 'supabase',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600
  };

  const base64UrlEncode = (obj) =>
    Buffer.from(JSON.stringify(obj)).toString('base64url').replace(/=/g, '');

  const dataToSign = `${base64UrlEncode(header)}.${base64UrlEncode(payload)}`;
  const signature = crypto
    .createHmac('sha256', secret)
    .update(dataToSign)
    .digest('base64url')
    .replace(/=/g, '');

  return `${dataToSign}.${signature}`;
}

async function run() {
  const token = await generateSupabaseJWT('service_role');
  
  const options = {
    hostname: 'db.rotaract3192.org',
    port: 8000,
    path: '/rest/v1/member_profiles?select=id,first_name,last_name,email,phone,created_at,clubs(name),member_roles(role)',
    method: 'GET',
    headers: {
      'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE',
      'Authorization': `Bearer ${token}`
    }
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      console.log('Status:', res.statusCode);
      console.log('Body:', data);
    });
  });

  req.end();
}

run();
