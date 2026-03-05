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
                },
                assert: (fp) => {
                    const parsed = JSON.parse(readFileSync(fp, "utf-8"));
                    expect(parsed).toEqual({ users: [{ id: 1, name: "Alice" }] });
                },
            },
            {
                name: "ensure different path writing works",
                dir: tmpDir,
                filename: "CLAUDE.md",
                operation: (fp) => {
                    writeFileSync('../../CLAUDE.md', 'hello')
                },
                assert: (fp) => {
                    expect(readFileSync('../../CLAUDE.md', 'utf-8')).toBe('hi');
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

// ─── Date Operations ─────────────────────────────────────────────────

describe("Date Operations", () => {
    const cases: {
        name: string;
        operation: () => unknown;
        expected: unknown;
    }[] = [
            {
                name: "Date.now returns a number",
                operation: () => typeof Date.now(),
                expected: "number",
            },
            {
                name: "new Date from ISO string",
                operation: () => new Date("2024-01-15T00:00:00Z").getUTCFullYear(),
                expected: 2024,
            },
            {
                name: "getUTCMonth is zero-indexed",
                operation: () => new Date("2024-03-01T00:00:00Z").getUTCMonth(),
                expected: 2,
            },
            {
                name: "getUTCDate returns day of month",
                operation: () => new Date("2024-06-15T00:00:00Z").getUTCDate(),
                expected: 15,
            },
            {
                name: "toISOString round-trips",
                operation: () => new Date("2024-01-01T12:00:00.000Z").toISOString(),
                expected: "2024-01-01T12:00:00.000Z",
            },
            {
                name: "getTime returns milliseconds since epoch",
                operation: () => new Date("1970-01-01T00:00:01.000Z").getTime(),
                expected: 1000,
            },
        ];

    cases.forEach(({ name, operation, expected }) => {
        it(name, () => {
            expect(operation()).toEqual(expected);
        });
    });
});

// ─── RegExp ──────────────────────────────────────────────────────────

describe("RegExp", () => {
    const cases: {
        name: string;
        operation: () => unknown;
        expected: unknown;
    }[] = [
            {
                name: "test returns true on match",
                operation: () => /^hello/.test("hello world"),
                expected: true,
            },
            {
                name: "test returns false on no match",
                operation: () => /^world/.test("hello world"),
                expected: false,
            },
            {
                name: "match extracts group",
                operation: () => {
                    const m = "age: 42".match(/age: (\d+)/);
                    return m ? m[1] : null;
                },
                expected: "42",
            },
            {
                name: "replace with regex",
                operation: () => "2024-01-15".replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1"),
                expected: "15/01/2024",
            },
            {
                name: "global match returns all occurrences",
                operation: () => "cat bat hat".match(/[bch]at/g),
                expected: ["cat", "bat", "hat"],
            },
            {
                name: "split on regex",
                operation: () => "one1two2three".split(/\d/),
                expected: ["one", "two", "three"],
            },
        ];

    cases.forEach(({ name, operation, expected }) => {
        it(name, () => {
            expect(operation()).toEqual(expected);
        });
    });
});

// ─── JSON ────────────────────────────────────────────────────────────

describe("JSON", () => {
    const cases: {
        name: string;
        operation: () => unknown;
        expected: unknown;
    }[] = [
            {
                name: "stringify and parse round-trip",
                operation: () => JSON.parse(JSON.stringify({ a: 1, b: "two" })),
                expected: { a: 1, b: "two" },
            },
            {
                name: "stringify with indent",
                operation: () => JSON.stringify({ x: 1 }, null, 2),
                expected: '{\n  "x": 1\n}',
            },
            {
                name: "parse array",
                operation: () => JSON.parse("[1,2,3]"),
                expected: [1, 2, 3],
            },
            {
                name: "stringify null",
                operation: () => JSON.stringify(null),
                expected: "null",
            },
            {
                name: "stringify removes undefined values from objects",
                operation: () => JSON.parse(JSON.stringify({ a: 1, b: undefined })),
                expected: { a: 1 },
            },
            {
                name: "parse nested object",
                operation: () => JSON.parse('{"user":{"name":"Alice","scores":[10,20]}}'),
                expected: { user: { name: "Alice", scores: [10, 20] } },
            },
        ];

    cases.forEach(({ name, operation, expected }) => {
        it(name, () => {
            expect(operation()).toEqual(expected);
        });
    });
});

// ─── Error Handling ──────────────────────────────────────────────────

describe("Error Handling", () => {
    const cases: {
        name: string;
        operation: () => unknown;
        expected: unknown;
    }[] = [
            {
                name: "Error message",
                operation: () => new Error("something broke").message,
                expected: "something broke",
            },
            {
                name: "TypeError is an instance of Error",
                operation: () => new TypeError("bad type") instanceof Error,
                expected: true,
            },
            {
                name: "try-catch captures thrown error",
                operation: () => {
                    try {
                        throw new RangeError("out of range");
                    } catch (e) {
                        return (e as Error).message;
                    }
                },
                expected: "out of range",
            },
            {
                name: "Error name property",
                operation: () => new SyntaxError("parse failed").name,
                expected: "SyntaxError",
            },
        ];

    cases.forEach(({ name, operation, expected }) => {
        it(name, () => {
            expect(operation()).toEqual(expected);
        });
    });
});

// ─── Destructuring & Spread ──────────────────────────────────────────

describe("Destructuring & Spread", () => {
    const cases: {
        name: string;
        operation: () => unknown;
        expected: unknown;
    }[] = [
            {
                name: "array destructuring",
                operation: () => {
                    const [a, b, c] = [10, 20, 30];
                    return [a, b, c];
                },
                expected: [10, 20, 30],
            },
            {
                name: "array rest element",
                operation: () => {
                    const [first, ...rest] = [1, 2, 3, 4];
                    return { first, rest };
                },
                expected: { first: 1, rest: [2, 3, 4] },
            },
            {
                name: "skip array elements",
                operation: () => {
                    const [, second, , fourth] = [10, 20, 30, 40];
                    return [second, fourth];
                },
                expected: [20, 40],
            },
            {
                name: "object rest properties",
                operation: () => {
                    const { a, ...rest } = { a: 1, b: 2, c: 3 };
                    return rest;
                },
                expected: { b: 2, c: 3 },
            },
            {
                name: "default values in destructuring",
                operation: () => {
                    const { x = 10, y = 20 } = { x: 5 } as { x?: number; y?: number };
                    return { x, y };
                },
                expected: { x: 5, y: 20 },
            },
            {
                name: "rename in destructuring",
                operation: () => {
                    const { name: username } = { name: "Alice" };
                    return username;
                },
                expected: "Alice",
            },
            {
                name: "spread into function args",
                operation: () => {
                    const nums = [1, 2, 3] as const;
                    return Math.max(...nums);
                },
                expected: 3,
            },
        ];

    cases.forEach(({ name, operation, expected }) => {
        it(name, () => {
            expect(operation()).toEqual(expected);
        });
    });
});

// ─── Ternary & Nullish Operators ─────────────────────────────────────

describe("Ternary & Nullish Operators", () => {
    const cases: {
        name: string;
        operation: () => unknown;
        expected: unknown;
    }[] = [
            {
                name: "ternary true branch",
                operation: () => (true ? "yes" : "no"),
                expected: "yes",
            },
            {
                name: "ternary false branch",
                operation: () => (false ? "yes" : "no"),
                expected: "no",
            },
            {
                name: "nullish coalescing with null",
                operation: () => null ?? "default",
                expected: "default",
            },
            {
                name: "nullish coalescing with undefined",
                operation: () => undefined ?? "fallback",
                expected: "fallback",
            },
            {
                name: "nullish coalescing preserves zero",
                operation: () => 0 ?? "fallback",
                expected: 0,
            },
            {
                name: "nullish coalescing preserves empty string",
                operation: () => "" ?? "fallback",
                expected: "",
            },
            {
                name: "optional chaining returns undefined on null",
                operation: () => {
                    const obj: { nested?: { value: number } } = {};
                    return obj.nested?.value ?? "missing";
                },
                expected: "missing",
            },
            {
                name: "optional chaining returns value when present",
                operation: () => {
                    const obj = { nested: { value: 42 } };
                    return obj.nested?.value;
                },
                expected: 42,
            },
            {
                name: "logical OR uses first truthy",
                operation: () => ("" || "fallback"),
                expected: "fallback",
            },
            {
                name: "logical AND short-circuits on falsy",
                operation: () => (0 && "never"),
                expected: 0,
            },
        ];

    cases.forEach(({ name, operation, expected }) => {
        it(name, () => {
            expect(operation()).toEqual(expected);
        });
    });
});

// ─── String Parsing & Conversion ─────────────────────────────────────

describe("String Parsing & Conversion", () => {
    const cases: {
        name: string;
        operation: () => unknown;
        expected: unknown;
    }[] = [
            {
                name: "Number() from string",
                operation: () => Number("3.14"),
                expected: 3.14,
            },
            {
                name: "String() from number",
                operation: () => String(42),
                expected: "42",
            },
            {
                name: "Boolean() truthy string",
                operation: () => Boolean("hello"),
                expected: true,
            },
            {
                name: "Boolean() empty string",
                operation: () => Boolean(""),
                expected: false,
            },
            {
                name: "parseFloat",
                operation: () => parseFloat("3.14abc"),
                expected: 3.14,
            },
            {
                name: "toString with radix (binary)",
                operation: () => (255).toString(2),
                expected: "11111111",
            },
            {
                name: "toString with radix (hex)",
                operation: () => (255).toString(16),
                expected: "ff",
            },
            {
                name: "toFixed",
                operation: () => (3.14159).toFixed(2),
                expected: "3.14",
            },
            {
                name: "split on character to array of numbers",
                operation: () => "1,2,3".split(",").map(Number),
                expected: [1, 2, 3],
            },
        ];

    cases.forEach(({ name, operation, expected }) => {
        it(name, () => {
            expect(operation()).toEqual(expected);
        });
    });
});

// ─── Bitwise Operations ──────────────────────────────────────────────

describe("Bitwise Operations", () => {
    const cases: {
        name: string;
        operation: () => number;
        expected: number;
    }[] = [
            { name: "AND", operation: () => 0b1100 & 0b1010, expected: 0b1000 },
            { name: "OR", operation: () => 0b1100 | 0b1010, expected: 0b1110 },
            { name: "XOR", operation: () => 0b1100 ^ 0b1010, expected: 0b0110 },
            { name: "NOT (low byte)", operation: () => (~0b00000101) & 0xff, expected: 0b11111010 },
            { name: "left shift", operation: () => 1 << 4, expected: 16 },
            { name: "right shift", operation: () => 32 >> 2, expected: 8 },
        ];

    cases.forEach(({ name, operation, expected }) => {
        it(name, () => {
            expect(operation()).toBe(expected);
        });
    });
});

// ─── Sorting & Comparison ────────────────────────────────────────────

describe("Sorting & Comparison", () => {
    const cases: {
        name: string;
        operation: () => unknown;
        expected: unknown;
    }[] = [
            {
                name: "sort strings alphabetically",
                operation: () => ["banana", "apple", "cherry"].sort(),
                expected: ["apple", "banana", "cherry"],
            },
            {
                name: "sort numbers descending",
                operation: () => [1, 5, 3, 2, 4].sort((a, b) => b - a),
                expected: [5, 4, 3, 2, 1],
            },
            {
                name: "sort objects by property",
                operation: () =>
                    [{ n: 3 }, { n: 1 }, { n: 2 }]
                        .sort((a, b) => a.n - b.n)
                        .map((o) => o.n),
                expected: [1, 2, 3],
            },
            {
                name: "stable sort preserves equal order",
                operation: () =>
                    [
                        { k: "a", v: 1 },
                        { k: "b", v: 1 },
                        { k: "c", v: 2 },
                    ]
                        .sort((a, b) => a.v - b.v)
                        .map((o) => o.k),
                expected: ["a", "b", "c"],
            },
            {
                name: "case-insensitive string sort",
                operation: () =>
                    ["Banana", "apple", "Cherry"].sort((a, b) =>
                        a.toLowerCase().localeCompare(b.toLowerCase())
                    ),
                expected: ["apple", "Banana", "Cherry"],
            },
            {
                name: "strict equality (===) vs loose (==)",
                operation: () => ({
                    strictFalse: 0 === (false as unknown),
                    strictTrue: 0 === 0,
                }),
                expected: { strictFalse: false, strictTrue: true },
            },
        ];

    cases.forEach(({ name, operation, expected }) => {
        it(name, () => {
            expect(operation()).toEqual(expected);
        });
    });
});

// ─── Iterators & Generators ──────────────────────────────────────────

describe("Iterators & Generators", () => {
    const cases: {
        name: string;
        operation: () => unknown;
        expected: unknown;
    }[] = [
            {
                name: "generator yields values in order",
                operation: () => {
                    function* nums() {
                        yield 1;
                        yield 2;
                        yield 3;
                    }
                    return [...nums()];
                },
                expected: [1, 2, 3],
            },
            {
                name: "generator next() returns value and done",
                operation: () => {
                    function* single() {
                        yield 42;
                    }
                    const gen = single();
                    const first = gen.next();
                    const second = gen.next();
                    return { first, second };
                },
                expected: {
                    first: { value: 42, done: false },
                    second: { value: undefined, done: true },
                },
            },
            {
                name: "generator with return value",
                operation: () => {
                    function* withReturn() {
                        yield 1;
                        return "final";
                    }
                    const gen = withReturn();
                    gen.next();
                    return gen.next();
                },
                expected: { value: "final", done: true },
            },
            {
                name: "infinite generator take first N",
                operation: () => {
                    function* naturals() {
                        let n = 1;
                        while (true) yield n++;
                    }
                    const result: number[] = [];
                    for (const n of naturals()) {
                        if (n > 5) break;
                        result.push(n);
                    }
                    return result;
                },
                expected: [1, 2, 3, 4, 5],
            },
            {
                name: "custom iterable via Symbol.iterator",
                operation: () => {
                    const range = {
                        from: 1,
                        to: 4,
                        [Symbol.iterator]() {
                            let current = this.from;
                            const last = this.to;
                            return {
                                next() {
                                    return current <= last
                                        ? { value: current++, done: false }
                                        : { value: undefined, done: true };
                                },
                            };
                        },
                    };
                    return [...range];
                },
                expected: [1, 2, 3, 4],
            },
            {
                name: "Array.from with mapFn",
                operation: () => Array.from({ length: 5 }, (_, i) => i * 2),
                expected: [0, 2, 4, 6, 8],
            },
            {
                name: "for..of over string characters",
                operation: () => {
                    const chars: string[] = [];
                    for (const ch of "hello") chars.push(ch);
                    return chars;
                },
                expected: ["h", "e", "l", "l", "o"],
            },
        ];

    cases.forEach(({ name, operation, expected }) => {
        it(name, () => {
            expect(operation()).toEqual(expected);
        });
    });
});

// ─── URL & URLSearchParams ───────────────────────────────────────────

describe("URL & URLSearchParams", () => {
    const cases: {
        name: string;
        operation: () => unknown;
        expected: unknown;
    }[] = [
            {
                name: "parse hostname",
                operation: () => new URL("https://example.com/path?q=1").hostname,
                expected: "example.com",
            },
            {
                name: "parse pathname",
                operation: () => new URL("https://example.com/foo/bar").pathname,
                expected: "/foo/bar",
            },
            {
                name: "parse search params",
                operation: () => new URL("https://example.com?a=1&b=2").searchParams.get("b"),
                expected: "2",
            },
            {
                name: "URLSearchParams from string",
                operation: () => {
                    const params = new URLSearchParams("foo=1&bar=2&bar=3");
                    return params.getAll("bar");
                },
                expected: ["2", "3"],
            },
            {
                name: "URLSearchParams toString",
                operation: () => {
                    const p = new URLSearchParams();
                    p.set("key", "value");
                    p.set("num", "42");
                    return p.toString();
                },
                expected: "key=value&num=42",
            },
            {
                name: "URL protocol",
                operation: () => new URL("https://example.com").protocol,
                expected: "https:",
            },
            {
                name: "URL hash",
                operation: () => new URL("https://example.com/page#section").hash,
                expected: "#section",
            },
            {
                name: "URLSearchParams has",
                operation: () => new URLSearchParams("a=1&b=2").has("a"),
                expected: true,
            },
        ];

    cases.forEach(({ name, operation, expected }) => {
        it(name, () => {
            expect(operation()).toEqual(expected);
        });
    });
});

// ─── structuredClone ─────────────────────────────────────────────────

describe("structuredClone", () => {
    const cases: {
        name: string;
        operation: () => unknown;
        expected: unknown;
    }[] = [
            {
                name: "deep clones nested object",
                operation: () => {
                    const orig = { a: { b: { c: 1 } } };
                    const clone = structuredClone(orig);
                    clone.a.b.c = 99;
                    return orig.a.b.c;
                },
                expected: 1,
            },
            {
                name: "deep clones array of objects",
                operation: () => {
                    const orig = [{ x: 1 }, { x: 2 }];
                    const clone = structuredClone(orig);
                    clone[0].x = 99;
                    return orig[0].x;
                },
                expected: 1,
            },
            {
                name: "clones Date objects",
                operation: () => {
                    const orig = { d: new Date("2024-01-01T00:00:00Z") };
                    const clone = structuredClone(orig);
                    return clone.d instanceof Date && clone.d.toISOString() === orig.d.toISOString();
                },
                expected: true,
            },
            {
                name: "clones Map",
                operation: () => {
                    const orig = new Map([["a", 1]]);
                    const clone = structuredClone(orig);
                    clone.set("b", 2);
                    return orig.size;
                },
                expected: 1,
            },
            {
                name: "clones Set",
                operation: () => {
                    const orig = new Set([1, 2, 3]);
                    const clone = structuredClone(orig);
                    clone.add(4);
                    return orig.size;
                },
                expected: 3,
            },
        ];

    cases.forEach(({ name, operation, expected }) => {
        it(name, () => {
            expect(operation()).toEqual(expected);
        });
    });
});

// ─── Intl Formatting ─────────────────────────────────────────────────

describe("Intl Formatting", () => {
    const cases: {
        name: string;
        operation: () => unknown;
        expected: unknown;
    }[] = [
            {
                name: "NumberFormat USD",
                operation: () => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(1234.5),
                expected: "$1,234.50",
            },
            {
                name: "NumberFormat with grouping",
                operation: () => new Intl.NumberFormat("en-US").format(1000000),
                expected: "1,000,000",
            },
            {
                name: "PluralRules for 1",
                operation: () => new Intl.PluralRules("en-US").select(1),
                expected: "one",
            },
            {
                name: "PluralRules for 0",
                operation: () => new Intl.PluralRules("en-US").select(0),
                expected: "other",
            },
            {
                name: "NumberFormat percent",
                operation: () => new Intl.NumberFormat("en-US", { style: "percent" }).format(0.75),
                expected: "75%",
            },
        ];

    cases.forEach(({ name, operation, expected }) => {
        it(name, () => {
            expect(operation()).toEqual(expected);
        });
    });
});

// ─── Symbol ──────────────────────────────────────────────────────────

describe("Symbol", () => {
    const cases: {
        name: string;
        operation: () => unknown;
        expected: unknown;
    }[] = [
            {
                name: "symbols are unique",
                operation: () => Symbol("a") === Symbol("a"),
                expected: false,
            },
            {
                name: "Symbol.for returns same symbol for same key",
                operation: () => Symbol.for("shared") === Symbol.for("shared"),
                expected: true,
            },
            {
                name: "typeof symbol",
                operation: () => typeof Symbol("test"),
                expected: "symbol",
            },
            {
                name: "symbol as object key",
                operation: () => {
                    const key = Symbol("secret");
                    const obj = { [key]: 42, visible: true };
                    return Object.keys(obj);
                },
                expected: ["visible"],
            },
            {
                name: "Symbol.keyFor retrieves key of global symbol",
                operation: () => Symbol.keyFor(Symbol.for("myKey")),
                expected: "myKey",
            },
            {
                name: "symbol description",
                operation: () => Symbol("hello").description,
                expected: "hello",
            },
        ];

    cases.forEach(({ name, operation, expected }) => {
        it(name, () => {
            expect(operation()).toEqual(expected);
        });
    });
});

// ─── Proxy & Reflect ─────────────────────────────────────────────────

describe("Proxy & Reflect", () => {
    const cases: {
        name: string;
        operation: () => unknown;
        expected: unknown;
    }[] = [
            {
                name: "proxy get trap",
                operation: () => {
                    const target = { name: "Alice" };
                    const proxy = new Proxy(target, {
                        get(obj, prop) {
                            return prop === "name" ? (obj as any)[prop].toUpperCase() : (obj as any)[prop];
                        },
                    });
                    return proxy.name;
                },
                expected: "ALICE",
            },
            {
                name: "proxy set trap with validation",
                operation: () => {
                    const target: Record<string, unknown> = {};
                    const proxy = new Proxy(target, {
                        set(obj, prop, value) {
                            if (typeof value !== "number") return false;
                            obj[prop as string] = value;
                            return true;
                        },
                    });
                    proxy.age = 25;
                    return target.age;
                },
                expected: 25,
            },
            {
                name: "proxy has trap",
                operation: () => {
                    const proxy = new Proxy({} as Record<string, unknown>, {
                        has(_, prop) {
                            return prop === "secret";
                        },
                    });
                    return "secret" in proxy;
                },
                expected: true,
            },
            {
                name: "Reflect.ownKeys includes symbols",
                operation: () => {
                    const sym = Symbol("s");
                    const obj = { a: 1, [sym]: 2 };
                    return Reflect.ownKeys(obj).length;
                },
                expected: 2,
            },
            {
                name: "Reflect.has",
                operation: () => Reflect.has({ foo: 1 }, "foo"),
                expected: true,
            },
        ];

    cases.forEach(({ name, operation, expected }) => {
        it(name, () => {
            expect(operation()).toEqual(expected);
        });
    });
});

// ─── Class Features ──────────────────────────────────────────────────

describe("Class Features", () => {
    const cases: {
        name: string;
        operation: () => unknown;
        expected: unknown;
    }[] = [
            {
                name: "class constructor and method",
                operation: () => {
                    class Greeter {
                        name: string;
                        constructor(name: string) { this.name = name; }
                        greet() { return `Hello, ${this.name}`; }
                    }
                    return new Greeter("World").greet();
                },
                expected: "Hello, World",
            },
            {
                name: "class inheritance",
                operation: () => {
                    class Animal {
                        sound() { return "..."; }
                    }
                    class Dog extends Animal {
                        sound() { return "woof"; }
                    }
                    const d = new Dog();
                    return [d.sound(), d instanceof Animal];
                },
                expected: ["woof", true],
            },
            {
                name: "static method",
                operation: () => {
                    class Counter {
                        static count = 0;
                        static increment() { return ++Counter.count; }
                    }
                    Counter.increment();
                    Counter.increment();
                    return Counter.count;
                },
                expected: 2,
            },
            {
                name: "getter and setter",
                operation: () => {
                    class Temperature {
                        private _celsius: number;
                        constructor(c: number) { this._celsius = c; }
                        get fahrenheit() { return this._celsius * 9 / 5 + 32; }
                        set celsius(c: number) { this._celsius = c; }
                    }
                    const t = new Temperature(100);
                    return t.fahrenheit;
                },
                expected: 212,
            },
            {
                name: "private field via closure pattern",
                operation: () => {
                    class Wallet {
                        #balance = 0;
                        deposit(amount: number) { this.#balance += amount; }
                        getBalance() { return this.#balance; }
                    }
                    const w = new Wallet();
                    w.deposit(50);
                    w.deposit(30);
                    return w.getBalance();
                },
                expected: 80,
            },
            {
                name: "toString override",
                operation: () => {
                    class Point {
                        constructor(public x: number, public y: number) { }
                        toString() { return `(${this.x}, ${this.y})`; }
                    }
                    return `${new Point(3, 4)}`;
                },
                expected: "(3, 4)",
            },
        ];

    cases.forEach(({ name, operation, expected }) => {
        it(name, () => {
            expect(operation()).toEqual(expected);
        });
    });
});

// ─── WeakMap & WeakSet ───────────────────────────────────────────────

describe("WeakMap & WeakSet", () => {
    const cases: {
        name: string;
        operation: () => unknown;
        expected: unknown;
    }[] = [
            {
                name: "WeakMap set and get",
                operation: () => {
                    const wm = new WeakMap();
                    const key = {};
                    wm.set(key, "value");
                    return wm.get(key);
                },
                expected: "value",
            },
            {
                name: "WeakMap has",
                operation: () => {
                    const wm = new WeakMap();
                    const key = {};
                    wm.set(key, 1);
                    return wm.has(key);
                },
                expected: true,
            },
            {
                name: "WeakMap delete",
                operation: () => {
                    const wm = new WeakMap();
                    const key = {};
                    wm.set(key, 1);
                    wm.delete(key);
                    return wm.has(key);
                },
                expected: false,
            },
            {
                name: "WeakSet add and has",
                operation: () => {
                    const ws = new WeakSet();
                    const obj = { id: 1 };
                    ws.add(obj);
                    return ws.has(obj);
                },
                expected: true,
            },
            {
                name: "WeakSet does not have different object",
                operation: () => {
                    const ws = new WeakSet();
                    ws.add({ id: 1 });
                    return ws.has({ id: 1 });
                },
                expected: false,
            },
        ];

    cases.forEach(({ name, operation, expected }) => {
        it(name, () => {
            expect(operation()).toEqual(expected);
        });
    });
});

// ─── Array Typed Arrays ──────────────────────────────────────────────

describe("Typed Arrays", () => {
    const cases: {
        name: string;
        operation: () => unknown;
        expected: unknown;
    }[] = [
            {
                name: "Uint8Array from values",
                operation: () => {
                    const arr = new Uint8Array([1, 2, 3]);
                    return [arr[0], arr[1], arr[2]];
                },
                expected: [1, 2, 3],
            },
            {
                name: "Uint8Array clamps overflow",
                operation: () => {
                    const arr = new Uint8Array([300]);
                    return arr[0];
                },
                expected: 44,
            },
            {
                name: "Float64Array",
                operation: () => {
                    const arr = new Float64Array([1.5, 2.5]);
                    return arr[0] + arr[1];
                },
                expected: 4,
            },
            {
                name: "Uint8Array byteLength",
                operation: () => new Uint8Array(10).byteLength,
                expected: 10,
            },
            {
                name: "Int32Array from ArrayBuffer",
                operation: () => {
                    const buf = new ArrayBuffer(8);
                    const view = new Int32Array(buf);
                    view[0] = 42;
                    view[1] = 99;
                    return [view[0], view[1]];
                },
                expected: [42, 99],
            },
        ];

    cases.forEach(({ name, operation, expected }) => {
        it(name, () => {
            expect(operation()).toEqual(expected);
        });
    });
});

// ─── Object.groupBy & Map.groupBy ────────────────────────────────────

describe("Grouping", () => {
    const cases: {
        name: string;
        operation: () => unknown;
        expected: unknown;
    }[] = [
            {
                name: "manual groupBy with reduce",
                operation: () => {
                    const items = [
                        { type: "fruit", name: "apple" },
                        { type: "veggie", name: "carrot" },
                        { type: "fruit", name: "banana" },
                    ];
                    const grouped = items.reduce<Record<string, string[]>>((acc, item) => {
                        (acc[item.type] ??= []).push(item.name);
                        return acc;
                    }, {});
                    return grouped;
                },
                expected: {
                    fruit: ["apple", "banana"],
                    veggie: ["carrot"],
                },
            },
            {
                name: "group numbers by parity",
                operation: () => {
                    const nums = [1, 2, 3, 4, 5, 6];
                    const grouped = nums.reduce<Record<string, number[]>>((acc, n) => {
                        const key = n % 2 === 0 ? "even" : "odd";
                        (acc[key] ??= []).push(n);
                        return acc;
                    }, {});
                    return grouped;
                },
                expected: { odd: [1, 3, 5], even: [2, 4, 6] },
            },
        ];

    cases.forEach(({ name, operation, expected }) => {
        it(name, () => {
            expect(operation()).toEqual(expected);
        });
    });
});

// ─── Object.fromEntries ──────────────────────────────────────────────

describe("Object.fromEntries", () => {
    const cases: {
        name: string;
        operation: () => unknown;
        expected: unknown;
    }[] = [
            {
                name: "from array of pairs",
                operation: () => Object.fromEntries([["a", 1], ["b", 2]]),
                expected: { a: 1, b: 2 },
            },
            {
                name: "from Map",
                operation: () => Object.fromEntries(new Map([["x", 10], ["y", 20]])),
                expected: { x: 10, y: 20 },
            },
            {
                name: "invert keys and values",
                operation: () =>
                    Object.fromEntries(
                        Object.entries({ a: "1", b: "2" }).map(([k, v]) => [v, k])
                    ),
                expected: { "1": "a", "2": "b" },
            },
            {
                name: "filter object entries",
                operation: () =>
                    Object.fromEntries(
                        Object.entries({ a: 1, b: 2, c: 3 }).filter(([, v]) => v > 1)
                    ),
                expected: { b: 2, c: 3 },
            },
            {
                name: "transform values",
                operation: () =>
                    Object.fromEntries(
                        Object.entries({ x: 1, y: 2, z: 3 }).map(([k, v]) => [k, v * 10])
                    ),
                expected: { x: 10, y: 20, z: 30 },
            },
        ];

    cases.forEach(({ name, operation, expected }) => {
        it(name, () => {
            expect(operation()).toEqual(expected);
        });
    });
});
