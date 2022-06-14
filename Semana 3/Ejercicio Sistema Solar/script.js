/**
 * Constants
 */
const TWO_PI = Math.PI * 2;
const ALLOWED_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const settings = {
  spawnMass: 25,
  pauseWhileAiming: false,
  amountOfPredictions: 200 };



class Application {

  constructor() {
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.center = {
      x: this.width / 2,
      y: this.height / 2 };


    this.solarSystem = new SolarSystem();
    this.planetLauncher = new PlanetLauncher(this.canvas, this.solarSystem);

    window.addEventListener('resize', () => this.resizeCanvas(), false);
  }

  resizeCanvas() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.center = {
      x: this.width / 2,
      y: this.height / 2 };


    this.reset();
  }

  update() {
    if (settings.pauseWhileAiming === false) {
      this.solarSystem.update();
    } else if (settings.pauseWhileAiming === true && this.planetLauncher.isMouseDown === false) {
      this.solarSystem.update();
    }

    this.planetLauncher.update();
  }


  render() {
    this.context.clearRect(0, 0, this.width, this.height);

    this.solarSystem.render(this.context);
    this.planetLauncher.render(this.context);
  }

  loop() {
    this.update();
    this.render();

    window.requestAnimationFrame(() => this.loop());
  }

  reset() {
    this.solarSystem.planets = [];
    this.solarSystem.initializePlanets(this.center);
  }}



class SolarSystem {
  constructor() {
    this.planets = [];
  }

  initializePlanets(center) {
    this.planets.push(new Planet(center.x, center.y, 0, 0, 200));
    this.planets.push(new Planet(center.x, center.y - 150, 1.1, 0, 25));
    this.planets.push(new Planet(center.x + 70, center.y - 90, 1.45, Math.PI, 25));
    this.planets.push(new Planet(center.x - 180, center.y + 160, 1, Math.PI / 1.4, 25));
    this.planets.push(new Planet(center.x - 150, center.y + 100, 1.1, Math.PI * 2.4, 75));
  }


  update() {
    
    let destroyedPlanets = [];

    for (let i = 0; i < this.planets.length; i++) {
      if (SolarSystem.collidesWithAnotherPlanet(this.planets[i], this.planets) === true) {
        destroyedPlanets.push(i);
        continue;
      }

      let gravitationalPull = SolarSystem.gravitationalPullFromOtherPlanets(this.planets[i], this.planets);

      this.planets[i].accelerate(gravitationalPull);
      this.planets[i].update();
    }

    for (let i = 0; i < destroyedPlanets.length; i++) {
      this.planets.splice(destroyedPlanets[i], 1);
    }
  }


  render(context) {
    for (let i = 0; i < this.planets.length; i++) {
      this.planets[i].render(context);
    }
  }


  static collidesWithAnotherPlanet(planet, planets) {
    for (let i = 0; i < planets.length; i++) {
      if (planet.name === planets[i].name) {
        continue;
      }

      if (planets[i].mass <= planet.mass) {
        continue;
      }
      if (SolarSystem.hasCollisionBetween(planet, planets[i])) {
        return true;
      }
    }

    return false;
  }

  static gravitationalPullFromOtherPlanets(planet, planets) {
    let totalGravitationalPull = new Vector2D(0, 0);

    for (let i = 0; i < planets.length; i++) {
     
      if (planet.name === planets[i].name) {
        continue;
      }

      
      if (planets[i].mass <= planet.mass) {
        continue;
      }

      totalGravitationalPull.addTo(SolarSystem.gravitationalPull(planet, planets[i]));
    }

    return totalGravitationalPull;
  }

  static hasCollisionBetween(currentPlanet, otherPlanet) {
    let distanceTo = SolarSystem.distanceBetween(currentPlanet, otherPlanet);
    return distanceTo <= otherPlanet.radius + currentPlanet.radius;
  }

  static gravitationalPull(currentPlanet, otherPlanet) {
    let angle = SolarSystem.angleBetween(currentPlanet, otherPlanet);
    let distanceTo = SolarSystem.distanceBetween(currentPlanet, otherPlanet);

    let gravity = new Vector2D(0, 0);
    gravity.setLength(otherPlanet.mass / (distanceTo * distanceTo));
    gravity.setAngle(angle);

    return gravity;
  }

  static distanceBetween(currentPlanet, otherPlanet) {
    let dx = otherPlanet.position.getX() - currentPlanet.position.getX();
    let dy = otherPlanet.position.getY() - currentPlanet.position.getY();

    return Math.sqrt(dx * dx + dy * dy);
  }

  static angleBetween(currentPlanet, otherPlanet) {
    let dx = otherPlanet.position.getX() - currentPlanet.position.getX();
    let dy = otherPlanet.position.getY() - currentPlanet.position.getY();

    return Math.atan2(dy, dx);
  }}


class Planet {

