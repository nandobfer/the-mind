import json

with open("config.json", "r") as file:
    config = json.load(file)
    
shuriken_bonus = []
health_bonus = []
for level in config['level']['rewards']:
    
    if config['level']['rewards'][level] == 'shuriken':
        shuriken_bonus.append(int(level))
        
    elif config['level']['rewards'][level] == 'health':
        health_bonus.append(int(level))