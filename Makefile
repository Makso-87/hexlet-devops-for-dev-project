ping:
	ansible all -i inventory.ini -u root -m ping

uptime:
	ansible all -i inventory.ini -u root -a 'uptime'
