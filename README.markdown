Overview
=========

Finds a keyboard device and monitors for ACCESS events
When access events are fired, the user's MAC address with a keyboard ACCESS count is piped through `netcat`

CLIENT For Linux:
-----------

Will need su access (or `sudo`) to monitor the `/dev/input/event*`
Additionally, the `inotify-tools` package needs to be installed

    sudo apt-get install inotify-tools

CLIENT For OS X:
-----------

	sudo osx_logger_bin
	
If you need to recompile from the `osx_logger.c` file, compile with the following command

    gcc -Wall -o osx_logger osx_logger.c -framework ApplicationServices

SERVER:
-----------

The "server" should be running `nc -lk <port>`

It will receive an event from a client at most every 5 seconds. If the client does not have any events to report, no message is sent. Otherwise, the format of the message is:

    <MAC address>|<keypress count>

* TODO Get this working on Apple OS X 
	* http://danielbeard.wordpress.com/2010/10/29/listening-for-global-keypresses-in-osx/
* TODO Decode key pressed, and send character combination instead
* TODO Weigh keys distance from the home row and send value along with character
* TODO Record mouse clicks
* TODO Rewrite this key capture as editor specific plugin (ViM, Emacs, Gedit, ST2, etc)
