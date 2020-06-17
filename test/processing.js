// Marching Squares Edge Detection
// this is a "marching ants" algorithm used to calc the outline path
(function() {
    // d3-plugin for calculating outline paths
    // License: https://github.com/d3/d3-plugins/blob/master/LICENSE
    //
    // Copyright (c) 2012-2014, Michael Bostock
    // All rights reserved.
    //
    //  Redistribution and use in source and binary forms, with or without
    //  modification, are permitted provided that the following conditions are met:
    //* Redistributions of source code must retain the above copyright notice, this
    //  list of conditions and the following disclaimer.
    //* Redistributions in binary form must reproduce the above copyright notice,
    //  this list of conditions and the following disclaimer in the documentation
    //  and/or other materials provided with the distribution.
    //* The name Michael Bostock may not be used to endorse or promote products
    //  derived from this software without specific prior written permission.
    // THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL MICHAEL BOSTOCK BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
    geom = {}; 
    geom.contour = function(grid, start) { 
      var s = start || d3_geom_contourStart(grid), // starting point 
          c = [],    // contour polygon 
          x = s[0],  // current x position 
          y = s[1],  // current y position 
          dx = 0,    // next x direction 
          dy = 0,    // next y direction 
          pdx = NaN, // previous x direction 
          pdy = NaN, // previous y direction 
          i = 0; 
  
      do { 
        // determine marching squares index 
        i = 0; 
        if (grid(x-1, y-1)) i += 1; 
        if (grid(x,   y-1)) i += 2; 
        if (grid(x-1, y  )) i += 4; 
        if (grid(x,   y  )) i += 8; 
  
        // determine next direction 
        if (i === 6) { 
          dx = pdy === -1 ? -1 : 1; 
          dy = 0; 
        } else if (i === 9) { 
          dx = 0; 
          dy = pdx === 1 ? -1 : 1; 
        } else { 
          dx = d3_geom_contourDx[i]; 
          dy = d3_geom_contourDy[i]; 
        } 
  
        // update contour polygon 
        if (dx != pdx && dy != pdy) { 
          c.push([x, y]); 
          pdx = dx; 
          pdy = dy; 
        } 
  
        x += dx; 
        y += dy; 
      } while (s[0] != x || s[1] != y); 
  
      return c; 
    }; 
  
    // lookup tables for marching directions 
    var d3_geom_contourDx = [1, 0, 1, 1,-1, 0,-1, 1,0, 0,0,0,-1, 0,-1,NaN], 
        d3_geom_contourDy = [0,-1, 0, 0, 0,-1, 0, 0,1,-1,1,1, 0,-1, 0,NaN]; 
  
    function d3_geom_contourStart(grid) { 
      var x = 0, 
          y = 0; 
  
      // search for a starting point; begin at origin 
      // and proceed along outward-expanding diagonals 
      while (true) { 
        if (grid(x,y)) { 
          return [x,y]; 
        } 
        if (x === 0) { 
          x = y + 1; 
          y = 0; 
        } else { 
          x = x - 1; 
          y = y + 1; 
        } 
      } 
    } 
  
  })();
  
//////////////////////////////////////////  

window.addEventListener("DOMContentLoaded", function() {

    var image = document.getElementById("original");

    var canvas = document.getElementById("canvas");

    canvas.width = image.width;
    canvas.height = image.height;

    var cw = canvas.width;

    var ctx = canvas.getContext("2d");
    
    ctx.drawImage(image, 0, 0);
    
    // grab the image's pixel data
    var imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
    var data=imgData.data;
    
    // This is used by the marching ants algorithm
    // to determine the outline of the non-transparent
    // pixels on the image
    var defineNonTransparent=function(x,y){
        var a=data[(y*cw+x)*4+3];
        return(a>20);
    }

    // call the marching ants algorithm
    // to get the outline path of the image
    // (outline=outside path of transparent pixels
    var points=geom.contour(defineNonTransparent);

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    svg.setAttribute('width', canvas.width);
    svg.setAttribute('height', canvas.height);
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

    var clipPathSet = [];
    var polygonPathSet = [];

    for(var i=0;i<points.length;i++)
    {
        var point= points[i];
        clipPathSet.push(`${point[0]}px ${point[1]}px`);      
        polygonPathSet.push(`${point[0]},${point[1]}`);  
    }

    // Add an outline path to the svg so we can highlight it later.
    var svgPolygon  = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    svgPolygon.setAttribute("class", "img-border");
    var polygonBorder = polygonPathSet.join(' ');
    svgPolygon.setAttribute('points', polygonBorder);
    svg.appendChild(svgPolygon);

    var imgSvg = document.createElementNS("http://www.w3.org/2000/svg", "image")
    imgSvg.setAttribute('href', canvas.toDataURL());
    svg.appendChild(imgSvg);

    var svgContainer = document.getElementById("svg-container");
    svgContainer.appendChild(svg);

    var clipPath = clipPathSet.join(',');
    var styleData = `clip-path: polygon(${clipPath});`;

    svg.setAttribute("style", styleData);

    var downloadButton = document.getElementById("download");

    // Serialise it.
    var htmlContent = svg.outerHTML;

    var fileBlob = new Blob([htmlContent], { type: 'image/svg+xml'});

    var objectUrl = URL.createObjectURL(fileBlob);
    
    downloadButton.setAttribute('href', objectUrl);
});