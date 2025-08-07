MAKEFLAGS += --silent
format:
	./scripts/format.sh

verify:
	./scripts/verify.sh

build:
	./scripts/build.sh

dev:
	cd example-app && yarn dev

lint:
	cd example-app && yarn lint

release:
	./scripts/release.sh

release-cdn:
	./scripts/release-cdn.sh

acceptance-test:
	./scripts/acceptance-test.sh