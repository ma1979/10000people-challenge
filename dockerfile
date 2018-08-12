FROM ma1979/nightmare

RUN mkdir /home/couner
WORKDIR /home/counter
RUN npm install vo
RUN npm install electron nightmare
RUN npm install ambient-lib
RUN npm install cron

CMD ["node", "src/counter.js"]