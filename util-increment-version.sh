#!/bin/sh
# @desc Increment version number
# @changed 2020.05.27, 22:54

VERSION_FILE="build-version.txt"
BACKUP="$VERSION_FILE.bak"

echo "Version: `cat $VERSION_FILE`"

# Extract patch number
PATCH_NUMBER=`cat "$VERSION_FILE" | sed "s/^\(.*\)\.\([0-9]\+\)$/\2/"`

if [ "$PATCH_NUMBER" == "" ]; then
  echo "No patch number found!"
  exit 1
fi

# Increment patch number
NEXT_PATCH_NUMBER=`expr $PATCH_NUMBER + 1`

echo "Increment patch number ($PATCH_NUMBER -> $NEXT_PATCH_NUMBER)" \
  && cp "$VERSION_FILE" "$BACKUP" \
  && cat "$BACKUP" \
    | sed "s/^\(.*\)\.\([0-9]\+\)$/\1.$NEXT_PATCH_NUMBER/" \
    > "$VERSION_FILE" \
  && rm "$BACKUP" \
  && echo "Updated version: `cat $VERSION_FILE`" \
  && sh "util-update-build-props.sh"
