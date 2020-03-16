import React from "react";
import Card from "./Card";

const CardGrid = props => {
  console.log(props);
  return (
    <div>
      <Card key={props.user.node_id} user={props.user} />
      {props.following.map(user => (
        <Card key={user.node_id} user={user} />
      ))}
    </div>
  );
};

export default CardGrid;
