# Tells Docker to use the Node.js 16.15-alpine image as the base image for the container.
FROM node:16.15-alpine

# Tells Docker to run the container as the node user.
USER node

# creates a directory named /home/node/app in the container.
RUN mkdir -p /home/node/app

# sets the working directory to /home/node/app in the container.
WORKDIR /home/node/app

# copies the contents of the current directory into the working directory of the container.
COPY --chown=node . .

# installs the Node.js dependencies listed in the package.json file in the container.
RUN yarn install

# Creates a "dist" folder with the production build of the application in the container.
RUN yarn build

# starts the server using the production build of the application in the container.
CMD [ "yarn", "start:dev" ]