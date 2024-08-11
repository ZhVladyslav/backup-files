package utils

import (
	"errors"
	"os"
)

func CheckFileExists(filePath string) bool {
	info, error := os.Stat(filePath)

	//return !os.IsNotExist(err)

	if errors.Is(error, os.ErrNotExist) {
		return false
	}

	if info.IsDir() {
		return false
	}

	return true
}
