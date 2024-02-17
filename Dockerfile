FROM python:3.7-alpine3.10

COPY . /opt/assignment

WORKDIR /opt/assignment

RUN pip3 install -r requirements.txt

CMD python3 server.py
