#!/bin/bash

# Generate square app icon, from a HQ (svg) source image.
# Run the script from the root of the project.
# Requirements: sudo apt install imagemagick

# LOGO_SOURCE_FILE="public/icons/svg/mlt.logo.orange.svg"
LOGO_SOURCE_FILE="public/icons/svg/mlt.promptopia.logo.favicon.svg"
LOGO_DEST_DIRECTORY="public/icons"

# FAVICON_SOURCE_FILE="public/icons/svg/mlt.favicon.orange.svg"
FAVICON_SOURCE_FILE="public/icons/svg/mlt.promptopia.logo.favicon.svg"
FAVICON_ICO_DEST_DIRECTORY="app/"
FAVICON_SVG_DEST_DIRECTORY="public/"

# Generate app-icons
for res in 192 512; do
  convert -background transparent -resize "${res}x${res}" \
    "$LOGO_SOURCE_FILE" "${LOGO_DEST_DIRECTORY}/app-icon-${res}.png"
done

for res in 114 120 144 152 180 57 60 72 76; do
  convert -background transparent -resize "${res}x${res}" \
    "$LOGO_SOURCE_FILE" "${LOGO_DEST_DIRECTORY}/apple-touch-icon-${res}x${res}.png"
done

convert -background transparent "$FAVICON_SOURCE_FILE" -clone 0 -resize "64x64" \
  "${FAVICON_ICO_DEST_DIRECTORY}/favicon.ico"

cp "$FAVICON_SOURCE_FILE" "${FAVICON_SVG_DEST_DIRECTORY}/favicon.svg"

# Inspect the result
#identify ${LOGO_DEST_DIRECTORY}/*
