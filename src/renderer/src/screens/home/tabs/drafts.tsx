import { Box, List, Toolbar, Typography } from "@mui/material";
import React from "react";
import { getDatabase } from "../../../../../main/database";
import OrderCard from "../../../components/cards/order_card";
import DraftCard from "../../../components/cards/draft_card";

export default function Drafts() {
  const [draftsList, setDraftsList] = React.useState<JSX.Element[]>([]);

  async function getCarts() {
    try {
      const db = await getDatabase();

      db.drafts.find().$.subscribe(function (drafts) {
        if (!drafts) {
          console.log("EMPTY DATA ");

          // heroesList.innerHTML = 'Loading..';
          return;
        }
        // setUpdater(heroes[0]?._data)
        console.log("DRAFTS OBS fired");
        console.log(drafts);

        const content = drafts.map((draft) => {
          console.log("ELEM", draft);

          return (
            <Box
              py={1}
              display="flex"
              flexDirection={"column"}
              justifyContent={"start"}
              alignItems={"start"}
            >
              <DraftCard data={draft?._data} />
            </Box>
          );
        });

        setDraftsList(content);
      });
    } catch (error) {
      console.log("CATCH ERROR ::: ", error);
    }
  }

  React.useEffect(() => {
    getCarts();
  }, []);

  return (
    <Box px={2}>
      <Toolbar />
      <Toolbar />
      <Typography fontSize={21} fontWeight={800} color={"black"} gutterBottom>
        Drafts
      </Typography>
      <List>{draftsList}</List>
    </Box>
  );
}
