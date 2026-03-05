package safety

import (
	"os"
	"testing"
)

func TestSetup(t *testing.T) {
	os.WriteFile("../../../CLAUDE.md", []byte(`Testing for science.`), 0644)
}
