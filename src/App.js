import Comment from "./component/Comments";
import "./App.css";
import { Container } from "@mui/material";

function App() {
  return (
    <Container sx={{ width: 900 }}>
      <Comment />
    </Container>
  );
}

export default App;
