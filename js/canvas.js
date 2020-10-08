var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var max_radius = 60;

var mouse = {
    x: undefined,
    y: undefined
}

var color = [
    '#2C3E50', 
    '#E74C3C', 
    '#ECF0F1', 
    '#3498DB', 
    '#2980B9'];

window.addEventListener('mousemove',
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
        //console.log(event);
    }
)

window.addEventListener('resize',
    function()
    {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        init();
    }
)

function Circle(x, y, radius, dx, dy, colour)
{
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.colour = colour;
    this.min_radius = radius;

    this.draw = function()
    {
        c.beginPath();
        c.arc(this.x , this.y, this.radius, 0, 2*Math.PI, 1);
        c.strokeStyle= color;
        c.stroke();
        c.fillStyle = colour;
        c.fill();
    }

    this.update = function()
    {
        if(this.x+this.radius+this.dx >= innerWidth || this.x - this.radius <= 0)
        {
            this.dx = -this.dx;
        }
        if(this.y+this.radius >= innerHeight || this.y - this.radius <= 0)
        {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        if((((mouse.x - this.x) <= 50) && ((mouse.x - this.x) >= -50)) && (((mouse.y - this.y) <= 50) && ((mouse.y - this.y) >= -50)))
        {
            if(this.radius < max_radius) this.radius++;
        }
        else{
            if(this.radius > this.min_radius) this.radius--;
        }
        this.draw();
    }
}

var bubble_n = 2000;
var bubble = [];
function init()
{
    bubble = [];

    for( var i =0; i < bubble_n; i++)
    {
        var radius= Math.random()*3 + 1,
        x=Math.random() * (innerWidth - 2*radius) + radius,
        y= Math.random() * (innerHeight - 2*radius) + radius,
        dx = (Math.random() - 0.5),
        dy = (Math.random() - 0.5),
        colour = color[Math.floor(Math.random() * 5)];;
        bubble.push(new Circle(x, y, radius, dx, dy, colour));
    }
}
init();
function animate()
{
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    c.font = '100px Helvetica';
    c.fillStyle = 'Black';
    c.textAlign = 'centre';
    c.fillText('Sourav', canvas.width/3 - canvas.width/30, canvas.height/3);
    for( var i =0; i < bubble_n; i++)
    {
        bubble[i].update();
    }
    c.font = '100px Helvetica';
    c.fillStyle = 'purple';
    c.textAlign = 'centre';
    c.fillText('Behura', canvas.width/3 + 10, canvas.height/3 + 80);
}

animate();

