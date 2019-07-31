#!/usr/bin/env bash
#
# Copyright (c) Microsoft Corporation. All rights reserved.
COMMIT=$1
QUALITY=$2
VSCODE_REMOTE_BIN=$3
SERVER_TAR_FILE_WIN=$4

DOWNLOAD_URL="https://update.code.visualstudio.com/commit:$COMMIT/server-linux-x64/$QUALITY"

download()
{
	local url=$1
	local name=$2
	echo -n "    "
	wget -O "$name" -o /dev/stdout --progress=dot "$url" 2>&1 | grep --line-buffered "%" | \
		sed -u -e "s,\.,,g" | awk '{printf("\b\b\b\b%4s", $2); fflush()}'
	if [ ! -s "$name" ]; then
		echo Failed
		set +e
		wget -O "$name" "$url"
		local rc=$?;
		echo ERROR: Failed to download $url to $name 1>&2
		if [[ $rc == 5 ]]; then 
			echo Please install missing certificates. 1>&2
			echo Debian/Ubuntu:  sudo apt-get install ca-certificates 1>&2
		fi
		exit 13
	fi
	echo -ne "\b\b\b\b"
	echo "100%"
}

# Check if this version is already installed
if [ ! -d "$VSCODE_REMOTE_BIN/$COMMIT" ]; then

	# Check if 
	if [ -f /etc/alpine-release ]; then
		echo "Running the VSCode Server in Alpine WSL is not yet supported."
		exit 11
	fi

	# This version does not exist
	if [ -d "$VSCODE_REMOTE_BIN" ]; then
		echo "Updating VS Code Server to version $COMMIT"

		# Remove the previous installations
		pushd "$VSCODE_REMOTE_BIN" > /dev/null
		echo "Removing previous installation...";
		rm -rf ????????????????????????????????????????
		rm -rf ????????????????????????????????????????-??????????
		rm -rf ????????????????????????????????????????-??????????.tar.gz
		popd > /dev/null

	else
		echo "Installing VS Code Server $COMMIT"
	fi

	mkdir -p "$VSCODE_REMOTE_BIN"

	# test if the server has already been downloaded on the windows side
	if [ "$SERVER_TAR_FILE_WIN" ]; then
		SERVER_TAR_FILE_WSL=$(wslpath -u "$SERVER_TAR_FILE_WIN")
		if [ -f "$SERVER_TAR_FILE_WSL" ]; then
			SERVER_TAR_FILE="$SERVER_TAR_FILE_WSL"
			echo "100%"
		fi
	fi
	if [ ! "$SERVER_TAR_FILE" ]; then
		# Download the .tar.gz file
		SERVER_TAR_FILE="$VSCODE_REMOTE_BIN/$COMMIT-$(date +%s).tar.gz"
		echo -n "Downloading: ";
		download "$DOWNLOAD_URL" "$SERVER_TAR_FILE"
		REMOVE_SERVER_TAR_FILE=true		
	fi

	# Unpack the .tar.gz file to a temporary folder name
	echo -n "Unpacking:   0%";
	TMP_EXTRACT_FOLDER="$VSCODE_REMOTE_BIN/$COMMIT-$(date +%s)"
	mkdir "$TMP_EXTRACT_FOLDER"

	FILE_COUNT=`tar -tf "$SERVER_TAR_FILE" | wc -l`
	P=0;
	tar -xf "$SERVER_TAR_FILE" -C "$TMP_EXTRACT_FOLDER" --strip-components 1 --verbose | { I=1; while read; do I=$((I+1)); PREV_P=$P; P=$((100 * I / FILE_COUNT)); if [ "$PREV_P" -ne "$P" ]; then PRETTY_P="$P%"; printf "\b\b\b\b%4s" $PRETTY_P; fi; done; echo ""; }

	# Remove the .tar.gz file
	if [ $REMOVE_SERVER_TAR_FILE ]; then
		rm "$SERVER_TAR_FILE"
	fi

	# Rename temporary folder to final folder name, retries needed due to WSL
	for i in 1 2 3 4 5; do
		mv "$TMP_EXTRACT_FOLDER" "$VSCODE_REMOTE_BIN/$COMMIT" && break || sleep 2;
	done

	if [ ! -d "$VSCODE_REMOTE_BIN/$COMMIT" ]; then
		echo WARNING: Unable to move $TMP_EXTRACT_FOLDER. Trying copying instead. 1>&2
		cp -r "$TMP_EXTRACT_FOLDER" "$VSCODE_REMOTE_BIN/$COMMIT"
	fi

	if [ ! -d "$VSCODE_REMOTE_BIN/$COMMIT" ]; then
		echo ERROR: Failed create $VSCODE_REMOTE_BIN/$COMMIT. Make sure all VSCode WSL windows are closed and try again. 1>&2
		exit 13
	fi
fi