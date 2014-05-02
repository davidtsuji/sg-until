build:
	@npm install
	@npm test

clean:
	@rm -rf node_modules .tmp

release:
	@make clean
	@make build

.PHONY: build clean release