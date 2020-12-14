FROM ubuntu:18.04
RUN apt-get update
RUN apt-get install curl gcc g++ make git -y
EXPOSE 4201

# Remove before demo
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install nodejs -y
RUN npm install -g npm
RUN npm install -g @angular/cli
# ng serve --host 0.0.0.0 --port 4201


WORKDIR /home/bt-website-update

# docker image build -t bt-website-update .
# docker run -p 4201:4201 -v /Users/brocktubre/Desktop/Projects/bt-website-update:/home/ -it bt-website-update
