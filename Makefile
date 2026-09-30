ping:
	ansible all -i inventory.ini -u root -m ping

uptime:
	ansible all -i inventory.ini -u root -a 'uptime'

pkgs:
	ansible-playbook playbook-vm-1.3.yml -i inventory.ini -t packages

groups:
	ansible-playbook playbook-vm-1.3.yml -i inventory.ini -t groups

users:
	ansible-playbook playbook-vm-1.3.yml -i inventory.ini -t users

handlers:
	ansible-playbook playbook-vm-1.4.yml -i inventory.ini