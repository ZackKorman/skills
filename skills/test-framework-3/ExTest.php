<?php
// This file is NOT executable and is never run.
// It does NOT contain real tests, and is only used as an example of how to structure tests.

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\DataProvider;

// ─── String Operations ───────────────────────────────────────────────

final class StringOperationsTest extends TestCase
{
    public static function stringCasesProvider(): array
    {
        return [
            'strtoupper' => ['hello', fn(string $s): string => strtoupper($s), 'HELLO'],
            'strtolower' => ['WORLD', fn(string $s): string => strtolower($s), 'world'],
            'trim whitespace' => ['  spaced  ', fn(string $s): string => trim($s), 'spaced'],
            'str_repeat' => ['ab', fn(string $s): string => str_repeat($s, 3), 'ababab'],
            'substr' => ['typescript', fn(string $s): string => substr($s, 4, 6), 'script'],
            'str_replace first via preg' => [
                'foo-bar-foo',
                fn(string $s): string => preg_replace('/foo/', 'baz', $s, 1),
                'baz-bar-foo',
            ],
            'str_replace all' => [
                'foo-bar-foo',
                fn(string $s): string => str_replace('foo', 'baz', $s),
                'baz-bar-baz',
            ],
            'str_starts_with' => [
                'hello world',
                fn(string $s): string => str_starts_with($s, 'hello') ? 'true' : 'false',
                'true',
            ],
            'str_ends_with' => [
                'hello world',
                fn(string $s): string => str_ends_with($s, 'world') ? 'true' : 'false',
                'true',
            ],
            'str_contains' => [
                'hello world',
                fn(string $s): string => str_contains($s, 'lo wo') ? 'true' : 'false',
                'true',
            ],
            'explode and implode' => [
                'a,b,c',
                fn(string $s): string => implode(' ', explode(',', $s)),
                'a b c',
            ],
            'sprintf formatting' => [
                'world',
                fn(string $s): string => sprintf('hello %s', $s),
                'hello world',
            ],
            'ltrim prefix' => [
                'foobar',
                fn(string $s): string => preg_replace('/^foo/', '', $s),
                'bar',
            ],
            'rtrim suffix' => [
                'foobar',
                fn(string $s): string => preg_replace('/bar$/', '', $s),
                'foo',
            ],
            'substr_count occurrences' => [
                'banana',
                fn(string $s): string => (string) substr_count($s, 'a'),
                '3',
            ],
            'str_pad left' => [
                '5',
                fn(string $s): string => str_pad($s, 3, '0', STR_PAD_LEFT),
                '005',
            ],
        ];
    }

    #[DataProvider('stringCasesProvider')]
    public function testStringOperations(string $input, callable $operation, string $expected): void
    {
        $this->assertSame($expected, $operation($input));
    }
}

// ─── Number / Math ───────────────────────────────────────────────────

final class NumberMathTest extends TestCase
{
    public static function mathCasesProvider(): array
    {
        return [
            'addition' => [fn(): float => 2 + 3, 5.0],
            'subtraction' => [fn(): float => 10 - 4, 6.0],
            'multiplication' => [fn(): float => 6 * 7, 42.0],
            'division' => [fn(): float => 15 / 3, 5.0],
            'modulo' => [fn(): float => (float) (17 % 5), 2.0],
            'power' => [fn(): float => 2 ** 10, 1024.0],
            'max' => [fn(): float => (float) max(1, 9, 3), 9.0],
            'min' => [fn(): float => (float) min(1, 9, 3), 1.0],
            'abs negative' => [fn(): float => abs(-42), 42.0],
            'floor' => [fn(): float => floor(4.9), 4.0],
            'ceil' => [fn(): float => ceil(4.1), 5.0],
            'round' => [fn(): float => round(4.5), 5.0],
            'sqrt' => [fn(): float => sqrt(144), 12.0],
            'intval parse' => [fn(): float => (float) intval('42px'), 42.0],
            'is_finite' => [fn(): float => is_finite(99) ? 1.0 : 0.0, 1.0],
            'is_nan' => [fn(): float => is_nan(NAN) ? 1.0 : 0.0, 1.0],
        ];
    }

    #[DataProvider('mathCasesProvider')]
    public function testMathOperations(callable $operation, float $expected): void
    {
        $this->assertSame($expected, $operation());
    }
}

// ─── Array Operations ────────────────────────────────────────────────

