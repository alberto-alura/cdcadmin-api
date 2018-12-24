FROM maven:3-jdk-8-slim
WORKDIR /var/www
COPY . .
RUN mvn dependency:resolve
RUN mvn package -X
CMD [ "java", "-jar", "target/cdcreact-1.0.0-SNAPSHOT.jar" ]
