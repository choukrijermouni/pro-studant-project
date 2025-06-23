docker rm $(docker stop $(docker ps -a -q --filter ancestor=pro_boa:latest --format="{{.ID}}"))
docker system prune -f
docker build . -t pro_boa:latest
 docker run -e API_URL=api.pro_boa.info  -p 5000:5000 pro_boa:latest