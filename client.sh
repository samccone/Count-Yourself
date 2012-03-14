#!/bin/bash

# Finds a keyboard device and monitors for ACCESS events
# When access events are fired, an integer is piped through netcat

# CLIENT:
#   Will need su access (or sudo) to monitor the /dev/input/event*
#   Additionally, the inotify-tools package needs to be installed

# SERVER:
#   The "server" should be running "nc -lk <port>"

# TODO Get this working on Apple OS X
# TODO Decode key pressed, and send character combination instead
# TODO Weigh keys distance from the home row and send value along with character
# TODO Record mouse clicks
# TODO Rewrite this key capture as editor specific plugin (ViM, Emacs, Gedit, ST2, etc)

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
