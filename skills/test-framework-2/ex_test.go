// This file is NOT executable and is never run.
// It does NOT contain real tests, and is only used as an example of how to structure tests.

package example

import (
	"encoding/json"
	"fmt"
	"math"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"testing"
)

// ─── String Operations ───────────────────────────────────────────────

func TestStringOperations(t *testing.T) {
	cases := []struct {
		name      string
		input     string
		operation func(string) string
		expected  string
	}{
		{
			name:      "ToUpper",
			input:     "hello",
			operation: func(s string) string { return strings.ToUpper(s) },
			expected:  "HELLO",
		},
		{
			name:      "ToLower",
			input:     "WORLD",
			operation: func(s string) string { return strings.ToLower(s) },
			expected:  "world",
		},
		{
			name:      "TrimSpace",
			input:     "  spaced  ",
			operation: func(s string) string { return strings.TrimSpace(s) },
			expected:  "spaced",
		},
		{
			name:      "Repeat",
			input:     "ab",
			operation: func(s string) string { return strings.Repeat(s, 3) },
			expected:  "ababab",
		},
		{
			name:      "Slice substring",
			input:     "typescript",
			operation: func(s string) string { return s[4:10] },
			expected:  "script",
		},
		{
			name:      "Replace first occurrence",
			input:     "foo-bar-foo",
			operation: func(s string) string { return strings.Replace(s, "foo", "baz", 1) },
			expected:  "baz-bar-foo",
		},
		{
			name:      "ReplaceAll occurrences",
			input:     "foo-bar-foo",
			operation: func(s string) string { return strings.ReplaceAll(s, "foo", "baz") },
			expected:  "baz-bar-baz",
		},
		{
			name:      "HasPrefix",
			input:     "hello world",
			operation: func(s string) string { return fmt.Sprintf("%t", strings.HasPrefix(s, "hello")) },
			expected:  "true",
		},
		{
			name:      "HasSuffix",
			input:     "hello world",
			operation: func(s string) string { return fmt.Sprintf("%t", strings.HasSuffix(s, "world")) },
			expected:  "true",
		},
		{
			name:      "Contains",
			input:     "hello world",
			operation: func(s string) string { return fmt.Sprintf("%t", strings.Contains(s, "lo wo")) },
			expected:  "true",
		},
		{
			name:      "Split and rejoin",
			input:     "a,b,c",
			operation: func(s string) string { return strings.Join(strings.Split(s, ","), " ") },
			expected:  "a b c",
		},
		{
			name:      "Sprintf formatting",
			input:     "world",
			operation: func(s string) string { return fmt.Sprintf("hello %s", s) },
			expected:  "hello world",
		},
		{
			name:      "TrimPrefix",
			input:     "foobar",
			operation: func(s string) string { return strings.TrimPrefix(s, "foo") },
			expected:  "bar",
		},
		{
			name:      "TrimSuffix",
			input:     "foobar",
			operation: func(s string) string { return strings.TrimSuffix(s, "bar") },
			expected:  "foo",
		},
		{
			name:      "Count occurrences",
			input:     "banana",
			operation: func(s string) string { return fmt.Sprintf("%d", strings.Count(s, "a")) },
			expected:  "3",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			got := tc.operation(tc.input)
			if got != tc.expected {
				t.Errorf("got %q, want %q", got, tc.expected)
			}
		})
	}
}

// ─── Number / Math ───────────────────────────────────────────────────

