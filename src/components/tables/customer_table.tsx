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
import { tempCustomers } from "../../data/customers";
import { useMediaQuery, useTheme } from "@mui/material";

export default function CustomerTable() {
    const [deviceType, setDeviceType] = React.useState('tablet');
    const theme = useTheme();
    const tablet = useMediaQuery(theme.breakpoints.down('sm'));

    React.useEffect(() => {
        if (tablet) {
            setDeviceType('tablet');
        } else {
            setDeviceType('pc');
        }
    }, )


    const columnsSmall = [
        {
            field: "id",
            headerName: "No",
            width: 100,
            renderCell: (params: any) => (
                <p>#{params?.row?.id}</p>
            ),
        },
        {
            field: "firstName",
            headerName: "First Name",
            width: 100,
            
        },
        {
            field: "surname",
            headerName: "Surname",
            width: 100,
        },
        {
            field: "companyName",
            headerName: "Company Name",
            width: 100,
        },
        {
            field: "emailAddress",
            headerName: "Email Address",
            width: 156,
        },
        {
            field: "phoneNumber",
            headerName: "Phone number",
            width: 110,
        },
        {
            field: "creditLimit",
            headerName: "Credit Limit",
            width: 115,
        },
    ];

    const columns = [
        {
            field: "id",
            headerName: "No",
            width: 150,
            renderCell: (params: any) => (
                <p>#{params?.row?.id}</p>
            ),
        },
        {
            field: "firstName",
            headerName: "First Name",
            width: 200,
            
        },
        {
            field: "surname",
            headerName: "Surname",
            width: 200,
        },
        {
            field: "companyName",
            headerName: "Company Name",
            width: 210,
        },
        {
            field: "emailAddress",
            headerName: "Email Address",
            width: 320,
        },
        {
            field: "phoneNumber",
            headerName: "Phone number",
            width: 200,
        },
        {
            field: "creditLimit",
            headerName: "Credit Limit",
            width: 210,
        },
    ];

    return (
        <div style={{ height: 600, width: "100%" }}>
            {tempCustomers && (
                <DataGrid
                    sx={{ padding: 1 }}
                    rows={tempCustomers}
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
