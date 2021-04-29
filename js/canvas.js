var canvas = document.querySelector('canvas');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

    var mouse = {
        x: undefined,
        y: undefined
    }

    var maxRadius = 4;
    var minRadius = 2;
    var maxDx = 2;
    var maxDy = 2;

    var colourArray = [
       // '#ffaa33',
       // '#db6aa3',
       // '#2bd879',
       // '#00aeff',
        '#ccc5c5af'
    ]


    window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    })

    window.addEventListener('resize', function()
    {   
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        init();
        
    })

    function Circle(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.maxDx = dx;
        this.maxDy = dy;
        this.colour = colourArray[Math.floor(Math.random() * colourArray.length)];

        this.draw = function() {

            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2,false);
            c.fillStyle = this.colour;
            c.fill();
        }

        this.update = function() {
            if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }
             if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }
            this.x += this.dx;
            this.y += this.dy;
        
           if (mouse.x - this.x < 35 && mouse.x - this.x > -35 && mouse.y - this.y < 35 && mouse.y - this.y > -35) {
               if (this.radius < maxRadius) {
                 this.radius += 0.04;
               }
           } else if (this.radius > minRadius) {
               this.radius -= 0.04;
           }
            this.draw();
        }
    }

         var circleArray = [];

    function init() {

        circleArray = [];
        
         for (var c = 0; c < (innerWidth / 13); c++) {
            var radius = Math.random() * (innerWidth / innerWidth * 0.1) + 1;
            var x = Math.random() * (innerWidth - radius) + radius;
            var y = Math.random() * (innerHeight - radius) + radius;
            var dx = (Math.random() - 0.8) * (innerWidth / 7500);
            var dy = (Math.random() - 0.5) * (innerWidth / 7500);
            circleArray.push(new Circle(x, y, dx, dy, radius));
    }

    }


    function animate() {
        requestAnimationFrame(animate);
            c.clearRect(0, 0, innerWidth, innerHeight);

            for(var i = 0; i < circleArray.length; i++) {
                circleArray[i].update();
            }


    }


    init();
    animate();
