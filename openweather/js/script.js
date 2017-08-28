// d3.selectAll("tr:nth-child(1) .day_high .temp")
    // .text("hot")
    // .html('<strong>hot</strong>')
    // .append('span')
    // .insert('span', ':first-child')
    // .insert('span')  //insert in regular order, after strong
    // .insert('span','strong') //insert before <strong>
    // .html(' today ');

// d3.selectAll('tr:nth-child(3)')
    // .remove();


// .text()
// .html()
// .append()
// .insert()
// .remove();
//----------------------------------------------------------------
// d3.selectAll('tr:nth-child(1) .day_high')
//     .append('span')
//     .html('hot')
    // .style('background','red')
    // .style('paddi ng','3px')
    // .style('marigin-left','3px')
    // .style('border-radius','3px')
    // .style('color','white')
//     .classed('badge badge-danger',true)
//     .classed('badge-danger',false)
//     .classed('badge-warning',true)
//     .style('marigin-left','3px')

// d3.selectAll('tr')
//     .insert('td',':first-child')
//     .append('input')
//     .attr('type','checkbox')
//     .property('checked',true)

//style()
//classed()  toggle classes
//attr() any attribute
//property
//----------------------------------------------------------------
// d3.selectAll('.day_high .temp')
//     .data([67,98,78,84,90])
//     .html(function(d,i){
//         if(d>=80){
//             return '<strong style="color:#ff0000">' +d+ '</strong>';
//         } else {
//             return d;
//         }
//     });
//----------------------------------------------------------------
var mydata = [
    {date:'4/01/2017',low:55,high:69},
    {date:'4/02/2017',low:65,high:75},
    {date:'4/03/2017',low:77,high:78},
    {date:'4/04/2017',low:82,high:94},
    {date:'4/05/2017',low:90,high:92},
];

d3.select('tbody')
    .selectAll('tr')
    .data(mydata)
    .enter().append('tr')
    .html(function(d){
        return '<th>' + d.date
        + '</th><td>' + d.low
        + '</td><td>' + d.high+'</td>'
    });
//enter()
//exit()
//----------------------------------------------------------------
//create svg
// d3.select('#viz')
//     .append('svg')
//         .attr('width',600)
//         .attr('height',400)
//         .style('background','#948504')
//     .append('rect')
//         .attr('x',200)
//         .attr('y',100)
//         .attr('width',200)
//         .attr('height',200)
//         .style('fill','lightblue');
//----------------------------------------------------------------
//bar chart
var bardata=[];
for (var i=0;i<10;i++){
    bardata.push(Math.random())
}
var height=400,
    width=600,
    barWidth=50,
    barOffset=5;

var yScale=d3.scaleLinear()
    .domain([0,d3.max(bardata)])
    .range([0,height]);
    //----------------------------------------------------------------
    // scaleLinear()
    // domain([min,max])  //initial data
    // range([min,max])   //result data
    // min()
    // max()
var xScale=d3.scaleBand()
    .domain(bardata)
    .padding(.2)
    .range([0,width]);
    //----------------------------------------------------------------
    // Ordinal Scales
    // scaleBand()
    // padding()
    // paddingInner()
    // paddingOuter()
    // bandwidth(), etc.
var colors=d3.scaleLinear()
    .domain([0,bardata.length*.33,
                bardata.length*.66,
                bardata.length])
    .range(['#ff4400','#00ffff','#ff00ff','#ffff00']);

var myChart=
d3.select('#viz').append('svg')
    .attr('width',width)
    .attr('height',height)
    .style('background','lightgrey')
.selectAll('rect').data(bardata)
    .enter().append('rect')
        .style('fill',function(d,i){
            return colors(i);
        })
        .attr('width',function(d){
            return xScale.bandwidth();
        })
        .attr('height',0)
        .attr('x', function(d){
            return xScale(d)
        })
        .attr('y',height)
//----------------------------------------------------------------
// on(enent)
// mouseout,mouseover,etc.
        .on('mouseover',function(d){
            tempColor=this.style.fill;
            d3.select(this)
            .transition()
            .style('opacity','0.5')
            .style('fill','black')
        })
        .on('mouseout',function(d){
            d3.select(this)
            .transition()
            .style('opacity','1')
            .style('fill',tempColor)
        })
//----------------------------------------------------------------
// transition,animation
// transition()
// duration()
// delay()
myChart.transition()
    .duration(2000)
    .ease(d3.easeBounceOut)
    .delay(function(d,i){
        return i*200
    })
    .attr('height',function(d){
            return yScale(d);
        })
    .attr('y',function(d){
        return height-yScale(d);
    })