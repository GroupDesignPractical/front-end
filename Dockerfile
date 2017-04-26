FROM nginx
ADD . /opt/market-junction

RUN apt-get update \
    && apt-get install -y curl gnupg \
    && curl -sL https://deb.nodesource.com/setup_6.x | bash - \
    && apt-get install -y nodejs node-typescript \
    && cd /opt/market-junction && npm install && npm run build \
    && rm -rf /usr/share/nginx/html && ln -s /opt/market-junction/src /usr/share/nginx/html

EXPOSE 80

CMD ["/opt/market-junction/docker/entrypoint.sh"]