  constructor(x, y, speed, direction, mass) {
    this.name = Utils.randomString(10);
    this.position = new Vector2D(x, y);
    this.velocity = new Vector2D(0, 0);
    this.velocity.setLength(speed);
    this.velocity.setAngle(direction);
    this.mass = mass;

    this.radius = mass / 5;
    this.sunlitRadius = mass / 6;
    this.radialDifference = this.radius - this.sunlitRadius;
    this.color = Utils.getRandomInt(0, 360);
  }

  update() {
    this.position.addTo(this.velocity);
  }


  render(context) {

    context.fillStyle = 'hsla(' + this.color + ', 70%, 51%, 1)';
    context.beginPath();
    context.arc(this.position.getX(), this.position.getY(), this.radius, 0, TWO_PI);
    context.fill();


    context.fillStyle = 'hsla(' + this.color + ', 100%, 63%, 1)';
    context.beginPath();
    context.arc(this.position.getX() - this.radialDifference / 2, this.position.getY() - this.radialDifference / 2, this.sunlitRadius, 0, TWO_PI);
    context.fill();
  }

  accelerate(acceleration) {
    this.velocity.addTo(acceleration);
  }}


class PlanetLauncher {
  constructor(canvas, solarSystem) {
    this.solarSystem = solarSystem;

    this.mousePosition = {
      x: -100,
      y: -100 };

    this.isMouseDown = false;
    this.mouseDownPosition = null;
    this.pathLocations = [];

    window.addEventListener('mousemove', e => this.mouseMove(e), false);
    canvas.addEventListener('mousedown', e => this.mouseDown(e), false);
    canvas.addEventListener('mouseup', e => this.mouseUp(e), false);
    canvas.addEventListener("touchstart", e => this.touchStart(e), false);
    canvas.addEventListener("touchend", e => this.touchEnd(e), false);
    canvas.addEventListener("touchmove", e => this.touchMove(e), false);
  }

  update() {
    if (this.isMouseDown === false) {
      return;
    }

    this.pathLocations = [];

    let dx = this.mouseDownPosition.x - this.mousePosition.x;
    let dy = this.mouseDownPosition.y - this.mousePosition.y;

    this.solarSystem.planets.push(new Planet(
    this.mouseDownPosition.x,
    this.mouseDownPosition.y,
    Math.sqrt(dx * dx + dy * dy) / 100,
    Math.atan2(dy, dx),
    settings.spawnMass));


    let positions = [];
    let velocities = [];

    for (let i = 0; i < this.solarSystem.planets.length; i++) {
      positions[i] = this.solarSystem.planets[i].position.add(new Vector2D(0, 0));
      velocities[i] = this.solarSystem.planets[i].velocity.add(new Vector2D(0, 0));
    }

   
    let destroyedPlanets = [];

 
    for (let c = 0; c < settings.amountOfPredictions; c++) {
      for (let i = 0; i < this.solarSystem.planets.length; i++) {
        if (typeof this.pathLocations[i] === 'undefined') {
          this.pathLocations[i] = [];
        }

        if (destroyedPlanets.indexOf(i) !== -1) {
          continue;
        }

        if (SolarSystem.collidesWithAnotherPlanet(this.solarSystem.planets[i], this.solarSystem.planets) === true) {
          destroyedPlanets.push(i);
          continue;
        }

        let gravitationalPull = SolarSystem.gravitationalPullFromOtherPlanets(this.solarSystem.planets[i], this.solarSystem.planets);

        this.solarSystem.planets[i].accelerate(gravitationalPull);
        this.solarSystem.planets[i].update();

        this.pathLocations[i].push({ x: this.solarSystem.planets[i].position.getX(), y: this.solarSystem.planets[i].position.getY(), color: this.solarSystem.planets[i].color });
      }
    }

    for (let i = 0; i < this.solarSystem.planets.length; i++) {
      this.solarSystem.planets[i].position = positions[i];
      this.solarSystem.planets[i].velocity = velocities[i];
    }


    this.solarSystem.planets.splice(this.solarSystem.planets.length - 1, 1);
  }


