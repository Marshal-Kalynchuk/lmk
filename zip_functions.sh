#!/bin/bash

# Define the source and destination directories
FUNCTIONS_DIR="functions"
ARTIFACTS_DIR="infra/artifacts"

# Create the artifacts directory if it doesn't exist
mkdir -p "$ARTIFACTS_DIR"

# Loop through each function directory in the functions directory
for FUNCTION_DIR in "$FUNCTIONS_DIR"/*; do
  if [ -d "$FUNCTION_DIR" ]; then
    # Extract the function name from the path
    FUNCTION_NAME=$(basename "$FUNCTION_DIR")

    # Zip the src directory and package.json, excluding the node_modules folder
    # and place the ZIP in the artifacts directory
    (
      cd "$FUNCTION_DIR"
      zip -r "../$ARTIFACTS_DIR/$FUNCTION_NAME.zip" src -x "src/node_modules*/*"
      zip -g "../$ARTIFACTS_DIR/$FUNCTION_NAME.zip" package.json
    )
    echo "Zipped $FUNCTION_NAME with src and package.json, excluding node_modules"
  fi
done

echo "All functions zipped successfully."
