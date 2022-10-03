// import * as React from "react";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import ListSubheader from "@mui/material/ListSubheader";

// export default function Test() {
//   return (
//     <List
//       sx={{
//         width: "100%",
//         maxWidth: 360,
//         bgcolor: "background.paper",
//         position: "relative",
//         overflow: "auto",
//         maxHeight: 300,
//         "& ul": { padding: 0 },
//       }}
//       subheader={<li />}
//     >
//       {[0, 1, 2, 3, 4].map((sectionId) => (
//         <li key={`section-${sectionId}`}>
//           <ul>
//             <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
//             {[0, 1, 2].map((item) => (
//               <ListItem key={`item-${sectionId}-${item}`}>
//                 <ListItemText primary={`Item ${item}`} />
//               </ListItem>
//             ))}
//           </ul>
//         </li>
//       ))}
//     </List>
//   );
// }
// import * as React from "react";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import ListItemAvatar from "@mui/material/ListItemAvatar";
// import Avatar from "@mui/material/Avatar";
// import CalendarIcon from "@mui/icons-material/CalendarToday";
// import WorkIcon from "@mui/icons-material/Work";
// import BeachAccessIcon from "@mui/icons-material/BeachAccess";

// export default function Test() {
//   return (
//     <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
//       <ListItem>
//         <ListItemAvatar>
//           <Avatar>
//             <CalendarIcon />
//           </Avatar>
//         </ListItemAvatar>
//         <ListItemText primary="22/10/2022" secondary="Feriado en esta fecha" />
//       </ListItem>

//       <ListItem>
//         <ListItemAvatar>
//           <Avatar>
//             <CalendarIcon />
//           </Avatar>
//         </ListItemAvatar>
//         <ListItemText primary="25/10/2022" secondary="" />
//       </ListItem>
//     </List>
//   );
// }

import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/CalendarToday";
import Info from "@mui/icons-material/Info";

import DeleteIcon from "@mui/icons-material/Delete";

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList() {
  const [dense, setDense] = React.useState(true);
  const [secondary, setSecondary] = React.useState(true);

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <FormGroup row>
        {/* <FormControlLabel
          control={
            <Checkbox
              checked={secondary}
              onChange={(event) => setSecondary(event.target.checked)}
            />
          }
          label="Enable secondary text"
        /> */}
      </FormGroup>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Listado de Fechas
          </Typography>
          <Demo>
            <List dense={dense}>
              {generate(
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <Info />
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="22/10/2022"
                    secondary={secondary ? "Feriado Inventado" : null}
                  />
                </ListItem>
              )}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}
