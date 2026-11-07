import test from 'node:test';
import assert from 'node:assert/strict';
import { validateFeedbackInput } from '../lib/server/validation/feedback';

test('合法输入会被 trim 后通过', () => {
  const result = validateFeedbackInput({
    name: '  张三  ',
    contact: '  13800000000  ',
    message: '  希望增加导出功能。  ',
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.name, '张三');
    assert.equal(result.data.contact, '13800000000');
    assert.equal(result.data.message, '希望增加导出功能。');
  }
});

test('空字段被拒绝', () => {
  const result = validateFeedbackInput({ name: '   ', contact: '1', message: 'ok' });
  assert.equal(result.success, false);
});

test('超长字段被拒绝', () => {
  const result = validateFeedbackInput({
    name: 'a'.repeat(101),
    contact: '1',
    message: 'ok',
  });
  assert.equal(result.success, false);
});

test('未知字段被拒绝', () => {
  const result = validateFeedbackInput({
    name: '张三',
    contact: '1',
    message: 'ok',
    isRead: 1,
  });
  assert.equal(result.success, false);
});
