/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
 height = window.innerHeight * 0.7,
 margin = { top: 20, bottom: 50, left: 60, right: 40 };

/**
 * LOAD DATA
 * Using a Promise.all([]), we can load more than one dataset at a time
 * */
 Promise.all([
  d3.json("../data/usState.json"),
  d3.csv("../data/usHeatExtremes.csv", d3.autoType),
]).then(([geojson, heat]) => {

  console.log('heat', heat)

  const svg = d3.select("#container")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

  svg.append("text")
  .attr("x", (width / 2))             
  .attr("y", margin.top)
  .attr("text-anchor", "middle")  
  .style("font-size", "16px")  
  .text("United States Heat Extremes");
  
  // SPECIFY PROJECTION
  const projection = d3.geoAlbersUsa()
    .fitSize([width, height], geojson)

   // DEFINE PATH FUNCTION
  const pathGen = d3.geoPath(projection)

    // APPEND GEOJSON PATH  
  const states = svg.selectAll("path.states")
    .data(geojson.features)
    .join("path")
    .attr("class", "states")
    .attr("d", coords =>pathGen(coords))
    .attr("fill", "transparent")
    .attr("stroke", "black")
    
  // APPEND DATA AS SHAPE
  const heats = svg.selectAll("circle.heats")
  .data(heat)
  .join("circle")
  .attr("class", "heats")
  .attr("r", 2)
  .attr("transform", (d) => {
    const [x,y] = projection([d.Long,d.Lat])
    return `translate(${x}, ${y})`


})
 

 



  
  


});