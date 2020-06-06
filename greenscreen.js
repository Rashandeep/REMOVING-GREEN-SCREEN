var fimage=null;
var bimage=null;
var can=document.getElementById("can");
var can1=document.getElementById("can1");

function loadforegroundimage(){
  var ffile=document.getElementById("ffile");
  fimage= new SimpleImage(ffile);
  fimage.drawTo(can);
}

function loadbackgroundimage(){
  var bfile=document.getElementById("bfile");
  bimage= new SimpleImage(bfile);
  bimage.drawTo(can1);
}

function clearcanvas(){
  var ctx=can.getContext("2d");
  var ctx1=can1.getContext("2d");
  ctx.clearRect(0,0,can.width,can.height);
  ctx1.clearRect(0,0,can1.width,can1.height);
}

function dogreenscreen(){
  if(fimage==null || !fimage.complete()){
    alert("foreground image not loaded");
    return;
  }
  if(bimage==null || !bimage.complete()){
    alert("background image not loaded");
    return;
  }
  
    var ctx=can.getContext("2d");
    var ctx1=can1.getContext("2d");
  var output = new SimpleImage(fimage.getWidth() ,fimage.getHeight());
if(fimage.getWidth()==bimage.getWidth() && fimage.getHeight()==bimage.getHeight()){
for ( var pixel of fimage.values() ){
    if( pixel.getGreen() > pixel.getRed() + pixel.getBlue() ){
        var x = pixel.getX();
        var y = pixel.getY();
        var bgpixel = bimage.getPixel(x,y);
        output.setPixel(x, y, bgpixel);
    }
    else{
        output.setPixel(pixel.getX(), pixel.getY(), pixel);
    }
}
}
else{
  ctx.clearRect(0,0,can.width,can.height);
  ctx1.clearRect(0,0,can1.width,can1.height);
  alert("photos are of different width or height");
  return;
}  

 ctx1.clearRect(0,0,can1.width,can1.height);  
output.drawTo(can);
}