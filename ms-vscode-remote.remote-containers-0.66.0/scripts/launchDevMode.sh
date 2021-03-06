#!/bin/bash
set -e

export NODE_ENV=development
export VSCODE_DEV=1
export VSCODE_INJECT_NODE_MODULE_LOOKUP_PATH="$VSCODE_AGENT_FOLDER/bin/dev-remote/node_modules"

cd $VSCODE_REPO

if [ -z "$extensions" ] ; then
	echo No extensions to install.
else
	(PATH="$HOME/bin:$PATH" node out/vs/server/main.js ${VSCODE_TELEMETRY_ARG} ${extensions} || true)
fi

PATH="$HOME/bin:$PATH" node out/vs/server/main.js ${VSCODE_TELEMETRY_ARG} --port $PORT
