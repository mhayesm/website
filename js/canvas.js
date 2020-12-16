var canvas = document.querySelector('canvas');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

    var mouse = {
        x: undefined,
        y: undefined
    }

    var maxRadius = 8;
    var minRadius = 3;
    var maxDx = 3;
    var maxDy = 3;

    var colourArray = [
        '#ffaa33',
        '#db6aa3',
        '#2bd879',
        '#00aeff'
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
                 this.radius += 0.1;
               }
           } else if (this.radius > minRadius) {
               this.radius -= 0.1;
           }
            this.draw();
        }
    }

         var circleArray = [];

    function init() {

        circleArray = [];
        
         for (var c = 0; c < (innerWidth / 2.9); c++) {
            var radius = Math.random() * (innerWidth / innerWidth * 0.7) + 1;
            var x = Math.random() * (innerWidth - radius) + radius;
            var y = Math.random() * (innerHeight - radius) + radius;
            var dx = (Math.random() - 0.5) * (innerWidth / 850);
            var dy = (Math.random() - 0.5) * (innerWidth / 850);
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
