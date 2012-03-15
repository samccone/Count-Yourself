#!/bin/bash

SERVER="localhost 12345"
OS=`uname`

if [ "$OS" == "Linux" ]; then
  MAC=`ifconfig | grep HWaddr | head -1 | awk '{print $5}'`
  EVENT=`grep -E 'Handlers|EV=' /proc/bus/input/devices | grep -B1 'EV=120013' | grep -Eo 'event[0-9]+' | tail -1`
  KBD=/dev/input/$EVENT
elif [ "$OS" == "Darwin" ]; then
  MAC=`ifconfig | grep 'ether' | head -1 | awk '{print $2}'`
fi

while RES=$(sudo inotifywatch -z -e access -t 5 $KBD); do
  PRESSES=`echo $RES | tail -1 | awk '{print $4}'`
  if [ -n "$PRESSES" ]; then
    echo "${MAC}|${PRESSES}" | nc $SERVER
  fi
done
