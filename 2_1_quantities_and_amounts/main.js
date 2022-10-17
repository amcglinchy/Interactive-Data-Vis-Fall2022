
/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .8;
const height = 500;
const margin = 50;

/* LOAD DATA */
d3.csv('../data/squirrelActivities.csv', d3.autoType)
  .then(data => {
    //console.log("data", data)
    data.sort((a,b)=>b.count-a.count)

    const svg = d3.select("#container").append("svg")
    .attr("width",width)
    .attr("height",height)
    .style("overflow", "visible")

    /* SCALES */
    /** This is where you should define your scales from data to pixel space */
    const xScale = d3.scaleLinear()
      .domain([0,Math.max(...data.map(d=> d.count))])
      .range([margin,width-margin]);

    const yScale = d3.scaleBand()
      .domain(data.map(d => d.activity))
      .range([height-margin,margin])
      .padding(0.1);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    /* HTML ELEMENTS */
    /** Select your container and append the visual elements to it */

    svg.selectAll("rect.bar")
    .data(data)
    .join("rect")
    .attr("class","bar")
    .attr("x",margin)
    .attr("y", d=>yScale(d.activity))
    .attr("height",yScale.bandwidth())
    .attr("width",d=>xScale(d.count));

  svg.append("g")
  .style("transform",`translate(0px,${height-margin}px)`)
  .call(xAxis);
  svg.append("g")
  .style("transform",`translate(${margin}px,0px)`)
  .call(yAxis);

  })