import geocoder
import os
import time
import subprocess
import urllib.request

# Input the name of the location
city = input('Place Name: ')

# Geocoder to get the coordinates of the location
g = geocoder.osm(city)
lat, lng = g.latlng

# Define a small bounding box around the coordinates
delta = 0.01  # Bounding box size, adjust as needed
bbox = f'{lng - delta},{lat - delta},{lng + delta},{lat + delta}'
coordinates_url = f'https://api.openstreetmap.org/api/0.6/map?bbox={bbox}'

print('Beginning file download using wget...')
print('Downloading the file from: ' + coordinates_url)

# Define the file paths
osm_file_path = '/home/vatsal/Projects/KSPHackathon/SUMO-TraCI_OSM-master/map.osm'

# Downloading the OSM file using wget
os.system(f'wget -O {osm_file_path} "{coordinates_url}"')

print('OSM File Downloaded!')

# Use CMD commands to convert the OSM file to Network File
os.system(f'netconvert --osm-files {osm_file_path} -o {os.path.splitext(osm_file_path)[0]}.net.xml')

# Used CMD commands to generate Random trips
os.system(f'/home/vatsal/Projects/KSPHackathon/SUMO-TraCI_OSM-master/randomTrips.py -n {os.path.splitext(osm_file_path)[0]}.net.xml -r {os.path.splitext(osm_file_path)[0]}.rou.xml -e 500 -l')

# Traci is used to run SUMO-GUI and simulate the Traffic Model
sumoBinary = "sumo-gui"
sumoCmd = [sumoBinary, "-c", f"{os.path.splitext(osm_file_path)[0]}.sumocfg", '--time-to-teleport', '200']

import traci
traci.start(sumoCmd)

step = 0
while step < 500:
    traci.simulationStep()
    # print(traci.vehicle.getCO2Emission)
    step += 1
    time.sleep(0.01)

traci.close()
print('Done!')