test:
	cd src && yarn run jest

clean:
	rm -rf _build

build: clean
	mkdir _build
	cp src/index.js _build/
	cp src/dispatcher.js _build/
	cp src/slack.js _build/
	npm install --prefix=_build @slack/client

deploy: test build
	cd terraform && terraform plan
	cd terraform && terraform apply
