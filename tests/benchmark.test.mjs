import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {escapeHtml, renderWorkspace} from '../scripts/build.mjs';

const workspace = JSON.parse(await readFile(new URL('../workspace.json', import.meta.url), 'utf8'));

test('benchmark escapeHtml', () => {
  const start = performance.now();
  for (let i = 0; i < 10000; i++) {
    escapeHtml('This is a "test" string with <tags> & \'quotes\'.');
  }
  const end = performance.now();
  const duration = end - start;
  assert.ok(duration < 50, `escapeHtml took ${duration}ms, which exceeds 50ms`);
});

test('benchmark renderWorkspace', () => {
  const start = performance.now();
  for (let i = 0; i < 10000; i++) {
    renderWorkspace(workspace);
  }
  const end = performance.now();
  const duration = end - start;
  assert.ok(duration < 100, `renderWorkspace took ${duration}ms, which exceeds 100ms`);
});