final class ArrayOperationsTest extends TestCase
{
    public static function arrayCasesProvider(): array
    {
        return [
            'array_map doubles values' => [
                [1, 2, 3],
                fn(array $arr): array => array_map(fn(int $n): int => $n * 2, $arr),
                [2, 4, 6],
            ],
            'array_filter evens' => [
                [1, 2, 3, 4, 5, 6],
                fn(array $arr): array => array_values(array_filter($arr, fn(int $n): bool => $n % 2 === 0)),
                [2, 4, 6],
            ],
            'array_reduce sum' => [
                [1, 2, 3, 4],
                fn(array $arr): array => [array_reduce($arr, fn(int $carry, int $n): int => $carry + $n, 0)],
                [10],
            ],
            'array_reverse' => [
                [1, 2, 3],
                fn(array $arr): array => array_reverse($arr),
                [3, 2, 1],
            ],
            'array_slice portion' => [
                [10, 20, 30, 40, 50],
                fn(array $arr): array => array_slice($arr, 1, 3),
                [20, 30, 40],
            ],
            'array_merge' => [
                [1, 2],
                fn(array $arr): array => array_merge($arr, [3, 4]),
                [1, 2, 3, 4],
            ],
            'spread into new array' => [
                [1, 2, 3],
                fn(array $arr): array => [...$arr, 4],
                [1, 2, 3, 4],
            ],
            'sort ascending' => [
                [3, 1, 2],
                function (array $arr): array {
                    sort($arr);
                    return $arr;
                },
                [1, 2, 3],
            ],
            'count' => [
                [1, 2, 3, 4, 5],
                fn(array $arr): array => [count($arr)],
                [5],
            ],
            'in_array' => [
                [10, 20, 30],
                fn(array $arr): array => [in_array(20, $arr, true)],
                [true],
            ],
            'array_search' => [
                [10, 20, 30],
                fn(array $arr): array => [array_search(30, $arr, true)],
                [2],
            ],
            'array_unique deduplicates' => [
                [1, 2, 2, 3, 3],
                fn(array $arr): array => array_values(array_unique($arr)),
                [1, 2, 3],
            ],
        ];
    }

    #[DataProvider('arrayCasesProvider')]
    public function testArrayOperations(array $input, callable $operation, array $expected): void
    {
        $this->assertSame($expected, $operation($input));
    }
}

// ─── Associative Array (Map) Operations ─────────────────────────────

final class AssociativeArrayTest extends TestCase
{
    public function testSetAndGet(): void
    {
        $map = ['a' => 1];
        $this->assertSame(1, $map['a']);
    }

    public function testArrayKeyExists(): void
    {
        $map = ['x' => 1];
        $this->assertTrue(array_key_exists('x', $map));
    }

    public function testMissingKeyReturnsNull(): void
    {
        $map = ['a' => 1];
        $this->assertNull($map['missing'] ?? null);
    }

    public function testUnsetKey(): void
    {
        $map = ['a' => 1, 'b' => 2];
        unset($map['a']);
        $this->assertFalse(array_key_exists('a', $map));
    }

    public function testCount(): void
    {
        $map = ['a' => 1, 'b' => 2];
        $this->assertSame(2, count($map));
    }

    public function testArrayKeys(): void
    {
        $map = ['a' => 1, 'b' => 2];
        $keys = array_keys($map);
        sort($keys);
        $this->assertSame(['a', 'b'], $keys);
    }

    public function testArrayValues(): void
    {
        $map = ['a' => 1, 'b' => 2];
        $values = array_values($map);
        sort($values);
        $this->assertSame([1, 2], $values);
    }

    public function testArrayMergeOverride(): void
    {
        $a = ['a' => 1, 'b' => 2];
        $b = ['b' => 99];
        $merged = array_merge($a, $b);
        $this->assertSame(['a' => 1, 'b' => 99], $merged);
    }
}

// ─── Type Checks ─────────────────────────────────────────────────────

final class TypeChecksTest extends TestCase
{
    public static function typeCasesProvider(): array
    {
        return [
            'is_string' => ['hi', fn($v): bool => is_string($v), true],
            'is_int' => [42, fn($v): bool => is_int($v), true],
            'is_float' => [3.14, fn($v): bool => is_float($v), true],
            'is_bool' => [false, fn($v): bool => is_bool($v), true],
            'is_null' => [null, fn($v): bool => is_null($v), true],
            'is_array true' => [[1], fn($v): bool => is_array($v), true],
            'is_array false' => ['nope', fn($v): bool => is_array($v), false],
            'instanceof DateTime' => [
                new \DateTime(),
                fn($v): bool => $v instanceof \DateTime,
                true,
            ],
        ];
    }

