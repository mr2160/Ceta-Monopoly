#!/bin/sh
cd monopoly/
echo "Building angular application."
ng build
echo "Cleaning up the express public directory."
rm -r ../public/*
echo "Copying the results into express public directory."
cp -r dist/monopoly/* ../public/
echo "Done."
exit 0