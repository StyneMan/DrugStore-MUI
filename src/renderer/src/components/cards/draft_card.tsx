import { Edit } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { NumericFormat } from "react-number-format";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface DraftProps {
  data;
}

export default function DraftCard({ data }: DraftProps) {
  const pluralizer = (num: number) => {
    return num > 1 ? "items" : "item";
  };

  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"start"}
    >
      <Typography color={"#8795A0"} fontSize={14}>
        #123
      </Typography>
      <Box
        px={1}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"start"}
        alignItems={"start"}
      >
        <Typography
          fontWeight={700}
          fontSize={16}
          color={"#000000"}
        >
          {data?.customer?.name}
        </Typography>
        <Typography color={"#8795A0"} fontSize={14}>
          {`${data?.items?.length}${pluralizer(data?.items?.length)}`}
        </Typography>
      </Box>
      <Typography>{`${new Date(
        data?.timestamp
      ).toLocaleDateString()}`}</Typography>
      <NumericFormat
        style={{
          fontSize: 18,
          color: "#313A43",
          fontWeight: "700",
          fontFamily: "sans-serif",
        }}
        value={data?.amount.toFixed(2)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₦"}
      />
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"start"}
        alignItems={"end"}
      >
        <Box sx={{ cursor: "pointer" }}>
          <Edit sx={{ color: "grey" }} />
        </Box>
        <Box py={1} sx={{ cursor: "pointer" }}>
          <DeleteForeverIcon sx={{ color: "grey" }} />
        </Box>
      </Box>
    </Box>
  );
}
