#!/bin/bash
export DEV_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -n1)
echo "Starting development server on http://$DEV_IP:3001"
echo "API endpoint: http://$DEV_IP:3000/api"

# Create .env with actual IP
cat > .env << EOF
REACT_APP_API_URL=http://$DEV_IP:3000/api
PORT=3001
HOST=$DEV_IP
EOF

# Set Node options for OpenSSL legacy provider
export NODE_OPTIONS=--openssl-legacy-provider

react-scripts start