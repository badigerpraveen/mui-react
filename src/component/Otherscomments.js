import React from "react";
import { useState, useEffect } from "react";
import othrscomments from "./data.json";
import { Button, Grid, TextField } from "@mui/material";
import ReplySharpIcon from "@mui/icons-material/ReplySharp";
import CloseIcon from "@mui/icons-material/Close";

function Otherscomments() {
  const [othersCmt, setOthersCmt] = useState([]);
  const [isEditMessage, isSetEdtMessage] = useState(false);

  const replyMessag = (id) => {
    isSetEdtMessage(!isEditMessage);
  };
  return (
    <>
      {othrscomments.comments.map((content) => {
       // console.log(content.content, "content");
        return (
          <>
            <Grid
              container
              spacing={2}
              bgcolor="white"
              p={1}
              m={1}
              borderRadius={3}
            >
              <Grid item xs={10} display="flex" gap={2}> 
                {console.log(content.user.image.png,"content.user.image.png")}
                <img src={content.user.image.png} alt="img" />
                <b> {content.user.username} </b> 
               
                {content.createdAt}
              </Grid>
              <Grid item sx={2}>
                <Button
                  variant="text"
                  onClick={() => replyMessag(content.id)}
                  color={isEditMessage ? "error" : "info"}
                  startIcon={isEditMessage ? <CloseIcon /> : <ReplySharpIcon />}
                >
                  {isEditMessage ? "Cancel" : "Reply"}
                </Button>
              </Grid>

              <Grid item sx={6}>
                <p> {content.content} </p>
              </Grid>
              <Grid item xs={11} p={1}>
                {isEditMessage ? (
                  <form>
                    <TextField
                      type="text"
                      name="message"
                      fullWidth
                      placeholder="Add a comment"
                    />
                    <Button
                      type="submit"
                      style={{ marginTop: "10px" }}
                      variant="contained"
                    >
                      Reply
                    </Button>
                  </form>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </>
        );
      })}
      {console.log(othrscomments.comments)}
    </>
  );
}

export default Otherscomments;
