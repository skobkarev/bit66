
cd /Users/aleksandr/IdeaProjects/education/bit66localrepo

docker-compose down


cd back
mvn clean package -Dmaven.test.skip
docker build -t back .
docker tag back skobkarevdocker/back:latest
docker push skobkarevdocker/back:latest
cd ..


cd football
docker build -t football .
docker tag football skobkarevdocker/football:latest
docker push skobkarevdocker/football:latest
cd ..

cd /Users/aleksandr/IdeaProjects/education/back


docker-compose up
