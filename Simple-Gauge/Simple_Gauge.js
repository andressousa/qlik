var powerGauge;
var sst         = 0;
var SST         = 0;
var rSST        = 0;
var SSTdisplay  = 0;
var count       = 0;
var Vwidth      = 0;
var Vheight     = 0;
var Rwidth      = 0;
var container   = [];
var d           = [];
var first       = 'A';
var prev        = "";
var Btext       = document.createElement('h5');

Btext.id        = "Bhead";

define(["jquery", "./d3.min", "./d3.layout.cloud"], function($, d3) {
    'use strict';

    return {
        initialProperties: {
            version: 1.0,
            qHyperCubeDef: {
                qDimensions: [],
                qMeasures: [],
                qInitialDataFetch: [{
                    qWidth: 2,
                    qHeight: 100
                }]
            }
        },
        definition: {
            type: "items",
            component: "accordion",
            items: {
                measures: {
                    uses: "measures",
                    min: 1,
                    max: 5
                },
                addons: {
                    uses: "addons",
                    items: {
                        RadStart: {
                            ref: "RadStart",
                            label: "Limite inferior",
                            expression: "optional",
                            type: "number",
                            defaultValue: 0
                        },
                        RadEnd: {
                            ref: "RadEnd",
                            label: "Limite superior",
                            expression: "optional",
                            type: "number",
                            defaultValue: 100
                        },
                        MaxSize: {
                            ref: "MaxSize",
                            label: "Nº de segmentos",
                            expression: "optional",
                            type: "integer",
                            defaultValue: 2,
                            min: 2,
                            max: 20
                        },
                        Listcolor: {
                            ref: "Listcolor",
                            label: "Lista de cores dos segmentos",
                            type: "string",
                            defaultValue: "#FFFFFF #000000"
                        },
                        Textsize: {
                            ref: "Textsize",
                            label: "Tamanho da fonte da medida",
                            type: "string",
                            defaultValue: "30px"
                        },
                        Textcolor: {
                            ref: "zSRcolor",
                            label: "Cor da fonte da medida",
                            expression: "optional",
                            type: "string",
                            defaultValue: '#000000'
                        }
                    }
                },
                settings: {
                    uses: "settings"
                }
            }
        },
        snapshot: {
            canTakeSnapshot: true
        },
        paint: function($element, layout) {
            var d3Format;
            var tooltipTitle    =layout.qHyperCube.qMeasureInfo;
            var tooltipValues   =layout.qHyperCube.qGrandTotalRow;
            var format          = layout.qHyperCube.qMeasureInfo[0].qNumFormat.qFmt;
            var value           = layout.qHyperCube.qDataPages[0].qMatrix[0];
            var width           = $element.width();
            var height          = $element.height();
            var Vsize           = height * 1.4;
            var id              = "container_" + layout.qInfo.qId;
            sst                 = value[0].qNum;
            SST                 = value[0].qNum;
            rSST                = SST;
            SSTdisplay          = SST;
            Vwidth              = width;
            Vheight             = height;
            Rwidth              = width * 0.15;

            document.getElementById(id) ? $("#" + id).empty().css("margin", "auto") : $element.append($('<div />;').attr("id", id).width(width).height(height).css("margin", "auto !important")).after('<div id="tooltip_'+id+'" class="tooltip-text"></div>');
            $('head').append('<style type="text/css">.qv-object-content-container .tooltip-text{display:none;width: calc(80% - 10px);left:10%;right:10%;top:10px;height: auto;background-color: rgba(0, 0, 0, 0.7);color: #fff;text-align: center;padding: 5px 5px 0 5px;border-radius: 6px;position: absolute;z-index: 999;}.qv-object-content-container:hover .tooltip-text{display: block;}.qv-object-content-container .tooltip-text p{display: block;float:left; width: 100%; margin: 0 0 5px 0;}</style>');

            if(format){
                if (format.indexOf('%') != (-1)) {
                    d3Format = '<,%';
                }
            }

            viz(
                rSST, 
                id, 
                Vwidth, 
                Vheight, 
                Rwidth, 
                Vsize, 
                layout.RadStart, 
                layout.RadEnd, 
                layout.MaxSize, 
                d3Format, 
                value, 
                tooltipTitle,
                tooltipValues,
                layout.zSRcolor,
                layout.Textsize,
                layout.Listcolor
            );
        }
    };
});

