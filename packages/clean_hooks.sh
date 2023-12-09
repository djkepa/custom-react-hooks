#!/bin/bash

# Navigate to the packages directory
cd packages

# Loop through each directory in the packages folder
for d in */ ; do
    echo "Cleaning $d"
    rm -rf "$d/node_modules"     # Remove node_modules
    rm -f "$d/package-lock.json" # Remove package-lock.json
done

# Go back to the root directory
cd ..
