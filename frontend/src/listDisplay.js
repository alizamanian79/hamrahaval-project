export function ListDisplay(props) {
    return (
      <ul className="taskList">
        {props.listItems?.map((item, index) => (
          <ListItem
            key={index}
            index={index}
            taskDesc={item.description}
            isCompleted={item.isCompleted}
            itemCompleter={props.itemCompleter}
            itemRemover={props.itemRemover}
          />
        ))}
      </ul>
    );
  }
  
  function ListItem(props) {
    return (
      <li>
        <input
          type="checkbox"
          onChange={(event) => props.itemCompleter(event, props.index)}
          checked={props.isCompleted}
        />
        <span className={props.isCompleted ? "itemCompleted" : null}>
          {props.taskDesc}
        </span>
        <button
          onClick={() => {props.itemRemover(props.index)
          console.log(props.index)
          }}
          className="fa fa-trash"
        />
      </li>
    );
  }
  