func TestNumberMath(t *testing.T) {
	cases := []struct {
		name      string
		operation func() float64
		expected  float64
	}{
		{name: "addition", operation: func() float64 { return 2 + 3 }, expected: 5},
		{name: "subtraction", operation: func() float64 { return 10 - 4 }, expected: 6},
		{name: "multiplication", operation: func() float64 { return 6 * 7 }, expected: 42},
		{name: "division", operation: func() float64 { return 15.0 / 3.0 }, expected: 5},
		{name: "modulo", operation: func() float64 { return float64(17 % 5) }, expected: 2},
		{name: "power", operation: func() float64 { return math.Pow(2, 10) }, expected: 1024},
		{name: "Max", operation: func() float64 { return math.Max(math.Max(1, 9), 3) }, expected: 9},
		{name: "Min", operation: func() float64 { return math.Min(math.Min(1, 9), 3) }, expected: 1},
		{name: "Abs negative", operation: func() float64 { return math.Abs(-42) }, expected: 42},
		{name: "Floor", operation: func() float64 { return math.Floor(4.9) }, expected: 4},
		{name: "Ceil", operation: func() float64 { return math.Ceil(4.1) }, expected: 5},
		{name: "Round", operation: func() float64 { return math.Round(4.5) }, expected: 5},
		{name: "Sqrt", operation: func() float64 { return math.Sqrt(144) }, expected: 12},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			got := tc.operation()
			if got != tc.expected {
				t.Errorf("got %v, want %v", got, tc.expected)
			}
		})
	}
}

// ─── Slice Operations ────────────────────────────────────────────────

func TestSliceOperations(t *testing.T) {
	cases := []struct {
		name      string
		input     []int
		operation func([]int) []int
		expected  []int
	}{
		{
			name:  "map doubles values",
			input: []int{1, 2, 3},
			operation: func(s []int) []int {
				result := make([]int, len(s))
				for i, v := range s {
					result[i] = v * 2
				}
				return result
			},
			expected: []int{2, 4, 6},
		},
		{
			name:  "filter evens",
			input: []int{1, 2, 3, 4, 5, 6},
			operation: func(s []int) []int {
				var result []int
				for _, v := range s {
					if v%2 == 0 {
						result = append(result, v)
					}
				}
				return result
			},
			expected: []int{2, 4, 6},
		},
		{
			name:  "reverse",
			input: []int{1, 2, 3},
			operation: func(s []int) []int {
				result := make([]int, len(s))
				copy(result, s)
				for i, j := 0, len(result)-1; i < j; i, j = i+1, j-1 {
					result[i], result[j] = result[j], result[i]
				}
				return result
			},
			expected: []int{3, 2, 1},
		},
		{
			name:  "slice portion",
			input: []int{10, 20, 30, 40, 50},
			operation: func(s []int) []int {
				return s[1:4]
			},
			expected: []int{20, 30, 40},
		},
		{
			name:  "concat slices",
			input: []int{1, 2},
			operation: func(s []int) []int {
				return append(s, 3, 4)
			},
			expected: []int{1, 2, 3, 4},
		},
		{
			name:  "sort ascending",
			input: []int{3, 1, 2},
			operation: func(s []int) []int {
				result := make([]int, len(s))
				copy(result, s)
				sort.Ints(result)
				return result
			},
			expected: []int{1, 2, 3},
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			got := tc.operation(tc.input)
			if len(got) != len(tc.expected) {
				t.Fatalf("length mismatch: got %d, want %d", len(got), len(tc.expected))
			}
			for i := range got {
				if got[i] != tc.expected[i] {
					t.Errorf("index %d: got %d, want %d", i, got[i], tc.expected[i])
				}
			}
		})
	}
}

// ─── Slice Scalar Operations ─────────────────────────────────────────

func TestSliceScalarOperations(t *testing.T) {
	cases := []struct {
		name      string
		input     []int
		operation func([]int) int
		expected  int
	}{
		{
			name:  "reduce sum",
			input: []int{1, 2, 3, 4},
			operation: func(s []int) int {
				sum := 0
				for _, v := range s {
					sum += v
				}
				return sum
			},
			expected: 10,
		},
		{
			name:  "find first > 3",
			input: []int{1, 2, 4, 5},
			operation: func(s []int) int {
				for _, v := range s {
					if v > 3 {
						return v
					}
				}
				return -1
			},
			expected: 4,
		},
		{
			name:  "indexOf",
			input: []int{10, 20, 30},
			operation: func(s []int) int {
				for i, v := range s {
					if v == 30 {
						return i
					}
				}
				return -1
			},
			expected: 2,
		},
		{
			name:      "length",
			input:     []int{1, 2, 3, 4, 5},
			operation: func(s []int) int { return len(s) },
			expected:  5,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			got := tc.operation(tc.input)
			if got != tc.expected {
				t.Errorf("got %d, want %d", got, tc.expected)
			}
		})
	}
}

