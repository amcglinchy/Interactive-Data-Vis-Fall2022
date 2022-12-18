/**
 * CONSTANTS AND GLOBALS
 * */
 const width = window.innerWidth * .7,
    height = window.innerHeight * .8,
    margin = { top: 20, bottom: 50, left: 40, right: 40 };

let svg, circles;


/* APPLICATION STATE */
let state = {
    data: [],
  hover: {
    stateName: null
    }
};
  
  /* LOAD DATA */
  d3.csv("../data/incarcerated_population_states.csv", d3.autoType).then(raw_data => {
    // + SET YOUR DATA PATH
    console.log("data", raw_data);
    // save our data to application state
    state.data = raw_data;
    init();
  });

/**
* INITIALIZING FUNCTION
* this will be run *one time* when the data finishes loading in
* */
function init() {

    svg = d3.select("#container").append("svg")
    .attr("width",width)
    .attr("height",height)
    .style("overflow", "visible");

    /* SCALES */
    const xScale = d3.scaleLinear()
    .domain([0,Math.max(...state.data.map(d=> d.Total_Incarcerated))])
    .range([margin.right,width-margin.right])

    const yScale = d3.scaleLinear()
    .domain([0,Math.max(...state.data.map(d=> d.Imprisonment_Rate))])
    .range([height-margin.right,margin.right])

    const rScale = d3.scaleSqrt()
    .domain([0, Math.max(...state.data.map(d=>d.Life_Sentences))])
    .range([0,20])

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    circles = svg.selectAll(".dot")
    .data(state.data)
    .join("circle")
    .attr("class", "dot")
    .attr("cx", d=> xScale(d.Total_Incarcerated))
    .attr("cy", d=>yScale(d.Imprisonment_Rate))
    .attr("r", d=>rScale(d.Life_Sentences))

      svg.append("g")
        .style("transform",`translate(0px,${height-margin.left}px)`)
        .call(xAxis);

      svg.append("g")
        .style("transform",`translate(${margin.left}px,0px)`)
        .call(yAxis);

      svg.append("text")
        .style("transform",`translate(${width/2}px,${height}px)`)
        .style("text-anchor", "middle")
        .text("Total Incarcerated Population");

       svg.append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", margin-20)
       .attr("x",0 - (height / 2))
       .attr("dy", "0em")
       .style("text-anchor", "middle")
       .text("Imprisonment Rate per 100k Residents");


  svg.append("text")
  .attr("x", (width / 2))             
  .attr("y", margin.right)
  .attr("text-anchor", "middle")  
  .style("font-size", "16px")  
  .text("Incarceration in the United States 2020")

  svg.append("text")
  .attr("x", (width / 2))             
  .attr("y", margin.right+10)
  .attr("text-anchor", "middle")  
  .style("font-size", "10px") 
  .text("*circle size is indication of # of life sentences")
  
 
 draw(); // calls the draw function
}

/**
* DRAW FUNCTION
* we call this every time there is an update to the data/state
* */
function draw() {

    const tooltip = d3.select("#container")
    .append("div")
    .attr("class", "tooltip");

    const mouseOver = function(){
        d3.selectAll("circles")
			.transition()
			.duration(300);
		d3.select(this)
			.transition()
			.duration(300);
        tooltip.style("visibility", "visible");
    }

    const mouseMove = (event, d) =>{
        tooltip.style("top", (event.y)+10 + "px")
        .style("left", (event.x)+20 + "px")
        // .html(d.properties.NTAName +  "<br>" +"Incarcerated population: " + d.properties.incar_pop_sum)
        .html(d.State)
        .transition().duration(200)
		.style("opacity", 1);
    }

    const mouseOut = (e) =>{
        d3.selectAll("circles")
			.transition()
			.duration(300);
        tooltip.transition().duration(300)
        .style("opacity", 0);
    }

    circles
    .on("mousemove", mouseMove)
    .on("mouseover", mouseOver)
    .on("mouseout", mouseOut);
 

}