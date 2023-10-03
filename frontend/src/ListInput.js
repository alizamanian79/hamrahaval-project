export function ListInputUI(props) {
    return (
      <div className="ListInputUI">
        <input
          type="text"
          className="taskInput"
          placeholder="Enter a task"
          onChange={props.getInputValue}
          value={props.nextItem}
        />
        <button
          onClick={() => props.itemAdder()}
          className="taskButton fa fa-fw fa-plus"
        />
      
        
      </div>
    );
  }