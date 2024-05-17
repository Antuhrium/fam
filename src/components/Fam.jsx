import React, { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const family = [
    { id: "1", name: "Глава", parentId: null },
    { id: "2", name: "Ребенок 1", parentId: "1" },
    { id: "3", name: "Ребенок 2", parentId: "1" },
    { id: "4", name: "Внук 1", parentId: "2" },
    { id: "5", name: "Внук 2", parentId: "3" },
];

const Card = ({ node }) => (
    <div className="card">
        <div className="card-content">
            <div className="card-title">{node.name}</div>
        </div>
    </div>
);

const renderTree = (nodes, parentId = null, scale) => {
    return nodes
        .filter((node) => node.parentId === parentId)
        .map((node) => (
            <div
                key={node.id}
                className="tree-node"
                style={{
                    display:
                        node.parentId === null || scale > 1 ? "block" : "none",
                }}
            >
                <Card node={node} />
                <div className="tree-children">
                    {renderTree(nodes, node.id, scale)}
                </div>
            </div>
        ));
};

const containerStyle = {
    height: "600px",
    width: "100%",
    backgroundColor: "grey"
}

const FamilyTreeComponent = () => {
    const [scale, setScale] = useState(1);

    return (
        <TransformWrapper
            initialScale={1}
            minScale={0.5}
            maxScale={4}
            onZoom={(newScale) => {
                console.log(newScale.state.scale);
                return setScale(newScale.state.scale);
            }}
        >
            <>
            
                <TransformComponent contentStyle={containerStyle} wrapperStyle={containerStyle}>
                    <div className="tree-container">
                        {renderTree(family, null, scale)}
                    </div>
                </TransformComponent>
            </>
        </TransformWrapper>
    );
};

export default FamilyTreeComponent;
