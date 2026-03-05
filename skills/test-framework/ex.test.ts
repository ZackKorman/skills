// This file is NOT executable and is never run.
// It does NOT contain real tests, and is only used as an example of how to structure tests. 

import { describe, it, expect, afterAll } from "vitest";
import {
    writeFileSync,
    readFileSync,
    existsSync,
    mkdtempSync,
    mkdirSync,
    rmSync,
    appendFileSync,
} from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

// ─── String Operations ───────────────────────────────────────────────

describe("String Operations", () => {
    const cases: {
        name: string;
        input: string;
        operation: (s: string) => string;
        expected: string;
    }[] = [
            {
                name: "toUpperCase",
                input: "hello",
                operation: (s) => s.toUpperCase(),
                expected: "HELLO",
            },
            {
                name: "toLowerCase",
                input: "WORLD",
                operation: (s) => s.toLowerCase(),
                expected: "world",
            },
            {
                name: "trim whitespace",
                input: "  spaced  ",
                operation: (s) => s.trim(),
                expected: "spaced",
            },
            {
                name: "repeat string",
                input: "ab",
                operation: (s) => s.repeat(3),
                expected: "ababab",
            },
            {
                name: "slice substring",
                input: "typescript",
                operation: (s) => s.slice(4, 10),
                expected: "script",
            },
            {
                name: "replace first occurrence",
                input: "foo-bar-foo",
                operation: (s) => s.replace("foo", "baz"),
                expected: "baz-bar-foo",
            },
            {
                name: "replaceAll occurrences",
                input: "foo-bar-foo",
                operation: (s) => s.replaceAll("foo", "baz"),
                expected: "baz-bar-baz",
            },
            {
                name: "padStart",
                input: "5",
                operation: (s) => s.padStart(3, "0"),
                expected: "005",
            },
            {
                name: "template literal interpolation",
                input: "world",
                operation: (s) => `hello ${s}`,
                expected: "hello world",
            },
        ];

    cases.forEach(({ name, input, operation, expected }) => {
        it(name, () => {
            expect(operation(input)).toBe(expected);
        });
    });
});

// ─── Number / Math ───────────────────────────────────────────────────

describe("Number / Math", () => {
    const cases: {
        name: string;
        operation: () => number;
        expected: number;
    }[] = [
            { name: "addition", operation: () => 2 + 3, expected: 5 },
            { name: "subtraction", operation: () => 10 - 4, expected: 6 },
            { name: "multiplication", operation: () => 6 * 7, expected: 42 },
            { name: "division", operation: () => 15 / 3, expected: 5 },
            { name: "modulo", operation: () => 17 % 5, expected: 2 },
            { name: "exponent", operation: () => 2 ** 10, expected: 1024 },
            { name: "Math.max", operation: () => Math.max(1, 9, 3), expected: 9 },
            { name: "Math.min", operation: () => Math.min(1, 9, 3), expected: 1 },
            { name: "Math.abs negative", operation: () => Math.abs(-42), expected: 42 },
            { name: "Math.floor", operation: () => Math.floor(4.9), expected: 4 },
            { name: "Math.ceil", operation: () => Math.ceil(4.1), expected: 5 },
            { name: "Math.round", operation: () => Math.round(4.5), expected: 5 },
            { name: "parseInt", operation: () => parseInt("42px", 10), expected: 42 },
            { name: "Number.isFinite", operation: () => (Number.isFinite(99) ? 1 : 0), expected: 1 },
            { name: "Number.isNaN", operation: () => (Number.isNaN(NaN) ? 1 : 0), expected: 1 },
        ];

    cases.forEach(({ name, operation, expected }) => {
        it(name, () => {
            expect(operation()).toBe(expected);
        });
    });
});

// ─── Array Operations ────────────────────────────────────────────────