  render(context) {
    if (this.isMouseDown == false) {
      context.strokeStyle = 'hsla(0, 100%, 100%, 0.5)';
      context.beginPath();
      context.arc(this.mousePosition.x, this.mousePosition.y, settings.spawnMass / 5, 0, TWO_PI);
      context.stroke();
    } else {
      context.strokeStyle = 'hsla(0, 100%, 100%, 1)';
      context.beginPath();
      context.arc(this.mouseDownPosition.x, this.mouseDownPosition.y, settings.spawnMass / 5, 0, TWO_PI);
      context.stroke();

      context.beginPath();
      context.moveTo(this.mousePosition.x, this.mousePosition.y);
      context.lineTo(this.mouseDownPosition.x, this.mouseDownPosition.y);
      context.closePath();
      context.stroke();

      for (let i = 0; i < this.pathLocations.length; i++) {
        for (let j = 1; j < this.pathLocations[i].length; j += 1) {
          if (i === this.pathLocations.length - 1) {
            context.strokeStyle = 'hsla(0, 100%, 100%, 0.5)';
            context.lineWidth = 3;
          } else {
            context.strokeStyle = 'hsla(' + this.pathLocations[i][j].color + ', 100%, 63%, 0.2)';
            context.lineWidth = 1;
          }

          context.beginPath();
          context.moveTo(this.pathLocations[i][j - 1].x, this.pathLocations[i][j - 1].y);
          context.lineTo(this.pathLocations[i][j].x, this.pathLocations[i][j].y);
          context.closePath();
          context.stroke();
        }

        if (this.pathLocations[i].length < settings.amountOfPredictions && this.pathLocations[i].length > 0) {
          context.beginPath();
          context.moveTo(this.pathLocations[i][this.pathLocations[i].length - 1].x - 5, this.pathLocations[i][this.pathLocations[i].length - 1].y - 5);
          context.lineTo(this.pathLocations[i][this.pathLocations[i].length - 1].x + 5, this.pathLocations[i][this.pathLocations[i].length - 1].y + 5);
          context.closePath();
          context.stroke();

          context.beginPath();
          context.moveTo(this.pathLocations[i][this.pathLocations[i].length - 1].x + 5, this.pathLocations[i][this.pathLocations[i].length - 1].y - 5);
          context.lineTo(this.pathLocations[i][this.pathLocations[i].length - 1].x - 5, this.pathLocations[i][this.pathLocations[i].length - 1].y + 5);
          context.closePath();
          context.stroke();
        }
      }
    }
  }

  touchStart(event) {
    
    event.preventDefault();

    if (this.isMouseDown) {
      return;
    }

    this.isMouseDown = true;
    this.mousePosition = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY };

    this.mouseDownPosition = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY };

  }


  touchMove(event) {
    event.preventDefault();

    this.mousePosition = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY };

  }

  mouseMove(event) {
    event.preventDefault();

    this.mousePosition = {
      x: event.clientX,
      y: event.clientY };

  }

  mouseDown(event) {
    event.preventDefault();

    if (this.isMouseDown) {
      return;
    }

    this.isMouseDown = true;
    this.mouseDownPosition = {
      x: event.clientX,
      y: event.clientY };

  }

  mouseUp(event) {
    event.preventDefault();

    this.isMouseDown = false;

    let dx = this.mouseDownPosition.x - this.mousePosition.x;
    let dy = this.mouseDownPosition.y - this.mousePosition.y;

    this.solarSystem.planets.push(new Planet(
    this.mouseDownPosition.x,
    this.mouseDownPosition.y,
    Math.sqrt(dx * dx + dy * dy) / 100,
    Math.atan2(dy, dx),
    settings.spawnMass));

  }


  touchEnd(event) {
    this.isMouseDown = false;


    let dx = this.mouseDownPosition.x - this.mousePosition.x;
    let dy = this.mouseDownPosition.y - this.mousePosition.y;

    this.solarSystem.planets.push(new Planet(
    this.mouseDownPosition.x,
    this.mouseDownPosition.y,
    Math.sqrt(dx * dx + dy * dy) / 100,
    Math.atan2(dy, dx),
    settings.spawnMass));

    this.mousePosition = {
      x: -100,
      y: -100 };

  }}


class Vector2D {

  constructor(x, y) {
    this._x = x;
    this._y = y;
  }


  setX(x) {
    this._x = x;
  }


  setY(y) {
    this._y = y;
  }


  getX() {
    return this._x;
  }


  getY() {
    return this._y;
  }


  setAngle(angle) {
    let length = this.getLength();
    this._x = Math.cos(angle) * length;
    this._y = Math.sin(angle) * length;
  }

  getAngle() {
    return Math.atan2(this._y, this._x);
  }

  setLength(length) {
    let angle = this.getAngle();
    this._x = Math.cos(angle) * length;
    this._y = Math.sin(angle) * length;
  }

  getLength() {
    return Math.sqrt(this._x * this._x + this._y * this._y);
  }

  add(v2) {
    return new Vector2D(this._x + v2.getX(), this._y + v2.getY());
  }


  subtract(v2) {
    return new Vector2D(this._x - v2.getX(), this._y - v2.getY());
  }


  multiply(value) {
    return new Vector2D(this._x * value, this._y * value);
  }


  divide(value) {
    return new Vector2D(this._x / value, this._y / value);
  }


  addTo(v2) {
    this._x += v2.getX();
    this._y += v2.getY();
  }

  subtractFrom(v2) {
    this._x -= v2.getX();
    this._y -= v2.getY();
  }


  multiplyBy(value) {
    this._x *= value;
    this._y *= value;
  }

  divideBy(value) {
    this._x /= value;
    this._y /= value;
  }}



class Utils {

  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static randomString(length) {
    let text = "";

    for (let i = 0; i < length; i++) {
      text += ALLOWED_CHARACTERS.charAt(Math.floor(Math.random() * ALLOWED_CHARACTERS.length));
    }

    return text;
  }}



window.onload = function () {

  const application = new Application();

  application.solarSystem.initializePlanets(application.center);

  application.loop();
};