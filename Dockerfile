FROM shipimg/appbase:latest

ADD . /home/microbe
RUN mkdir -p /home/microbe/logs
RUN cd /home/microbe && npm install

ENTRYPOINT ["/home/microbe/boot_microbe.sh"]
