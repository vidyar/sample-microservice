# Microbe
David G  
This is a template microservice example.

## Instructions
git clone repo  
cd into folder  
run onebox.sh.  
go to localhost:61590

## Dependencies
(note: not a comprehensive list)  
- Ubuntu
- Docker
- Node js
- npm

## About
Builds a docker container and runs a microservice that can be accessed via localhost:61590  
MicroService.js and Server.js should be left untouched if possible.  
There should be an entry point to start the service at workers/{svcName}.js  
Add monitors in the monitor folder for dependencies you wish to check and add them to the list in Monitors.js  
Add routes you want the microservice to listen to in Routes.js  
Put processes and tasks you want the microservice to complete in the workers folder.
You can look at logs with docker logs --tail=100 -f microbe
