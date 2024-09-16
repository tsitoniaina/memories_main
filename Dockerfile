FROM archlinux:latest

# Install dependencies
RUN pacman -Sy --noconfirm wget lighttpd rsync   

WORKDIR /

ENV NODE_VERSION=20.15.1
# Use the ARG for the Node version to download and install Node
RUN wget --quiet https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz \
    && tar xf node-v${NODE_VERSION}-linux-x64.tar.xz \
    && rm node-v${NODE_VERSION}-linux-x64.tar.xz

ENV PATH="/node-v${NODE_VERSION}-linux-x64/bin:${PATH}"
RUN npm install typescript ts-node --save --global
RUN npm install -g pnpm
#ENV PATH="/node_modules/.bin:${PATH}"

ADD ./code /code/
ADD ./env.local.dev /code/apps/isomorphic-starter/.env.local

WORKDIR /code
RUN pnpm install
RUN pnpm run starter:build

ADD ./entrypoint.sh /entrypoint.sh
RUN chmod 755  /entrypoint.sh
EXPOSE 3002
ENTRYPOINT ["/entrypoint.sh"]
