#!/bin/bash

# Navigate to the packages directory
cd packages

# Loop through each directory and run npm publish
for dir in */ ; do
    echo "Publishing $dir..."
    cd "$dir"
    npm publish
    cd ..
done

# chmod +x publish_packages.sh