   export const userColumns = [
    {
      field: "title",
      headerName: "Title",
      width: 230,
    },
    {
      field: "description",
      headerName: "Description",
      width: 230,
    },

    {
        field: "completed",
        headerName: "Completed",
        width: 160,
        renderCell: (params) => {
          return (
            <div className={`cellWithStatus ${params.row.completed ? "true" : "false"}`}>
              {params.row.completed ? "True" : "False"}
            </div>
          );
        },
      },
    {
        field: "createdAt",
        headerName: "Date Created",
        width: 250,
        renderCell: (params) => {
          const ts = new Date(params.row.createdAt) 

          return (
            <div>
              {ts.toLocaleString()}
            </div>
          );
        },
      },
  ];
  
  //temporary data
  export const userRows = [
    {
      id: 1,
      completed: "true",
      description: "1snow@gmail.com",
      created: 35,
    },
    {
      id: 2,
      username: "Jamie Lannister",
      img: "https://imcreateds.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      description: "2snow@gmail.com",
      completed: "true",
      created: 42,
    },
    {
      id: 3,
      username: "Lannister",
      img: "https://imcreateds.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      description: "3snow@gmail.com",
      completed: "false",
      created: 45,
    },
    {
      id: 4,
      username: "Stark",
      img: "https://imcreateds.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      description: "4snow@gmail.com",
      completed: "false",
      created: 16,
    },
   
  ];