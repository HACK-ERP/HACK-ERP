// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import {
//   Typography,
//   Card,
//   CardContent,
//   CardMedia,
//   Button,
//   Container,
//   Box,
// } from "@mui/material";
// import { getUserDetail } from "../../services/UsersService";

// const UserDetails = () => {
//     const { id } = useParams();
//     const [user, setUser] = useState({});
//     const [loading, setLoading] = useState(true);
    
//     useEffect(() => {
//         getUserDetail(id)
//         .then((user) => {
//             setUser(user);
//             setLoading(false);
//         })
//         .catch((error) => {
//             console.error(error);
//             setLoading(false);
//         });
//     }, [id]);
    
//     if (loading) {
//         return <Typography>Loading...</Typography>;
//     }
    
//     if (!user) {
//         return <Typography>User not found</Typography>;
//     }
    
//     const { name, email, image, role } = user;
    
//     return (
//         <Container>
//         <Typography variant="h3" gutterBottom style={{ marginTop: "20px" }}>
//             Detalle del usuario
//         </Typography>
//         <Box mt={4}>
//             <Card sx={{ maxWidth: "50%" }}>
//             {" "}
//             <CardMedia component="img" alt={name} height="250" image={image} />
//             <CardContent>
//                 <Typography variant="h4" gutterBottom>
//                 {name}
//                 </Typography>
//                 <Typography variant="body1" paragraph>
//                 {email}
//                 </Typography>
//                 <Typography variant="h7">Role: {role}</Typography><br />
                
//                 <Link to="/users" style={{ textDecoration: "none" }}>
//                 <Button variant="contained" color="primary">
//                     Volver
//                 </Button>
//                 </Link>
//             </CardContent>
//             </Card>
//         </Box>
//         </Container>
//     );
//     };

// export default UserDetails;