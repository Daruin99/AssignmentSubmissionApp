FROM node:21-alpine
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY . .
# install node modules and build assets


RUN npm install

CMD ["npm", "start"]
