FROM ubuntu:20.04
RUN apt-get update
RUN apt-get install curl gcc g++ make git -y

# Remove before demo
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install nodejs -y
RUN npm install -g npm
RUN npm install -g @angular/cli
# ng serve --host 0.0.0.0 --port 4200
# npm run start


WORKDIR /home/bt-website-update

# docker image build -t bt-website-update .
# docker run -p 4200:4200 -v /Users/brocktubre/Desktop/Projects/bt-website-update:/home/bt-website-update -it bt-website-update
