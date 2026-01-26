# Makefile for SayRight

# Variables
GIT_MSG ?= feat: build

.PHONY: build deploy

# Default target
build:
	@echo "Committing and pushing changes..."
	git add .
	git commit -m "$(GIT_MSG)" || echo "Nothing to commit"
	git push origin main
