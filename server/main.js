import { Meteor } from "meteor/meteor";
import Graphs from "meteor/brunomarram:js-graphs";

const fs = require("fs");

const _readGraph = (file) => {
    const graph = new Graphs.Graphs("Grafo 01");
    const textFile = Assets.getText(file);
    const lines = textFile.split("\n");
    let size = lines[0];
    for (let i = 1; i <= parseInt(size); i++) graph.addNode(i.toString(), i);
    lines.shift();

    lines.forEach((line) => {
        line = line.split(" ");
        const source = graph.getNode(line[0]),
            target = graph.getNode(line[1]),
            value = parseFloat(line[2]);
        graph.addEdge(source, target, value);
    });

    return graph;
};

Meteor.startup(() => {
    try {
        const graph = _readGraph("grafos/grafo1.txt");
        const source = graph.getNode("1");
        const target = graph.getNode("4");
        console.log(graph.isEurelian());
    } catch (e) {
        console.log("Error:", e.stack);
    }
});
