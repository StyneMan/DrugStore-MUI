/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, List, Toolbar, Typography } from "@mui/material";
import React from "react";
import { getDatabase } from "../../../../../main/database";
import DraftCard from "../../../components/cards/draft_card";

export default function Drafts() {
  const [draftsList, setDraftsList] = React.useState<JSX.Element[]>([]);
  const [updater, setUpdater] = React.useState(false);
  const [data, setData] = React.useState<unknown[]>([]);

  async function getDrafts() {
    try {
      const db = await getDatabase(localStorage.getItem("dbPath") ?? "");

      db?.drafts.find().$.subscribe(function (drafts) {
        if (!drafts) {
          console.log("EMPTY DATA ");
          return;
        }
        // setUpdater(heroes[0]?._data)
        console.log("DRAFTS OBS fired");
        console.log("DRAFTS RXDB DATA :: ", drafts);

        setData(drafts);
        setUpdater(!updater);

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
    getDrafts();
  }, []);

  React.useEffect(() => {
    if (data) {
      const organizedDrafts = data?.map((item: any) => {
        return {
          id: item?._data?.id,
          amount: item?._data?.amount,
          customer: item?._data?.customer,
          items: item?._data?.items,
          timestamp: item?._data?.timestamp,
        };
      });
      console.log("DRAFTS DATA :: == :: ", organizedDrafts);
      // Now send this to main process
      window.electron.sendDraftDataToMain(
        JSON.stringify(organizedDrafts)
      );
    }
  }, [data]);

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
