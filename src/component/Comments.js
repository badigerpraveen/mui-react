import { Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useState } from "react";
import userImg from "../images/avatars/image-juliusomo.png";
import Otherscomments from "./Otherscomments";
import { Grid } from "@mui/material";
import { Style } from "@material-ui/icons";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { margin } from "@mui/system";
import UserComment from "./UserComment";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 280,
//   bgcolor: "background.paper",
//   border: "2px solid gray",
//   borderRadius: "4px",
//   boxShadow: 24,
//   p: 2,
//   color: "gray",
// };

// const styleDeletComent = {
//   color: "#324152",
// };

// const styleBtnDelet = {
//   bgcolor: "#ed6468",
//   "&:hover": {
//     backgroundColor: "#ed6468",
//   },
// };

// const styleBtnCancel = {
//   bgcolor: "#6c757d",
//   "&:hover": {
//     backgroundColor: "#6c757d",
//   },
// };

function Comment() {
  const [message, setMessage] = useState();
  const [isMessage, isSetMessage] = useState([]);
  const [editMessage, isEditSetMessage] = useState();
  const [isEditMessage, isSetEdtMessage] = useState(false);
  const [editId, isEditId] = useState();
  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);

  const deletMessag = (id) => {
    console.log(id, "ID onclick");
    const deletMessage = isMessage.filter((msgId) => {
      console.log(msgId.id, "msgId.id", id, "id");
      // console.log(msgId.id !== id);
      return msgId.id !== id;
    });
    isSetMessage(deletMessage);

    // setOpen(false);
  };

  const editMessag = (id) => {
    isSetEdtMessage(!isEditMessage);
    isEditId(id);
    const editMsg = isMessage.find((editMsgId) => {
      console.log(editMsgId.id);
      return editMsgId.id === id;
    });
    isEditSetMessage(editMsg.userMessage);
    console.log(editMessage, "editMessage122");
  };
  //console.log(editId, "editId");

  const onEditSubmit = (e) => {
    const userData = {
      id: isMessage.length + 1,
      userMessage: message,
      userImg: userImg,
    };
    debugger;
    console.log(userData.userMessage, "userData");
    e.preventDefault();
    //  isSetMessage([...isMessage, userData]);
    //console.log(editId , "editId");
    if (editId) {
      const editMsgNew = isMessage.find((item) => {
        //  console.log(item.userMessage,"item");
        return item.id === editId;
      });

      isSetMessage(
        isMessage.map((i) => {
          // console.log(i.id,"i");
          // console.log(i.userMessage,"userMessage");
          // console.log(userData.userMessage,"userData");
          debugger;
          console.log(editMessage, "editMessage.userMessage");
          return i.id === editMsgNew.id
            ? {
                id: i.id,
                userMessage: editMessage,
                userImg: i.userImg,
              }
            : {
                id: i.id,
                userMessage: i.userMessage,
                userImg: i.userImg,
              };
        })
      );
    }
    isSetEdtMessage(!isEditMessage);
  };

  const oninputChangeEdit = (e) => {
    isEditSetMessage(e.target.value);
  };

  return (
    <>
      <div className="over">
        <Otherscomments
        //   isEditMessage={isEditMessage}
        //   isSetEdtMessage={isSetEdtMessage}
        />

        {isMessage &&
          isMessage.map((i) => {
            console.log(i, "praveen");
            return (
              <Grid
                container
                spacing={2}
                bgcolor="white"
                p={1}
                marginTop="10px"
                marginLeft="10px"
                borderRadius={3}
              >
                <Grid item xs={9} display="flex" gap={2}>
                  <item>
                    {
                      <img
                        src={i.userImg}
                        alt="img"
                        width="40px"
                        height="auto"
                      />
                    }
                  </item>
                  <item> {<b>juliusomo </b>} </item>
                </Grid>
                <Grid item sx={2}>
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => deletMessag(i.id)}
                    //onClick={handleOpen}
                    startIcon={
                      isEditMessage && editId === i.id ? " " : <DeleteIcon />
                    }
                  >
                    {isEditMessage && editId === i.id ? " " : "Delet"}
                  </Button>

                  <Button
                    variant="text"
                    onClick={() => editMessag(i.id)}
                    color={isEditMessage && editId === i.id ? "error" : "info"}
                    startIcon={
                      isEditMessage && editId === i.id ? (
                        <CloseIcon />
                      ) : (
                        <EditIcon />
                      )
                    }
                  >
                    {isEditMessage && editId === i.id ? "Cancel" : "Edit"}
                  </Button>
                </Grid>
                <Grid item sx={6}>
                  {i.id} : {i.userMessage}
                  {/* <div>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      
                    > 
                      <Box sx={style}>
                        {i.id}
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          <strong sx={styleDeletComent}>
                            {"Delete comment"}
                          </strong>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          {
                            "Are you sure you want to delete this comment? This will remove the comment and can’t be undone."
                          }
                        </Typography>
                        <Typography padding={0}>
                          <item>
                            <Button
                              sx={styleBtnCancel}
                              variant="contained"
                              color="success"
                              size="medium"
                              onClick={handleClose}
                              style={{ margin: "10px 0 0 0" }}
                            >
                              {"No,Cancel"}
                            </Button>

                            <Button
                              sx={styleBtnDelet}
                              variant="contained"
                              color="error"
                              size="medium"
                              onClick={() => deletMessag(i.id)}
                              style={{ margin: "10px 0 0 15px" }}
                            >
                              {"Yes, Delete"} {i.id}
                            </Button>
                          </item>
                        </Typography>
                      </Box>
                    </Modal>
                  </div> */}
                </Grid>
                <Grid item xs={11} p={1}>
                  {isEditMessage && editId === i.id ? (
                    <form onSubmit={onEditSubmit}>
                      <TextField
                        type="text"
                        name="editmessage"
                        fullWidth
                        placeholder="Add a comment"
                        value={editMessage}
                        onChange={oninputChangeEdit}
                      />
                      <Button
                        type="submit"
                        style={{ marginTop: "10px" }}
                        variant="contained"
                      >
                        Update
                      </Button>
                    </form>
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
            );
          })}
      </div>
      <UserComment
        message={message}
        setMessage={setMessage}
        isMessage={isMessage}
        isSetMessage={isSetMessage}
        isEditMessage={isEditMessage}
        isSetEdtMessage={isSetEdtMessage}
        //userData={userData}
      />
    </>
  );
}

export default Comment;
