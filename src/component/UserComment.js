import { Button, TextField } from "@mui/material";
import React from "react";
import userImg from "../images/avatars/image-juliusomo.png";
import { Grid } from "@mui/material";

function UserComment({
  message,
  setMessage,
  isMessage,
  isSetMessage,
  //userData,
  //isEditMessage,
}) {

    
  const onSubmit = (e) => { 
    const userData = {
        id: isMessage.length + 1,
        userMessage: message,
        userImg: userImg,
      };  
     // console.log(userData.userMessage,"userData");  
    e.preventDefault();
    isSetMessage([...isMessage, userData]);
    setMessage("");
   // isEditMessage(false);
  };
  const oninputChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid
          container
          spacing={2}
          bgcolor="white"
          p={1}
          m={1}
          borderRadius={3}
        >
          <Grid item sx={1}>
            <img src={userImg} alt="img" width="40px" height="auto" />
          </Grid>
          <Grid item xs={9}>
            <TextField
              type="text"
              name="message"
              value={message}
              fullWidth
              placeholder="Add a comment"
              onChange={oninputChange}
            />{" "}
          </Grid>
          <Grid item sx={1}>
            <Button type="submit" variant="contained" fullWidth>
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default UserComment;