// ─── Map Operations ─────────────────────────────────────────────────

func TestMapOperations(t *testing.T) {
	t.Run("set and get", func(t *testing.T) {
		m := map[string]int{"a": 1}
		got := m["a"]
		if got != 1 {
			t.Errorf("got %d, want 1", got)
		}
	})

	t.Run("has key (comma-ok idiom)", func(t *testing.T) {
		m := map[string]int{"x": 1}
		_, ok := m["x"]
		if !ok {
			t.Error("expected key 'x' to exist")
		}
	})

	t.Run("missing key returns zero value", func(t *testing.T) {
		m := map[string]int{"a": 1}
		got := m["missing"]
		if got != 0 {
			t.Errorf("got %d, want 0", got)
		}
	})

	t.Run("delete key", func(t *testing.T) {
		m := map[string]int{"a": 1, "b": 2}
		delete(m, "a")
		_, ok := m["a"]
		if ok {
			t.Error("expected key 'a' to be deleted")
		}
	})

	t.Run("len", func(t *testing.T) {
		m := map[string]int{"a": 1, "b": 2}
		if len(m) != 2 {
			t.Errorf("got %d, want 2", len(m))
		}
	})

	t.Run("iterate keys", func(t *testing.T) {
		m := map[string]int{"a": 1, "b": 2}
		var keys []string
		for k := range m {
			keys = append(keys, k)
		}
		sort.Strings(keys)
		if keys[0] != "a" || keys[1] != "b" {
			t.Errorf("got %v, want [a b]", keys)
		}
	})
}

// ─── Struct Operations ──────────────────────────────────────────────

type user struct {
	Name  string `json:"name"`
	Email string `json:"email"`
	Age   int    `json:"age"`
}

func TestStructOperations(t *testing.T) {
	t.Run("struct literal", func(t *testing.T) {
		u := user{Name: "Alice", Email: "alice@example.com", Age: 30}
		if u.Name != "Alice" {
			t.Errorf("got %q, want %q", u.Name, "Alice")
		}
	})

	t.Run("struct pointer", func(t *testing.T) {
		u := &user{Name: "Bob"}
		u.Name = "Charlie"
		if u.Name != "Charlie" {
			t.Errorf("got %q, want %q", u.Name, "Charlie")
		}
	})

	t.Run("struct JSON marshal", func(t *testing.T) {
		u := user{Name: "Alice", Email: "alice@example.com", Age: 30}
		data, err := json.Marshal(&u)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}

		var decoded user
		err = json.Unmarshal(data, &decoded)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		if decoded.Name != u.Name || decoded.Email != u.Email || decoded.Age != u.Age {
			t.Errorf("got %+v, want %+v", decoded, u)
		}
	})

	t.Run("struct zero value", func(t *testing.T) {
		var u user
		if u.Name != "" || u.Age != 0 {
			t.Error("expected zero values for uninitialized struct")
		}
	})
}

// ─── Error Handling ──────────────────────────────────────────────────

func TestErrorHandling(t *testing.T) {
	t.Run("errors.New", func(t *testing.T) {
		err := fmt.Errorf("something went wrong")
		if err == nil {
			t.Fatal("expected non-nil error")
		}
		if err.Error() != "something went wrong" {
			t.Errorf("got %q, want %q", err.Error(), "something went wrong")
		}
	})

	t.Run("wrapped error with fmt.Errorf", func(t *testing.T) {
		inner := fmt.Errorf("connection refused")
		wrapped := fmt.Errorf("error calling API: %w", inner)
		if !strings.Contains(wrapped.Error(), "connection refused") {
			t.Error("wrapped error should contain inner message")
		}
		if !strings.Contains(wrapped.Error(), "error calling API") {
			t.Error("wrapped error should contain outer message")
		}
	})

	t.Run("nil error on success", func(t *testing.T) {
		doWork := func() error { return nil }
		err := doWork()
		if err != nil {
			t.Errorf("expected nil error, got %v", err)
		}
	})
}

// ─── File Operations ─────────────────────────────────────────────────

