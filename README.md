#Instruction before set-up
- Download Docker Desktop using the link here, (https://www.docker.com/products/docker-desktop/)
- Download React app/node.js using the link here, https://www.docker.com/products/docker-desktop/
- Download DBeaver using the link here, https://dbeaver.io/download/

-Once You have download the necessary applications, download Docker desktop extension in Visual Studio Code

# ims 

## server 
go inside server folder cd docker/
then build the docker image "docker-compose up --build -d"
run npm install
run npm run dev
to start the project run node app.js inside the project root folder
if any issues releated with port not available delete all images in docker and try re-building them using "docker-compose up --build -d"

if faced this error "Error response from daemon: error while creating mount source path '/host_mnt/Users/haresh/Documents/projects/ims/server': mkdir /host_mnt/Users/haresh: permission denied"



## client
run npm install first
npm start to start the project