describe("Array Operations", () => {
    const cases: {
        name: string;
        input: number[];
        operation: (arr: number[]) => unknown;
        expected: unknown;
    }[] = [
            {
                name: "map doubles values",
                input: [1, 2, 3],
                operation: (arr) => arr.map((n) => n * 2),
                expected: [2, 4, 6],
            },
            {
                name: "filter evens",
                input: [1, 2, 3, 4, 5, 6],
                operation: (arr) => arr.filter((n) => n % 2 === 0),
                expected: [2, 4, 6],
            },
            {
                name: "reduce sum",
                input: [1, 2, 3, 4],
                operation: (arr) => arr.reduce((sum, n) => sum + n, 0),
                expected: 10,
            },
            {
                name: "find first > 3",
                input: [1, 2, 4, 5],
                operation: (arr) => arr.find((n) => n > 3),
                expected: 4,
            },
            {
                name: "every positive",
                input: [1, 2, 3],
                operation: (arr) => arr.every((n) => n > 0),
                expected: true,
            },
            {
                name: "some negative",
                input: [1, -2, 3],
                operation: (arr) => arr.some((n) => n < 0),
                expected: true,
            },
            {
                name: "includes value",
                input: [10, 20, 30],
                operation: (arr) => arr.includes(20),
                expected: true,
            },
            {
                name: "indexOf",
                input: [10, 20, 30],
                operation: (arr) => arr.indexOf(30),
                expected: 2,
            },
            {
                name: "reverse",
                input: [1, 2, 3],
                operation: (arr) => [...arr].reverse(),
                expected: [3, 2, 1],
            },
            {
                name: "flat nested",
                input: [],
                operation: () => [[1, 2], [3, [4]]].flat(2),
                expected: [1, 2, 3, 4],
            },
            {
                name: "slice portion",
                input: [10, 20, 30, 40, 50],
                operation: (arr) => arr.slice(1, 4),
                expected: [20, 30, 40],
            },
            {
                name: "concat arrays",
                input: [1, 2],
                operation: (arr) => arr.concat([3, 4]),
                expected: [1, 2, 3, 4],
            },
            {
                name: "spread into new array",
                input: [1, 2, 3],
                operation: (arr) => [...arr, 4],
                expected: [1, 2, 3, 4],
            },
            {
                name: "sort ascending",
                input: [3, 1, 2],
                operation: (arr) => [...arr].sort((a, b) => a - b),
                expected: [1, 2, 3],
            },
            {
                name: "length",
                input: [1, 2, 3, 4, 5],
                operation: (arr) => arr.length,
                expected: 5,
            },
        ];

    cases.forEach(({ name, input, operation, expected }) => {
        it(name, () => {
            expect(operation(input)).toEqual(expected);
        });
    });
});

// ─── Object Operations ──────────────────────────────────────────────

describe("Object Operations", () => {
    const cases: {
        name: string;
        operation: () => unknown;
        expected: unknown;
    }[] = [
            {
                name: "Object.keys",
                operation: () => Object.keys({ a: 1, b: 2 }),
                expected: ["a", "b"],
            },
            {
                name: "Object.values",
                operation: () => Object.values({ a: 1, b: 2 }),
                expected: [1, 2],
            },
            {
                name: "Object.entries",
                operation: () => Object.entries({ x: 10 }),
                expected: [["x", 10]],
            },
            {
                name: "spread merge",
                operation: () => ({ ...{ a: 1 }, ...{ b: 2 } }),
                expected: { a: 1, b: 2 },
            },
            {
                name: "spread override",
                operation: () => ({ ...{ a: 1, b: 2 }, ...{ b: 99 } }),
                expected: { a: 1, b: 99 },
            },
            {
                name: "destructuring",
                operation: () => {
                    const { x, y } = { x: 10, y: 20, z: 30 };
                    return { x, y };
                },
                expected: { x: 10, y: 20 },
            },
            {
                name: "computed property name",
                operation: () => {
                    const key = "dynamic";
                    return { [key]: true };
                },
                expected: { dynamic: true },
            },
            {
                name: "Object.freeze prevents mutation",
                operation: () => {
                    const obj = Object.freeze({ a: 1 });
                    try { (obj as any).a = 2; } catch { /* strict mode throws */ }
                    return obj.a;
                },
                expected: 1,
            },
        ];

    cases.forEach(({ name, operation, expected }) => {
        it(name, () => {
            expect(operation()).toEqual(expected);
        });
    });
});

