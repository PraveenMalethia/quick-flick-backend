#!/bin/bash

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "🟩${GREEN} Starting The Script ${NC}"

bash pull.sh

echo -e "🟩${GREEN} Building Containers...${NC}"
docker compose up --build -d

echo -e "🟩${GREEN} Deploying Containers...${NC}"

echo -e "🟩${GREEN} Deployment Done.✅${NC}"