function viz(
    value, 
    id, 
    width, 
    height, 
    radius, 
    Csize,
    Radstart, 
    Radend, 
    Segments,
    format, 
    Values,
    tooltipTitle, 
    tooltipValues,
    textColor,
    textSize,
    Listcolor
) {

    if (!format){
        format = ',.2s';
    }

    var gauge = function(container, configuration) {

        var that = {};
        var config = {
            size: Csize,
            clipWidth: width,
            clipHeight: height,
            ringInset: 20,
            ringWidth: 20,
            pointerHeadLengthPercent: 0.6,
            minValue: Radstart,
            maxValue: Radend,
            minAngle: -90,
            maxAngle: 90,
            transitionMs: 750,
            majorTicks: Segments,
            labelFormat: d3.format(format),
            labelInset: 10
        };

        var range = undefined;
        var r = undefined;
        var pointerHeadLength = undefined;
        var value = 0;
        var svg = undefined;
        var arc = undefined;
        var scale = undefined;
        var ticks = undefined;
        var tickData = undefined;
        var pointer = undefined;
        var donut = d3.layout.pie();

        function deg2rad(deg) {
            return deg * Math.PI / 180;
        }

        function newAngle(d) {
            var ratio = scale(d);
            var newAngle = config.minAngle + (ratio * range);
            return newAngle;
        }

        function configure(configuration) {
            var prop = undefined;
            for (prop in configuration) {
                config[prop] = configuration[prop];
            }

            range               = config.maxAngle - config.minAngle;
            r                   = config.size / 2;
            pointerHeadLength   = Math.round(r * config.pointerHeadLengthPercent);

            scale = d3.scale.linear()
                .range([0, 1])
                .domain([config.minValue, config.maxValue]);

            ticks = scale.ticks(config.majorTicks);
            tickData = d3.range(config.majorTicks).map(function() {
                return 1 / config.majorTicks;
            });

            arc = d3.svg.arc()
                .innerRadius(r - config.ringWidth - config.ringInset)
                .outerRadius(r - config.ringInset)
                .startAngle(function(d, i) {
                    var ratio = d * i;
                    return deg2rad(config.minAngle + (ratio * range));
                })
                .endAngle(function(d, i) {
                    var ratio = d * (i + 1);
                    return deg2rad(config.minAngle + (ratio * range));
                });
        }
        that.configure = configure;

        function centerTranslation() {
            return 'translate(' + r + ',' + r + ')';
        }

        function isRendered() {
            return (svg !== undefined);
        }
        that.isRendered = isRendered;

        function splitColors(color){
            return color.split(' ');
        }

        function listTooltip(id, titles, values){
            var html = '';
            for (i = 0; i < values.length; i++) {
                html += '<p>';
                html += '<span style="float:left;">' + titles[i].qFallbackTitle + '</span>';
                html += '<span style="float:right;">' + values[i].qText + '</span>';
                html += '</p>';
            }
            $('#tooltip_' + id).html(html);
        }

        Listcolor = splitColors(Listcolor);

        function render(newValue){
            listTooltip(id, tooltipTitle, tooltipValues);

            svg = d3.select(container)
                .append('svg:svg')
                .attr('class', 'gauge')
                .attr('width', config.clipWidth)
                .attr('height', config.clipHeight);

            var centerTx = centerTranslation();

            var arcs = svg.append('g')
                .attr('class', 'arc')
                .attr('transform', centerTx);

            arcs.selectAll('path')
                .data(tickData)
                .enter().append('path')
                .attr('fill', function(d, i) {
                    return Listcolor[i];
                })
                .attr('d', arc);

            var lg = svg.append('g')
                .attr('class', 'label')
                .attr('transform', centerTx);
            lg.selectAll('text')
                .data(ticks)
                .enter().append('text')
                .attr('transform', function(d) {
                    var ratio = scale(d);
                    var newAngle = config.minAngle + (ratio * range);
                    return 'rotate(' + newAngle + ') translate(0,' + (config.labelInset - r) + ')';
                })
                .text(config.labelFormat)
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'central');

            var lineData = [
                [2, 0],
                [0, -pointerHeadLength],
                [-2, 0]
            ];
            var pointerLine = d3.svg.line().interpolate('monotone');
            var pg = svg.append('g').data([lineData])
                .attr('class', 'pointer')
                .attr('transform', centerTx);

            var text = svg.append('text')
                .text(Values[0].qText)
                .attr('id', 'zMyText')
                .attr('transform', function(d) {
                    return 'translate(' + r + ',' + r * 0.8 + ')';
                })
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'central')
                .attr('font-family', 'sans-serif')
                .attr('fill', function(d) {
                    return textColor
                }).attr('font-size', textSize);

            pointer = pg.append('path')
                .attr('d', pointerLine)
                .attr('transform', 'rotate(' + config.minAngle + ')');

            update(newValue === undefined ? 0 : newValue);
        }
        that.render = render;

        function update(newValue, newConfiguration) {
            if (newConfiguration !== undefined) {
                configure(newConfiguration);
            }
            var ratio = scale(newValue);
            var newAngle = config.minAngle + (ratio * range);
            pointer.transition()
                .duration(config.transitionMs)
                .ease('elastic')
                .attr('transform', 'rotate(' + newAngle + ')');
        }
        that.update = update;

        configure(configuration);

        return that;
    };

    function onDocumentReady() {

        powerGauge = gauge('#' + id, {
            size: Csize,
            clipWidth: width,
            clipHeight: height,
            ringWidth: radius,
            maxValue: Radend,
            transitionMs: 4000,
        });

        powerGauge.render();
        powerGauge.update(value);
    }
    onDocumentReady();
}