FROM node:16.14.2 as build
WORKDIR /code

COPY ./.npmrc .
COPY ./package.json .
COPY ./package-lock.json .

RUN npm ci
RUN npm install sass

COPY . .
RUN npm run build

FROM node:16.14.2-slim as app
WORKDIR /app

RUN apt-get update \
    && apt-get install -y \
    curl \
    netcat \
    nginx-extras \
    python \
    python-pip \
    python-setuptools \
    unzip 
RUN pip install supervisor

COPY scripts/entrypoint.sh ./scripts/entrypoint.sh
COPY nginx/*.conf /etc/nginx

COPY --from=build /code/.output/ ./.output/
COPY --from=build /code/.nuxt/ ./.nuxt/
COPY --from=build /code/node_modules/ ./node_modules/
COPY --from=build /code/package.json .

ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 80
ENTRYPOINT ["./scripts/entrypoint.sh" ]
