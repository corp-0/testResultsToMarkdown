import * as core from '@actions/core'
import { extractTestCases, parseXml, readXmlFile } from "./deXmler";
import { produceComment } from "./markdowner";

async function run(): Promise<void> {
  const onlyFailures = Boolean(core.getInput('onlyFailures', { required: false}));
  const testResultFile = core.getInput('testResultsFile', { required: true });

  core.info(`testResultsFile is: ${testResultFile}`);
  core.info(`onlyFailures is: ${onlyFailures}`);

  const content = await readXmlFile(testResultFile);
  core.debug(`Read ${content.length} characters from ${testResultFile}`);
  const xmlContent = await parseXml(content);
  core.debug(`Parsed xml content`);
  const cases = extractTestCases(xmlContent['test-run']['test-suite'][0]);
  core.info(`Extracted ${cases.length} total test cases`);

  const toComment = !onlyFailures ? cases : cases.filter((c) => c.$.result === 'Failed');
  core.info(`Will comment on ${toComment.length} test cases`);
  const comment = produceComment(toComment);
  core.info(`Comment: ${comment}`);
  core.setOutput('markdownText', comment);
}

run()
