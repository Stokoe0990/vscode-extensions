#!/usr/bin/env sh
#
# Copyright (c) Microsoft Corporation. All rights reserved.
COMMIT=$1
QUALITY=$2
DATAFOLDER=$3
SERVER_TAR_FILE_WIN=$4
POLLING_INTERVAL=$5

shift 5

case $1 in
	"--inspect"*) INSPECT=$1; set -x; shift ;;
esac

if [ ! -d "$HOME/$DATAFOLDER" ]; then
	if [ -d "$HOME/.vscode-remote" ]; then
		echo "Migrating .vscode-remote to $DATAFOLDER..."
		mv "$HOME/.vscode-remote" "$HOME/$DATAFOLDER"
	fi
fi

VSCODE_REMOTE_BIN="$HOME/$DATAFOLDER/bin"
WSL_VERSION=$(uname -r)

echo "WSL version: $WSL_VERSION $WSL_DISTRO_NAME"

echo "Updating server..."
"$(dirname "$0")/wslDownload.sh" "$COMMIT" "$QUALITY" "$VSCODE_REMOTE_BIN" "$SERVER_TAR_FILE_WIN"
RC=$?;
if [ $RC -ne 0 ]; then 
	exit $RC
fi

SERVER_ARGS=""
case "$WSL_VERSION" in
	*Microsoft)
	SERVER_ARGS="--fileWatcherPolling=$POLLING_INTERVAL" ;;
	*microsoft-standard)
	SERVER_ARGS="--enable-remote-auto-shutdown" ;;
esac

echo "Starting server: $VSCODE_REMOTE_BIN/$COMMIT/server.sh ${INSPECT:-} --port=0 $SERVER_ARGS $*"
export VSCODE_AGENT_FOLDER="$HOME/$DATAFOLDER"
"$VSCODE_REMOTE_BIN/$COMMIT/server.sh" "${INSPECT:-}" --port=0 "$SERVER_ARGS" "$@"