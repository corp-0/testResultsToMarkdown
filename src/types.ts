interface TestCase {
    $: {
        id: string;
        name: string;
        fullname: string;
        methodname: string;
        classname: string;
        runstate: string;
        seed: string;
        result: "Passed" | "Failed" | "Skipped";
        "start-time": string;
        "end-time": string;
        duration: string;
        asserts: string;
    };
    properties: string[];
    failure?: [
        {
            message: string[];
            "stack-trace": string[];
        }
    ];
}


interface TestRun {
    cases: TestCase[];
}

export {TestRun, TestCase};