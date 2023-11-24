/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

import CustomNoRowsOverlay from "../nodata/";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function CustomerTable() {
  const [deviceType, setDeviceType] = React.useState("tablet");
  const [allCustomers, setAllCustomers] = React.useState<any[]>([]);
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.down("sm"));

  const customers = useSelector(
    (state: RootState) => state.customers.customers
  );

  // const currentLocation = useSelector(
  //   (state: RootState) => state.business_locations.currentBusinessLocation
  // );

  React.useEffect(() => {
    if (tablet) {
      setDeviceType("tablet");
    } else {
      setDeviceType("pc");
    }
  }, []);


  React.useEffect(() => {
    if (customers) {
      const filterOut = customers?.filter((item) => item?.type === "customer");
      setAllCustomers(filterOut);
    }
  }, [customers]);

  const columnsSmall = [
    {
      field: "id",
      headerName: "No",
      width: 100,
      renderCell: (params: any) => <p>#{params?.row?.id}</p>,
    },
    {
      field: "name",
      headerName: "Full Name",
      width: 100,
    },
    {
      field: "contact_id",
      headerName: "Contact ID",
      width: 100,
    },
    {
      field: "email",
      headerName: "Email Address",
      width: 156,
    },
    {
      field: "mobile",
      headerName: "Phone number",
      width: 110,
    },
    {
      field: "credit_limit",
      headerName: "Credit Limit",
      width: 115,
    },
  ];

  const columns = [
    {
      field: "id",
      headerName: "No",
      width: 120,
      renderCell: (params: any) => <p>#{params?.row?.id}</p>,
    },
    {
      field: "name",
      headerName: "Full Name",
      width: 200,
      renderCell: (params: any) => (
        <Typography variant="body2" textTransform={"capitalize"}>
          {params?.row?.name}
        </Typography>
      ),
    },
    {
      field: "contact_id",
      headerName: "Contact ID",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email Address",
      width: 300,
      renderCell: (params: any) => (
        <Typography variant="body2" textTransform={"lowercase"}>
          {params?.row?.email}
        </Typography>
      ),
    },
    {
      field: "mobile",
      headerName: "Phone number",
      width: 200,
    },
    {
      field: "credit_limit",
      headerName: "Credit Limit",
      width: 210,
    },
  ];

  return (
    <div style={{ height: "73vh", width: "100%" }}>
      {allCustomers && (
        <DataGrid
          sx={{ padding: 1 }}
          rows={allCustomers}
          columns={deviceType === "tablet" ? columnsSmall : columns}
          density="compact"
          rowHeight={86}
          disableColumnFilter={true}
          //   autoHeight
          components={{
            // Toolbar: CustomToolbar,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
        />
      )}
    </div>
  );
}