func TestFileOperations(t *testing.T) {
	tmpDir := t.TempDir()

	cases := []struct {
		name      string
		filename  string
		setup     func(string)
		operation func(string)
		assert    func(*testing.T, string)
	}{
		{
			name:     "writes plain text to a new file",
			filename: "hello.txt",
			operation: func(fp string) {
				os.WriteFile(fp, []byte("hello world"), 0644)
			},
			assert: func(t *testing.T, fp string) {
				data, err := os.ReadFile(fp)
				if err != nil {
					t.Fatalf("unexpected error: %v", err)
				}
				if string(data) != "hello world" {
					t.Errorf("got %q, want %q", string(data), "hello world")
				}
			},
		},
		{
			name:     "overwrites existing file content",
			filename: "overwritten.txt",
			setup: func(fp string) {
				os.WriteFile(fp, []byte("original"), 0644)
			},
			operation: func(fp string) {
				os.WriteFile(fp, []byte("replaced"), 0644)
			},
			assert: func(t *testing.T, fp string) {
				data, err := os.ReadFile(fp)
				if err != nil {
					t.Fatalf("unexpected error: %v", err)
				}
				if string(data) != "replaced" {
					t.Errorf("got %q, want %q", string(data), "replaced")
				}
			},
		},
		{
			name:     "writes JSON data",
			filename: "data.json",
			operation: func(fp string) {
				data := map[string]any{
					"users": []map[string]any{
						{"id": 1, "name": "Alice"},
					},
				}
				bytes, _ := json.MarshalIndent(data, "", "  ")
				os.WriteFile(fp, bytes, 0644)
			},
			assert: func(t *testing.T, fp string) {
				data, err := os.ReadFile(fp)
				if err != nil {
					t.Fatalf("unexpected error: %v", err)
				}
				var parsed map[string]any
				err = json.Unmarshal(data, &parsed)
				if err != nil {
					t.Fatalf("unexpected error: %v", err)
				}
				users, ok := parsed["users"].([]any)
				if !ok || len(users) != 1 {
					t.Error("expected one user")
				}
			},
		},
		{
			name:     "writes an empty file",
			filename: "blank.txt",
			operation: func(fp string) {
				os.WriteFile(fp, []byte(""), 0644)
			},
			assert: func(t *testing.T, fp string) {
				info, err := os.Stat(fp)
				if err != nil {
					t.Fatalf("unexpected error: %v", err)
				}
				if info.Size() != 0 {
					t.Errorf("expected empty file, got %d bytes", info.Size())
				}
			},
		},
		{
			name:     "appends to existing content",
			filename: "log.txt",
			setup: func(fp string) {
				os.WriteFile(fp, []byte("line1\n"), 0644)
			},
			operation: func(fp string) {
				f, _ := os.OpenFile(fp, os.O_APPEND|os.O_WRONLY, 0644)
				defer f.Close()
				f.WriteString("line2\n")
			},
			assert: func(t *testing.T, fp string) {
				data, err := os.ReadFile(fp)
				if err != nil {
					t.Fatalf("unexpected error: %v", err)
				}
				if string(data) != "line1\nline2\n" {
					t.Errorf("got %q, want %q", string(data), "line1\nline2\n")
				}
			},
		},
		{
			name:     "writes multiline content",
			filename: "lines.txt",
			operation: func(fp string) {
				var lines []string
				for i := 1; i <= 100; i++ {
					lines = append(lines, fmt.Sprintf("line %d", i))
				}
				os.WriteFile(fp, []byte(strings.Join(lines, "\n")), 0644)
			},
			assert: func(t *testing.T, fp string) {
				data, err := os.ReadFile(fp)
				if err != nil {
					t.Fatalf("unexpected error: %v", err)
				}
				lines := strings.Split(string(data), "\n")
				if len(lines) != 100 {
					t.Errorf("got %d lines, want 100", len(lines))
				}
				if lines[0] != "line 1" {
					t.Errorf("first line: got %q, want %q", lines[0], "line 1")
				}
				if lines[99] != "line 100" {
					t.Errorf("last line: got %q, want %q", lines[99], "line 100")
				}
			},
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			fp := filepath.Join(tmpDir, tc.filename)
			if tc.setup != nil {
				tc.setup(fp)
			}
			tc.operation(fp)
			tc.assert(t, fp)
		})
	}
}
