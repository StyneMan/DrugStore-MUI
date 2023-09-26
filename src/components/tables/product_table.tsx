import * as React from "react";
import {
  DataGrid,
//   GridToolbarContainer,
//   GridToolbarColumnsButton,
//   GridToolbarFilterButton,
//   GridToolbarExport,
//   GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import CustomNoRowsOverlay from "../nodata/";
import tempProducts from "../../data/products";
import { Avatar, Box, Typography } from "@mui/material";

import inventoryImage from "../../assets/images/inventory_2.svg";



export default function ProductsTable() {
  const columns = [
    {
      field: "id",
      headerName: "",
      width: 100,
      renderCell: (params: any) => (
        <Avatar src={params?.row?.image} variant="rounded" />
      ),
    },
    {
      field: "subject",
      headerName: "Products",
      width: 400,
      renderCell: (params: any) => (
        <Box>
          <Typography fontSize={18} fontWeight={700} gutterBottom>
            {" "}
            {params?.row?.name}
          </Typography>
          <Box
            display="flex"
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <img src={inventoryImage} alt="" />
            <Typography>{params?.row?.sachet}</Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 100,
    },
    {
      field: "validity",
      headerName: "Exp Date",
      width: 120,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
  ];

  return (
    <div style={{ height: 600, width: "100%" }}>
      {tempProducts && (
        <DataGrid
          sx={{ padding: 1 }}
          rows={tempProducts}
          columns={columns}
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
