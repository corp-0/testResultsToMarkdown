import fs from 'fs/promises';
import { parseString } from 'xml2js';
import { TestCase } from "./types";

const readXmlFile = async (filePath: string): Promise<string> => {
    try {
        const content = await fs.readFile(filePath, "utf8");
        return content;
    } catch (err) {
        console.error(err);
        throw err;
    }
};


const parseXml = (xml: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        parseString(xml, (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

const extractTestCases = (xmlNode: any): TestCase[] => {
    let cases: TestCase[] = [];

    if (xmlNode && xmlNode['test-case']) {
        cases.push(...xmlNode['test-case']);
    }

    if (xmlNode && xmlNode['test-suite']) {
        xmlNode['test-suite'].forEach((nestedSuite: any) => {
            cases.push(...extractTestCases(nestedSuite));
        });
    }

    return cases;
};

export {readXmlFile, parseXml, extractTestCases};