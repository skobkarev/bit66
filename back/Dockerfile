FROM openjdk:17
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} back.jar
ENTRYPOINT ["java", "-jar", "/back.jar"]