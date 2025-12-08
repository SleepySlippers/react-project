ROOT_DIR := $(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))
CONTAINER_TOOL := $(shell command -v podman >/dev/null 2>&1 && echo podman || echo docker)
NODE_IMAGE := "node:24-alpine"

RUN_INSIDE_CONTAINER := $(CONTAINER_TOOL) run --rm -it -v $(ROOT_DIR):/app -w /app -e BROWSER=none -p 3000:3000 $(NODE_IMAGE)

wipe_repo:
	cd $(ROOT_DIR) && \
	TMPDIR=$$(mktemp -d) && \
	echo "Move all into tmp dir (look there if something goes wrong):" && \
	echo $$TMPDIR && \
	mv -v ./Makefile $$TMPDIR/ && \
	mv -v .git $$TMPDIR/ && \
	( [ -z "$$(ls -A)" ] || mv -v $$(ls -A) $$TMPDIR/ ) && \
	[ -z "$$(ls -A)" ] && \
	$(RUN_INSIDE_CONTAINER) npx create-react-app . && \
	mv $$TMPDIR/.git ./ && \
	mv $$TMPDIR/Makefile ./ && \
	echo "Delete previously moved files?" && \
	rm -rIv $$TMPDIR && \
	true

run:
	$(RUN_INSIDE_CONTAINER) npm run start
