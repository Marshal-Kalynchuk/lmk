#!/bin/bash

# Define the source and destination directories
FUNCTIONS_DIR="functions"
ARTIFACTS_DIR="infra/artifacts"

# Create the artifacts directory if it doesn't exist
mkdir -p "$ARTIFACTS_DIR"

# Loop through each function in the functions directory
for FUNCTION in "$FUNCTIONS_DIR"/*; do
  if [ -d "$FUNCTION" ]; then
    # Extract the function name from the path
    FUNCTION_NAME=$(basename "$FUNCTION")
    
    # Zip the function excluding the node_modules folder and store it in the artifacts directory
    zip -r "$ARTIFACTS_DIR/$FUNCTION_NAME.zip" "$FUNCTION" -x "*node_modules*/*"
    echo "Zipped $FUNCTION_NAME without node_modules"
  fi
done

echo "All functions zipped successfully."
