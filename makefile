MAKEFLAGS += --silent

verify:
	./scripts/verify.sh

build:
	./scripts/build.sh

dev:
	cd example-app && yarn dev

lint:
	cd example-app && yarn lint

acceptance-test:
	./scripts/acceptance-test.sh
