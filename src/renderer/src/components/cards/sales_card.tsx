import { Box, Card, Grid, Typography } from "@mui/material";
import { NumericFormat } from "react-number-format";

interface SalesCardProps {
  data;
}

export default function SalesCard({ data }: SalesCardProps) {
  function getOrdinalSuffix(day: number) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  // Format the date with day and ordinal suffix
  const date =  new Date(Date.parse(`${data?.updated_at}`));
  const day = date.getDate();
  const ordinalSuffix = getOrdinalSuffix(day);
  const formattedDate = `${day}${ordinalSuffix} ${date.toLocaleString("en-US", {
    month: "short",
  })}`;

  return (
    <Card elevation={0} sx={{ my: 2, p: 3 }}>
      <Box display={"flex"}>
        <Grid container spacing={1}>
          {/* Order No Column */}
          <Grid
            item
            md={1}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"start"}
          >
            <Typography fontSize={13} fontWeight={300} textAlign={"start"}>
              {`#${data?.id}`}
            </Typography>
          </Grid>

          {/* Total Amount Column */}
          <Grid
            item
            md={2}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"start"}
          >
            <NumericFormat
              style={{ fontSize: 15, fontFamily: "sans-serif" }}
              value={parseFloat(data?.final_total)?.toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₦"}
            />
          </Grid>

          {/* No of items Column */}
          <Grid
            item
            md={1}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"start"}
          >
            <Typography fontSize={13} fontWeight={300} textAlign={"start"}>
              {data?.sell_lines?.length}
            </Typography>
          </Grid>

          {/* Mode of Payment Column */}
          <Grid
            item
            md={2}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"start"}
          >
            {data?.payment_lines?.map((elem, key: number) => (
              <Box key={key}>
                <Typography fontSize={15} textAlign={"start"}>
                  {`${elem?.method?.toString().replace("_", " ")}${
                    data?.payment_lines?.length - key > 1 ? "/" : ""
                  }`}
                </Typography>
              </Box>
            ))}
          </Grid>

          {/* Amount Paid Column */}
          <Grid
            item
            md={2}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"start"}
          >
            <NumericFormat
              style={{ fontSize: 15, fontFamily: "sans-serif" }}
              value={parseFloat(data?.final_total)?.toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₦"}
            />
          </Grid>

          {/* Amount Due Column */}
          <Grid
            item
            md={2}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"start"}
          >
            <NumericFormat
              style={{ fontSize: 15, fontFamily: "sans-serif", marginLeft: 10 }}
              value={parseFloat("0")?.toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₦"}
            />
          </Grid>

          {/* Time Column */}
          <Grid
            item
            md={1}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"start"}
          >
            <Typography fontSize={13} fontWeight={300} textAlign={"start"}>
              {new Intl.DateTimeFormat("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              }).format(Date.parse(data?.updated_at))}
            </Typography>
          </Grid>

          {/* Date Column */}
          <Grid
            item
            md={1}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"start"}
          >
            <Typography fontSize={13} fontWeight={300} textAlign={"start"}>
              {formattedDate}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}
