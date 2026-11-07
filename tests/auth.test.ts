import test from 'node:test';
import assert from 'node:assert/strict';
import {
  authorizeAdminToken,
  createSessionToken,
  SESSION_MAX_AGE,
  verifySessionToken,
} from '../lib/server/session';

process.env.SESSION_SECRET = 'test-secret-0123456789abcdef0123456789abcdef';

test('未携带会话 token 时返回 401', async () => {
  const result = await authorizeAdminToken(undefined);
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.status, 401);
  }
});

test('签名会话可以验证并通过', async () => {
  const token = await createSessionToken();
  const session = await verifySessionToken(token);
  assert.equal(session?.sub, 'admin');
  assert.equal(typeof session?.exp, 'number');
});

test('篡改签名后会话失效', async () => {
  const token = await createSessionToken();
  const [encodedPayload, encodedSignature] = token.split('.');
  // 修改签名首字符（而非末尾 padding 位），确保解码后的字节确实改变。
  const flipped = encodedSignature[0] === 'A' ? 'B' : 'A';
  const tampered = `${encodedPayload}.${flipped}${encodedSignature.slice(1)}`;
  const session = await verifySessionToken(tampered);
  assert.equal(session, null);

  const result = await authorizeAdminToken(tampered);
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.status, 401);
  }

  // 篡改 payload 但保留原签名，同样必须被拒绝。
  const payloadFlipped = encodedPayload[0] === 'e' ? 'f' : 'e';
  const tamperedPayload = `${payloadFlipped}${encodedPayload.slice(1)}.${encodedSignature}`;
  assert.equal(await verifySessionToken(tamperedPayload), null);
});

test('过期会话被拒绝', async () => {
  const token = await createSessionToken(Date.now() - SESSION_MAX_AGE * 1000 - 1);
  const session = await verifySessionToken(token);
  assert.equal(session, null);
});
