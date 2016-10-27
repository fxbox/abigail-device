#!/bin/sh
# This script is called as a cron job; it runs at midnight every night.
# it update the github repo, runs npm update and reboots
# This script assumes that the 
sudo systemctl stop abigail-device
cd /home/pi/abigail-device
git pull origin master
npm update
echo "rebooting in 5 seconds..."
sleep 5
sudo /sbin/reboot
