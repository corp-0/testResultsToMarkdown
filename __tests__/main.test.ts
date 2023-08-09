import {expect, test} from '@jest/globals';
// @ts-ignore
import { extractTestCases, parseXml, readXmlFile } from "../src/deXmler";
// @ts-ignore
import { TestCase } from "../src/types";
// @ts-ignore
import { produceComment } from "../src/markdowner";

test('can read the test file', async () => {
  const content = await readXmlFile('./__tests__/test-result.xml');
  expect(content).toContain('xml');
});

test('can parse the read file as xml', async () => {
  const content = await readXmlFile('./__tests__/test-result.xml');
  expect(content).toContain('xml');
  const contentXml = await parseXml(content);
  expect(contentXml).toBeDefined();
});

test('can extract all nested test cases', async () => {
  const stringContent = await readXmlFile('./__tests__/test-result.xml');
  const xmlContent = await parseXml(stringContent);
  const cases = extractTestCases(xmlContent['test-run']['test-suite'][0]);
  expect(cases).toBeDefined();
  expect(cases.length).toBe(700);
});

test('there should be only 1 failure', async () => {
  const stringContent = await readXmlFile('./__tests__/test-result.xml');
  const xmlContent = await parseXml(stringContent);
  const cases = extractTestCases(xmlContent['test-run']['test-suite'][0]);
  const failedCases = cases.filter((c) => c.$.result === 'Failed');
  expect(failedCases).toBeDefined();
  expect(failedCases.length).toBe(1);
});

test('should be able to read test case keys', async () => {
  const stringContent = await readXmlFile('./__tests__/test-result.xml');
  const xmlContent = await parseXml(stringContent);
  const cases: TestCase[] = extractTestCases(xmlContent['test-run']['test-suite'][0]);
  const failedCase: TestCase = cases.filter((c) => c.$.result === 'Failed')[0];
  expect(failedCase).toBeDefined();
  expect(failedCase.$.name).toBeDefined();
  expect(failedCase.$.classname).toBeDefined();
  expect(failedCase.$.methodname).toBeDefined();
  expect(failedCase.$.result).toBeDefined();
  expect(failedCase.$.result).toBe('Failed');
});

test('should be able to read test case failure message', async () => {
  const stringContent = await readXmlFile('./__tests__/test-result.xml');
  const xmlContent = await parseXml(stringContent);
  const cases: TestCase[] = extractTestCases(xmlContent['test-run']['test-suite'][0]);
  const failedCase: TestCase = cases.filter((c) => c.$.result === 'Failed')[0];
  expect(failedCase).toBeDefined();
  expect(failedCase.failure).toBeDefined();
  failedCase.failure!.forEach((f) => {
    expect(f.message).toBeDefined();
  });
});

test('should produce a comment', async () => {
  const stringContent = await readXmlFile('./__tests__/test-result.xml');
  const xmlContent = await parseXml(stringContent);
  const cases: TestCase[] = extractTestCases(xmlContent['test-run']['test-suite'][0]);
  const failedCase: TestCase = cases.filter((c) => c.$.result === 'Failed')[0];
  const comment = produceComment([failedCase]);
  expect(comment).toBeDefined();
})