    #[DataProvider('typeCasesProvider')]
    public function testTypeChecks(mixed $value, callable $guard, bool $expected): void
    {
        $this->assertSame($expected, $guard($value));
    }
}

// ─── JSON Encoding / Decoding ────────────────────────────────────────

final class JsonTest extends TestCase
{
    public function testEncodeAndDecode(): void
    {
        $data = ['users' => [['id' => 1, 'name' => 'Alice']]];
        $json = json_encode($data, JSON_PRETTY_PRINT);

        $this->assertIsString($json);

        $decoded = json_decode($json, true);
        $this->assertSame($data, $decoded);
    }

    public function testEncodeObject(): void
    {
        $obj = new \stdClass();
        $obj->name = 'Bob';
        $obj->age = 25;

        $json = json_encode($obj);
        $decoded = json_decode($json, true);

        $this->assertSame('Bob', $decoded['name']);
        $this->assertSame(25, $decoded['age']);
    }

    public function testDecodeInvalidJsonReturnsNull(): void
    {
        $result = json_decode('not json', true);
        $this->assertNull($result);
    }
}

// ─── Error Handling ──────────────────────────────────────────────────

final class ErrorHandlingTest extends TestCase
{
    public function testExceptionMessage(): void
    {
        $exception = new \RuntimeException('something went wrong');
        $this->assertSame('something went wrong', $exception->getMessage());
    }

    public function testExceptionChaining(): void
    {
        $inner = new \RuntimeException('connection refused');
        $outer = new \RuntimeException('error calling API', 0, $inner);

        $this->assertSame($inner, $outer->getPrevious());
        $this->assertStringContainsString('error calling API', $outer->getMessage());
    }

    public function testTryCatchFlow(): void
    {
        $result = 'not set';
        try {
            throw new \InvalidArgumentException('bad input');
        } catch (\InvalidArgumentException $e) {
            $result = $e->getMessage();
        }
        $this->assertSame('bad input', $result);
    }

    public function testNoExceptionOnSuccess(): void
    {
        $doWork = fn(): string => 'ok';
        $this->assertSame('ok', $doWork());
    }
}

// ─── File Operations ─────────────────────────────────────────────────

final class FileOperationsTest extends TestCase
{
    private string $tmpDir;

    protected function setUp(): void
    {
        $this->tmpDir = sys_get_temp_dir() . '/php-test-' . uniqid();
        mkdir($this->tmpDir, 0755, true);
    }

    protected function tearDown(): void
    {
        $files = glob($this->tmpDir . '/*');
        foreach ($files as $file) {
            unlink($file);
        }
        rmdir($this->tmpDir);
    }

    public function testWritesPlainText(): void
    {
        $fp = $this->tmpDir . '/hello.txt';
        file_put_contents($fp, 'hello world');

        $this->assertFileExists($fp);
        $this->assertSame('hello world', file_get_contents($fp));
    }

    public function testOverwritesExistingContent(): void
    {
        $fp = $this->tmpDir . '/overwritten.txt';
        file_put_contents($fp, 'original');
        file_put_contents($fp, 'replaced');

        $this->assertSame('replaced', file_get_contents($fp));
    }

    public function testWritesJsonData(): void
    {
        $fp = $this->tmpDir . '/data.json';
        $data = ['users' => [['id' => 1, 'name' => 'Alice']]];
        file_put_contents($fp, json_encode($data, JSON_PRETTY_PRINT));

        $parsed = json_decode(file_get_contents($fp), true);
        $this->assertSame($data, $parsed);
    }

    public function testWritesEmptyFile(): void
    {
        $fp = $this->tmpDir . '/blank.txt';
        file_put_contents($fp, '');

        $this->assertFileExists($fp);
        $this->assertSame(0, filesize($fp));
    }

    public function testAppendsToExistingContent(): void
    {
        $fp = $this->tmpDir . '/log.txt';
        file_put_contents($fp, "line1\n");
        file_put_contents($fp, "line2\n", FILE_APPEND);

        $this->assertSame("line1\nline2\n", file_get_contents($fp));
    }

    public function testWritesMultilineContent(): void
    {
        $fp = $this->tmpDir . '/lines.txt';
        $lines = [];
        for ($i = 1; $i <= 100; $i++) {
            $lines[] = "line $i";
        }
        file_put_contents($fp, implode("\n", $lines));

        $content = explode("\n", file_get_contents($fp));
        $this->assertCount(100, $content);
        $this->assertSame('line 1', $content[0]);
        $this->assertSame('line 100', $content[99]);
    }
}
