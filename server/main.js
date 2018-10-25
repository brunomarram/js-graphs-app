import { Meteor } from "meteor/meteor";
import Graphs from "meteor/brunomarram:js-graphs";

const fs = require("fs");

Meteor.startup(() => {
    try {
        const graph = new Graphs.Graphs("Grafo 01");
        const textFile = Assets.getText("grafos/grafo1.txt");
        const lines = textFile.split("\n");
        let nodes = lines[0];
        for (let i = 1; i <= parseInt(nodes); i++)
            graph.addNode(i.toString(), i);
        lines.shift();

        lines.forEach((line) => {
            line = line.split(" ");
            const source = graph.getNode(line[0]),
                target = graph.getNode(line[1]),
                value = parseFloat(line[2]);
            graph.addEdge(source, target, value);
        });

        const node = graph.getNode("5");

        //console.log(graph.getNeighbors(node));
        console.log(graph.isEurelian());
    } catch (e) {
        console.log("Error:", e.stack);
    }
});
