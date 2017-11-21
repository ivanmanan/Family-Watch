#!/bin/sh

mkdir testing && cd testing && sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout police.key -out police.crt && cd ..