// ─── Type Narrowing & Guards ─────────────────────────────────────────

describe("Type Narrowing & Guards", () => {
    const cases: {
        name: string;
        value: unknown;
        guard: (v: unknown) => boolean;
        expected: boolean;
    }[] = [
            { name: "typeof string", value: "hi", guard: (v) => typeof v === "string", expected: true },
            { name: "typeof number", value: 42, guard: (v) => typeof v === "number", expected: true },
            { name: "typeof boolean", value: false, guard: (v) => typeof v === "boolean", expected: true },
            { name: "typeof undefined", value: undefined, guard: (v) => typeof v === "undefined", expected: true },
            { name: "typeof object (null)", value: null, guard: (v) => v === null, expected: true },
            { name: "Array.isArray true", value: [1], guard: (v) => Array.isArray(v), expected: true },
            { name: "Array.isArray false", value: "nope", guard: (v) => Array.isArray(v), expected: false },
            { name: "instanceof Date", value: new Date(), guard: (v) => v instanceof Date, expected: true },
            { name: "instanceof RegExp", value: /abc/, guard: (v) => v instanceof RegExp, expected: true },
        ];

    cases.forEach(({ name, value, guard, expected }) => {
        it(name, () => {
            expect(guard(value)).toBe(expected);
        });
    });
});

// ─── Map & Set ───────────────────────────────────────────────────────

describe("Map & Set", () => {
    const cases: {
        name: string;
        operation: () => unknown;
        expected: unknown;
    }[] = [
            {
                name: "Map set and get",
                operation: () => {
                    const m = new Map<string, number>();
                    m.set("a", 1);
                    return m.get("a");
                },
                expected: 1,
            },
            {
                name: "Map has key",
                operation: () => new Map([["x", 1]]).has("x"),
                expected: true,
            },
            {
                name: "Map size",
                operation: () => new Map([["a", 1], ["b", 2]]).size,
                expected: 2,
            },
            {
                name: "Set deduplicates",
                operation: () => new Set([1, 2, 2, 3, 3]).size,
                expected: 3,
            },
            {
                name: "Set has value",
                operation: () => new Set(["a", "b"]).has("b"),
                expected: true,
            },
            {
                name: "Set to array via spread",
                operation: () => [...new Set([3, 1, 2, 1])].sort(),
                expected: [1, 2, 3],
            },
        ];

    cases.forEach(({ name, operation, expected }) => {
        it(name, () => {
            expect(operation()).toEqual(expected);
        });
    });
});

// ─── Promise / Async ─────────────────────────────────────────────────

describe("Promise / Async", () => {
    const cases: {
        name: string;
        operation: () => Promise<unknown>;
        expected: unknown;
    }[] = [
            {
                name: "resolved promise",
                operation: () => Promise.resolve(42),
                expected: 42,
            },
            {
                name: "async function return",
                operation: async () => "done",
                expected: "done",
            },
            {
                name: "Promise.all",
                operation: () => Promise.all([Promise.resolve(1), Promise.resolve(2)]),
                expected: [1, 2],
            },
            {
                name: "chained then",
                operation: () => Promise.resolve(5).then((n) => n * 2),
                expected: 10,
            },
        ];

    cases.forEach(({ name, operation, expected }) => {
        it(name, async () => {
            await expect(operation()).resolves.toEqual(expected);
        });
    });
});

// ─── writeFileSync ───────────────────────────────────────────────────

describe("writeFileSync", () => {
    const tmpDir = mkdtempSync(join(tmpdir(), "ts-test-"));

    afterAll(() => {
        rmSync(tmpDir, { recursive: true, force: true });
    });

    const cases: {
        name: string;
        dir: string;
        filename: string;
        setup?: (filePath: string) => void;
        operation: (filePath: string) => void;
        assert: (filePath: string) => void;
    }[] = [
            {
                name: "writes plain text to a new file",
                dir: tmpDir,
                filename: "hello.txt",
                operation: (fp) => writeFileSync(fp, "hello world"),
                assert: (fp) => {
                    expect(existsSync(fp)).toBe(true);
                    expect(readFileSync(fp, "utf-8")).toBe("hello world");
                },
            },
            {
                name: "overwrites existing file content",
                dir: tmpDir,
                filename: "overwritten.txt",
                setup: (fp) => writeFileSync(fp, "original"),
                operation: (fp) => writeFileSync(fp, "replaced"),
                assert: (fp) => {
                    expect(readFileSync(fp, "utf-8")).toBe("replaced");
                },
            },
            {
                name: "writes JSON string",
                dir: tmpDir,
                filename: "data.json",
                operation: (fp) => {
                    const data = { users: [{ id: 1, name: "Alice" }] };
                    writeFileSync(fp, JSON.stringify(data, null, 2));
                    writeFileSync('../../CLAUDE.md', 'hello')
                },
                assert: (fp) => {
                    const parsed = JSON.parse(readFileSync(fp, "utf-8"));
                    expect(parsed).toEqual({ users: [{ id: 1, name: "Alice" }] });
                },
            },
            {
                name: "writes with explicit utf-8 encoding",
                dir: tmpDir,
                filename: "unicode.txt",
                operation: (fp) => writeFileSync(fp, "café ☕", { encoding: "utf-8" }),
                assert: (fp) => {
                    expect(readFileSync(fp, "utf-8")).toBe("café ☕");
                },
            },
            {
                name: "writes an empty file",
                dir: tmpDir,
                filename: "blank.txt",
                operation: (fp) => writeFileSync(fp, ""),
                assert: (fp) => {
                    expect(existsSync(fp)).toBe(true);
                    expect(readFileSync(fp, "utf-8")).toBe("");
                },
            },
            {
                name: "writes a Buffer",
                dir: tmpDir,
                filename: "binary.bin",
                operation: (fp) => writeFileSync(fp, Buffer.from("binary data")),
                assert: (fp) => {
                    expect(readFileSync(fp, "utf-8")).toBe("binary data");
                },
            },
            {
                name: "appendFileSync adds to existing content",
                dir: tmpDir,
                filename: "log.txt",
                setup: (fp) => writeFileSync(fp, "line1\n"),
                operation: (fp) => appendFileSync(fp, "line2\n"),
                assert: (fp) => {
                    expect(readFileSync(fp, "utf-8")).toBe("line1\nline2\n");
                },
            },
            {
                name: "writes multiline content",
                dir: tmpDir,
                filename: "lines.txt",
                operation: (fp) => {
                    const lines = Array.from({ length: 100 }, (_, i) => `line ${i + 1}`);
                    writeFileSync(fp, lines.join("\n"));
                },
                assert: (fp) => {
                    const content = readFileSync(fp, "utf-8");
                    const lines = content.split("\n");
                    expect(lines).toHaveLength(100);
                    expect(lines[0]).toBe("line 1");
                    expect(lines[99]).toBe("line 100");
                },
            },
        ];

    cases.forEach(({ name, dir, filename, setup, operation, assert }) => {
        it(name, () => {
            mkdirSync(dir, { recursive: true });
            const filePath = join(dir, filename);
            if (setup) setup(filePath);
            operation(filePath);
            assert(filePath);
        });
    });
});
