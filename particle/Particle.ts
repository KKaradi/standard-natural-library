import module from "p5";

class Domain {
  interval: [number, number][];
  constructor(interval: [number, number][]) {
    this.interval = interval;
  }
  in(position: p5.Vector): boolean {
    if (this.interval.length >= 1 && !this.on(position.x, this.interval[0])) {
      return false;
    }
    if (this.interval.length >= 2 && !this.on(position.y, this.interval[1])) {
      return false;
    }
    if (this.interval.length >= 3 && !this.on(position.z, this.interval[2])) {
      return false;
    }
    return true;
  }

  on(x: number, interval: [number, number]): boolean {
    return x >= interval[0] && x <= interval[1];
  }
  limit(position: p5.Vector): void {
    if (this.interval.length >= 1 && !this.on(position.x, this.interval[0])) {
      if (position.x < this.interval[0][0]) {
        position.x = this.interval[0][0];
      }
      if (position.x > this.interval[0][1]) {
        position.x = this.interval[0][1];
      }
    }
    if (this.interval.length >= 2 && !this.on(position.y, this.interval[1])) {
      if (position.y < this.interval[1][0]) {
        position.y = this.interval[1][0];
      }
      if (position.y > this.interval[1][1]) {
        position.y = this.interval[1][1];
      }
    }
    if (this.interval.length >= 3 && !this.on(position.z, this.interval[2])) {
      if (position.z < this.interval[2][0]) {
        position.z = this.interval[2][0];
      }
      if (position.z > this.interval[2][1]) {
        position.z = this.interval[2][1];
      }
    }
  }
  // limit(position: p5.Vector):void{
  //   wrap(position: p5.Vector): void {
  //     if (this.interval.length >= 1 && !this.on(position.x, this.interval[0])) {
  //       if (position.x < this.interval[0][0]) {
  //         position.x = this.interval[0][0];
  //       }
  //       if (position.x > this.interval[0][1]) {
  //         position.x = this.interval[0][1];
  //       }
  //     }
  //     if (this.interval.length >= 2 && !this.on(position.y, this.interval[1])) {
  //       if (position.y < this.interval[1][0]) {
  //         position.y = this.interval[1][0];
  //       }
  //       if (position.y > this.interval[1][1]) {
  //         position.y = this.interval[1][1];
  //       }
  //     }
  //     if (this.interval.length >= 3 && !this.on(position.z, this.interval[2])) {
  //       if (position.z < this.interval[2][0]) {
  //         position.z = this.interval[2][0];
  //       }
  //       if (position.z > this.interval[2][1]) {
  //         position.z = this.interval[2][1];
  //       }
  //     }
  //   }
  // }
}

class Particle {
  position: p5.Vector;
  velocity: p5.Vector;
  acceleration: p5.Vector;
  radius: number;
  doWrap: boolean;
  limit: undefined | number;
  display: (
    position: p5.Vector,
    velocity: p5.Vector,
    acceleration: p5.Vector,
    radius: number
  ) => void;
  color: (
    position?: p5.Vector,
    vevelocity?: p5.Vector,
    acceleration?: p5.Vector
  ) => p5.Color;

  constructor(
    radius: number = 2,
    doWrap: boolean = true,
    limit: number | undefined = undefined
  ) {
    this.position = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.radius = radius;
    this.doWrap = doWrap;
    this.limit = limit;
  }

  setRadius(radius: number) {
    this.radius = radius;
  }

  setDoWrap(doWrap: boolean) {
    this.doWrap = doWrap;
  }

  setLimitVMag(limitVmag: number) {
    this.limit = limitVmag;
  }

  setColor(
    color: (
      position?: p5.Vector,
      vevelocity?: p5.Vector,
      acceleration?: p5.Vector
    ) => p5.Color
  ) {
    this.color = color;
  }

  setDisplay(
    display: (
      position?: p5.Vector,
      velocity?: p5.Vector,
      acceleration?: p5.Vector
    ) => void
  ) {
    this.display = display;
  }

  setPosition(v: p5.Vector) {
    this.position.x = v.x;
    this.position.y = v.y;
  }

  setVelocity(v: p5.Vector) {
    this.velocity.x = v.x;
    this.velocity.y = v.y;
  }

  setAcceleration(v: p5.Vector) {
    this.acceleration.x = v.x;
    this.acceleration.y = v.y;
  }

  applyAcceleration(a: p5.Vector) {
    this.acceleration.add(a);
  }

  update() {
    this.velocity.add(this.acceleration);
    if (this.limit !== undefined) {
      this.velocity.limit(this.limit);
    }
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    if (this.doWrap) {
      this.wrap();
    }
  }

  draw() {
    if (this.color !== undefined) {
      fill(this.color(this.position, this.velocity, this.acceleration));
    }
    if (this.display === undefined) {
      ellipse(
        this.position.x,
        this.position.y,
        2 * this.radius,
        2 * this.radius
      );
    } else {
      this.display(
        this.position,
        this.velocity,
        this.acceleration,
        this.radius
      );
    }
  }

  wrap() {
    if (this.position.x > width) {
      this.position.x = 0;
    }
    if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    }
    if (this.position.y < 0) {
      this.position.y = height;
    }
  }
}
