// load json 
const coordsData = require('./coordinates.json');
const originCoords = require('./pointOfOrigin.json');

// function to determine the distance of 2 points
const getDistance = (a, b) => {
   
    let x = parseInt(a[0]) - parseInt(b[0]);
    let y = parseInt(a[1]) - parseInt(b[1]);
    return Math.sqrt(x*x + y*y);
}

// function to calculate the distance
const distanceFrom = (originPoint) => {
    // callback function to compare the coordinate to the origin 
    // and store them on a map
    return function(pointA) {
        let distA = getDistance(pointA.value.split(','), originPoint.value.split(','));
        let pts = pointA.value.split(',');
        let str = `(${pts[0]},${pts[1]})`;
        coordsMap[Math.round( distA )] = str;
    }
}

// main driver
const sortCoordinates = (originCoords, coordinates) => {
    // get length
    let len = originCoords.length;

    for(let i = 0; i < len; i++) {
        let distanceFromOrigin = distanceFrom(originCoords[i]);

        // sort coordinates from base from the given origin
        coordinates.sort(distanceFromOrigin);

        console.log("Point of Origin: " + coordinates[i].value);
        // print
        for(let c in coordsMap) {
            console.log(coordsMap[c]);
        }

        // reset
        coordsMap = {};
    }
}

var coordsMap = {};
sortCoordinates(originCoords, coordsData);