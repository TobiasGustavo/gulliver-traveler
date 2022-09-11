window.addEventListener("load",  () => {
  const canvas = document.getElementById("fire-animation");

  const init = (ctx, w, h) => {
    const particleCount = 800;
    let tick = 0;
    let particles = [];
    const random = (min, max) => {
      return Math.random() * (max - min) + min;
    };

    canvas.width = w;
    canvas.height = h;

    const animate = () => {
      tick++;
      ctx.clearRect(0, 0, w, h);

      while (particles.length < particleCount) particles.push(new Particle());

      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();

        if (particles[i].opacity < 0) {
          particles.splice(i, 1);
        }
      }
      requestAnimationFrame(animate);
    }
    class Particle {
      constructor(x, y) {
        this.x = random(0, w);
        this.y = h;
        this.opacity = 1;
        this.life = random(0.01, 0.02);
        this.vx = ~~random(-2, 2);
        this.vy = random(-0.5, -5);
        this.rad = random(5, 60);
        this.hue = random(0, 50);
      }
      draw() {
        this.vx = Math.cos((this.vx * tick) / 20);
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
        this.opacity = this.opacity - this.life;

        let grad = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.rad
        );

        let firstColor = "hsla(" + this.hue + ", 100%, 50%, 0)";
        let secondColor =
          "hsla(" + this.hue + ", 100%, 50%, " + this.opacity / 10 + ")";
        grad.addColorStop(1, firstColor);

        grad.addColorStop(0, secondColor);

        ctx.beginPath();
        ctx.lineWidth = 0.1;
        ctx.fillStyle = grad;
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    animate();
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  init(canvas.getContext("2d"), window.innerWidth, window.innerHeight);

});
