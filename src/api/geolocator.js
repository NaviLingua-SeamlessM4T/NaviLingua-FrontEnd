/*
To use this class, import it and create an instance of geoLocator. 
Call the locate() method to get the user's location.

import geoLocator from './api/geolocator.js';

const locator = new geoLocator();
locator.locate().then(coords => {
  console.log(`Latitude: ${coords.latitude}, Longitude: ${coords.longitude}`);
}).catch(err => {
  console.log('Error:', err);
});

Make sure to replace YOUR_ACCESS_TOKEN with your actual token for the IP geolocation service,
and adjust the fallback coordinates (xx.xxxx, yy.yyyy) accordingly.
*/

class geoLocator {
  constructor() {
    this.coords = null;
    this.spoof = false;
    this.options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
  }

  // Browser-based geolocation
  async getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            this.coords = pos.coords;
            resolve(pos.coords);
          },
          (err) => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
            reject(err);
          },
          this.options
        );
      } else {
        reject(new Error("Geolocation API not supported"));
      }
    });
  }

  // IP-based geolocation
  async getIPGeolocation() {
    return fetch('https://ipinfo.io/json?token=YOUR_ACCESS_TOKEN')
      .then((response) => response.json())
      .then((data) => {
        const [latitude, longitude] = data.loc.split(",");
        this.coords = { latitude, longitude };
        return this.coords;
      })
      .catch((err) => {
        console.warn(`ERROR: ${err.message}`);
        throw err;
      });
  }

  // Fallback location
  setFallbackLocation() {
    this.coords = { latitude: xx.xxxx, longitude: yy.yyyy };
    this.spoof = true;
  }

  async locate() {
    try {
      const position = await this.getCurrentPosition();
      return position;
    } catch (err) {
      try {
        const ipPosition = await this.getIPGeolocation();
        return ipPosition;
      } catch (err) {
        this.setFallbackLocation();
        return this.coords;
      }
    }
  }
}

export default geoLocator;
