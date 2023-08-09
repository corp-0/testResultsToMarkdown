import { TestCase } from "./types";

const title = (text: string, level: number = 1) : string => {
    return `${'#'.repeat(level)} ${text}`;
}

const bold = (text: string) : string => {
    return `**${text}**`;
}

const italic = (text: string) : string => {
    return `_${text}_`;
}

const codeBlock = (text: string) : string => {
    return `\`\`\`${text}\`\`\``;
}

const list = (items: string[]) : string => {
    return items.map((item) => `${item}`).join('\n');
}

const caseToMarkdown = (c: TestCase) : string => {
  const paragraph = (text: string) => `${text}\n`;

  let entry = `${title(c.$.name, 2)}`;
  entry += paragraph(bold('Classname: ') + c.$.classname);
  entry += paragraph(bold('Methodname: ') + c.$.methodname);
  entry += paragraph(bold('Result: ') + c.$.result);
  if (c.failure) {
    entry += paragraph(bold('Failure: ') + c.failure[0].message[0]);
    entry += paragraph(codeBlock(c.failure[0]['stack-trace'][0]));
  }

  return entry;
}

const produceComment = (cases: TestCase[]) : string => {
  let comment = `${title("We have the following test results:")}\n\n`;
  comment += list(cases.map(caseToMarkdown));
  return comment;
}

export {produceComment};