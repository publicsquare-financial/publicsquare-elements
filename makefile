MAKEFLAGS += --silent

verify:
	./scripts/verify.sh

build:
	./scripts/build.sh

dev:
	cd example-app && bun run dev

lint:
	cd example-app && bun run lint

acceptance-test:
	./scripts/acceptance-test.sh
