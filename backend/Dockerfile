FROM python:3.10.4
ENV PYTHONUNBUFFERED=1
ENV C_FORCE_ROOT=1
ENV PYTHON_PIP_VERSION=22.0.4
ENV PYTHON_SETUPTOOLS_VERSION=58.1.0
RUN mkdir /src
WORKDIR /src
RUN pip install --upgrade pip
RUN apt-get update --fix-missing
RUN apt-get install -y build-essential libpq-dev git cmake locales gettext netcat gdal-bin
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . /