import * as React from "react";
import Table from "@mui/material/Table";
import Grid from "@mui/material/Grid";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function ManageUsers() {
  const [data, setData] = React.useState(null);
  const [role, setRole] = React.useState("");

  const fetchAllUsers = async () => {
    const { data } = await axios.get("http://127.0.0.1:5000/users");
    console.log(data.data);
    setData(data.data);
  };

  React.useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleChange = async (event) => {
    console.log(event.target.value);
    console.log(event.target.name);
    setRole(event.target.value);
    const { data } = await axios.post("http://127.0.0.1:5000/setclaim", {
      id: event.target.name,
      claim: event.target.value,
    });
    console.log(data);
  };
  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: "900px",
        maxHeight: "900px",
        margin: "auto auto",
        marginTop: "120px",
        textAlign: "center",
        padding: "10px",
      }}
    >
      <Typography
        variant="h4"
        sx={{ borderBottom: "2px solid black", marginBottom: "10px" }}
      >
        List of All users
      </Typography>
      <Grid container padding={2} alignContent={"center"}>
        <Divider component="hr" />
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow
                key={row.uid}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.uid}
                </TableCell>

                <TableCell component="th" scope="row">
                  {row.providerData[0].email}
                </TableCell>
                <TableCell component="th" scope="row">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={role}
                      label="Assign Role"
                      name={row.uid}
                      onChange={handleChange}
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="moderator">Moderator</MenuItem>
                      <MenuItem value="user">User</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </TableContainer>
  );
}

export default ManageUsers;
