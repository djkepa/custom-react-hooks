#!/bin/bash

# Define the parent directory where your package folders are located
parent_directory="packages"

# Iterate through subdirectories in the parent directory
for package_directory in "$parent_directory"/*; do
  if [ -d "$package_directory" ]; then
    echo "Publishing package in $package_directory"
    (cd "$package_directory" && npm publish)
    echo "Finished publishing package in $package_directory"
  fi
done

echo "All packages published successfully"