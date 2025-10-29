ARG NODE_VERSION=18-alpine

#### Base image ####
FROM node:${NODE_VERSION} AS base

WORKDIR /usr/src/app

ENV PATH="${PATH}:/usr/src/app/node_modules/.bin"

ARG USER_ID=1000
ARG USER_NAME=node

RUN chown -R ${USER_NAME}: /usr/src/app

# Note: not working with UTC may cause unwanted side effects!
ENV TZ=Europe/Madrid

#### Builder image ####
FROM base AS builder

RUN apk add --no-cache \
    build-base \
    bash \
    git

#### Development image ####
FROM builder AS development

ENV PROMPT="%B%F{cyan}%n%f@%m:%F{yellow}%~%f %F{%(?.green.red[%?] )}>%f %b"

RUN apk add --no-cache zsh

RUN if [ ${USER_ID} -ne 1000 ]; then \
       apk add --no-cache -t volatile shadow \
       && groupmod -g ${USER_ID} ${USER_NAME} \
       && usermod -u ${USER_ID} -g ${USER_ID} ${USER_NAME} \
       && apk del --purge volatile; \
       fi \
       && chown -R ${USER_NAME}: .

USER ${USER_NAME}

RUN touch /home/${USER_NAME}/.zshrc

#### Installer image ####
FROM builder AS installer

ARG APP_ENV=production

COPY package.json ./
COPY package-lock.json* ./

RUN --mount=type=secret,id=npmrc,target=/usr/src/app/.npmrc,uid=${USER_ID} \
    if [ -f package-lock.json ]; then \
        npm ci; \
    else \
        npm install; \
    fi

COPY . .
RUN npm run build

#### Runtime image ####
FROM base AS runtime

USER ${USER_NAME}

COPY --from=installer --chown=${USER_NAME}:${USER_NAME} /usr/src/app .

EXPOSE 3000

CMD [ "npm", "run", "start" ]
