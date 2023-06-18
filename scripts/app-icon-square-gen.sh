#!/bin/bash

# Generate square app icon, from a HQ (svg) source image.
# Run the script from the root of the project.
# Requirements: sudo apt install imagemagick

SOURCE_FILE="public/images/mlt/svg/mlt.logo.svg"
DEST_DIRECTORY="public/icons"

# Generate app-icons
for res in 192 512; do
  convert -background transparent -resize "${res}x${res}" \
    "$SOURCE_FILE" "${DEST_DIRECTORY}/app-icon-${res}.png"
done

for res in 114 120 144 152 180 57 60 72 76; do
  convert -background transparent -resize "${res}x${res}" \
    "$SOURCE_FILE" "${DEST_DIRECTORY}/apple-touch-icon-${res}x${res}.png"
done

# Inspect the result
identify ${DEST_DIRECTORY}/*
