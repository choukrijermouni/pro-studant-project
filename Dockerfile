FROM nginx:alpine
COPY ./dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 5000

CMD ["/bin/sh", "-c",  "echo 's/api.pro_boa.net/'\"${API_URL}\"'/g' && sed -i -e 's/api.pro_boa.net/'\"${API_URL}\"'/g' /usr/share/nginx/html/index.html && nginx -g \"daemon off;\""]