import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

const columns = [
  { field: "Id", headerName: "Id", width: 240 },
  {
    field: "photo",
    headerName: "Photo",
    width: 80,
    renderCell: (params) => {
      return (
        <div className="h-full flex justify-center items-center">
          <img
            src={params.row.photo || "/noavatar.png"}
            alt={params.row.firstName}
            className="w-full h-full object-cover"
          />
        </div>
      );
    },
  },
  { field: "firstName", headerName: "First Name", width: 200 },
];

const DataTable = () => {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const param = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          "https://3ef9gn5kk2.execute-api.ap-south-1.amazonaws.com/arnxt_prod/ar-horizon/get_registered_users",
          {
            productId: param.id,
          }
        );
        const data = res.data;

        setRegisteredUsers(data.data);
      } catch (error) {
        console.log("Error fetching registered users:", error);
        toast.error("Error fetching registered users");
      }
    };

    fetchData();
  }, [param.id]);
  return (
    <div className="dataTable">
      <Toaster />
      <DataGrid
        className="dataGrid"
        rows={registeredUsers}
        columns={columns}
        getRowId={(row) => row.Id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;
