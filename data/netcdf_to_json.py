from netCDF4 import Dataset
import json
import numpy as np
import os

def getfilename(name):
    return os.path.join(os.path.dirname(__file__), name)


if __name__ == "__main__":
    data = []

    with Dataset(getfilename("sdei.nc"), "r") as dataset:
        # Dataset is too large. Only convert a subset
        for lat in dataset.variables['lat'][::100]:
            for lon in dataset.variables['lon'][::100]:
                pm = dataset.variables['GWRPM25'][lat, lon].item()
                if np.isfinite(pm):
                    data.append({'lat': lat, 'lon': lon, 'pm': pm})


    with open(getfilename("sdei.json"), 'w') as output:
        json.dump(data, output)


