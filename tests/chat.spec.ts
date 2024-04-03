import { expect, test } from '@playwright/test';

test.describe('describe title', () => {
  test('test title!', ({}) => {
    expect(true).toBeTruthy();
  });
});