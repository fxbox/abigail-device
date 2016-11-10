# abigail-device [![Build Status](https://travis-ci.org/project-abigail/abigail-device.svg?branch=master)](https://travis-ci.or    g/project-abigail/abigail-device)

Abigail client
--------------

This is the application that runs on the device for Mozilla's Connected Devices Abigail project

Prerequisites
-----------
In order to run this software, you need to have a number of packages,
including node and a custom version of pocketsphinx installed. There
is a script in the repo that will install and build the software you
need on a Raspberry Pi.

- Linux or OSX based system
- nodejs >= 4.2.x
- Abigail voice server [voice server](https://github.com/project-abigail/voice-server)

Installation
-----------
Before starting to install this software, it might is good idea to
make sure your system is up to date. On a Raspberry Pi, you can do
that with these commands:

```
$ sudo apt-get update
$ sudo apt-get dist-upgrade
$ sudo reboot
```

First, clone this repo:

```
$ git clone https://github.com/project-abigail/abigail-device
```

Before you can use the code in the repo, you must install the software
it requires. On Raspberry Pi, some of this software needs to be built
from source, and this can take an hour or more. Running the following
script should download and install all of the software you
need.

```
$ abigail-device/bootstrap-scripts/raspberry-pi-setup.sh
```

Now that you have the system prerequsites installed, you can install
the direct dependencies for this repo.

```
$ cd abigail-device
$ npm install
```

Note that the `npm install` step will fail if you have not first
installed the prerequsites.



Starting and Stopping Abigail Device
------------------------------------
Make sure that the i2c interface is enabled in your Raspberry Pi installation.
1.  |sudo raspi-config|
2.  Advanced Options
3.  Select I2C to Enable the automatic loading of I2C
4.  Exit raspi-config


Before running the client, rename the config.json.tpl to config.json
and modify the IP of the server to an instance of the abigail voice-server.

To run the client once, just to try it out:

```
$ sudo node index.js
```

Stop it just by typing Ctrl-C

The bootstrap script configures the system so that the client can be managed
with systemd. You can start and stop the client with
these commands:

```
$ sudo systemctl start abigail-device
$ sudo systemctl stop abigail-device
```

If you start the client this way, the program output is logged. You can
view the logs with:

```
$ sudo journalctl -b -u abigail-device
```

If you want the client to run automatically every time the system boots,
use this command to enable the service:

```
$ sudo systemctl enable abigail-device
```

Instead of enabling the Abigail client directly, however, you may prefer to run it
after the device obtains a working wifi connection. If so, see
the abigail-wifi setup repo at https://github.com/project-abigail/wifi-setup

