const Task = ({ task }) => {
    return (
      <tr className="border-b-2 text-center">
        <td className="py-2 px-4">{task.title}</td>
        <td className="py-2 px-4">{task.completed ? 'Completed' : 'Incomplete'}</td>
        <td className="py-2 px-4">
          <button className="bg-blue-500 hover:bg-blue-700 mr-1 text-white font-bold py-2 px-4 rounded">
            Edit
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete
          </button>
        </td>
        
      </tr>
    );
  };
  
  export default Task;