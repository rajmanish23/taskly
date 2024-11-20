import React from "react";
import {} from "./styles"

type TaskDisplayCardProps = {
  data: Task;
};

const TaskDisplayCard = ({ data }: TaskDisplayCardProps) => {
  return (
    <li>
      <button>complete</button>
      <div>
        <div>
          <p>{data.name}</p>
          <div>
            <p>Due: {data.dueAt}</p>
          </div>
        </div>

        <ul>
          {data.tags.map((each) => (
            <li key={each.sId}>{each.name}</li>
          ))}
        </ul>

        <p>{data.description}</p>

        <ul>
          {data.subTasks.map((each) => (
            <li key={each.sId}>
              <p>{each.name}</p>
              <div>
                <p>Due: {each.dueAt}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default TaskDisplayCard;
