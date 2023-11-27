import "./App.css";
import backgroundImage from "./images/bg1.jpeg";
import {
	TextField,
	Card,
	Button,
	Box,
	Typography,
	Modal,
	Paper,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { red500, redA700 } from "mui/source/styles/colors";
import { useState } from "react";
import { CardMedia, Grid } from "@mui/material";

function ModalContent({ heading, data }) {
	return (
		<div>
			<Typography
				id="modal-modal-title"
				variant="h6"
				component="h2"
			>
				<h1>{heading}</h1>
			</Typography>
			<Typography
				id="modal-modal-description"
				sx={{ mt: 2 }}
			>
				<Grid2
					item
					xs={12}
				>
					<Grid2
						container
						justifyContent="center"
						spacing={3}
					>
						{data.map((value) => (
							<Grid2
								key={value}
								item
							>
								<Paper
									sx={{
										height: 160,
										width: "10vw",
										backgroundColor: (theme) =>
											theme.palette.mode === "dark"
												? "#1A2027"
												: "#fff",
									}}
								/>
							</Grid2>
						))}
					</Grid2>
				</Grid2>
			</Typography>
		</div>
	);
}

function App() {
	const CARD_ELEVATION = 14;
	const [open, setOpen] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [apiData, setApiData] = useState(undefined);

	async function handleOpen() {
		console.log("Input value = ", inputValue);
		const apiUrl = "http://127.0.0.1:5000/movies";
		const queryParameter = inputValue;
		const urlWithQuery = `${apiUrl}?user_id=${encodeURIComponent(
			queryParameter
		)}`;
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		headers.append("GET", "POST", "OPTIONS");
		fetch(urlWithQuery, {
			method: "GET",
			headers: headers,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				console.log("Data:", data);
				setApiData(data);
			});

		setOpen(true);
	}

	const handleClose = () => setOpen(false);
	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	return (
		<div
			style={{
				backgroundImage: `url(${backgroundImage})`,
				backgroundPosition: "center",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				width: "100vw",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				verticalAlign: "middle",
			}}
		>
			<Grid2
				container
				direction="column"
				spacing={3}
				alignItems="center"
			>
				<Grid2
					item
					xs
				>
					<Card
						sx={{
							backgroundColor: "white",
							width: "25vw",
							height: 45,
							padding: "5px",
							paddingTop: "10px",
						}}
						variant="outlined"
					>
						<TextField
							style={{
								backgroundColor: "white",
								width: "100%",
								alignContent: "center",
							}}
							id="outlined-size-small"
							label="Please enter user id"
							size="small"
							type={"text"}
							inputValue={inputValue}
							onChange={handleInputChange}
						/>
					</Card>
				</Grid2>
				<Grid2
					item
					s
				>
					<Button
						style={{
							width: "200px",
							backgroundColor: red500,
							"&:hover": {
								backgroundColor: redA700,
							},
						}}
						variant="contained"
						onClick={handleOpen}
					>
						Recommend Movie
					</Button>
				</Grid2>
			</Grid2>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: "80vw",
						height: "80vh",
						overflowY: "auto",
						bgcolor: "background.paper",
						border: "9px double #FF0000",
						boxShadow: 24,
						p: 5,
					}}
				>
					<div className="modal-content">
						{open ? (
							<div
								style={{
									overflowX: "auto",
									whiteSpace: "nowrap",
								}}
							>
								<h1>Matrix Factorization</h1>
								<Grid
									container
									spacing={2}
									flexDirection="row"
								>
									{apiData &&
										apiData["matrix_fact"].map(
											(imageName, index) => (
												<>
													<Grid
														item
														key={index}
													>
														<Card
															elevation={
																CARD_ELEVATION
															}
															sx={{
																":hover": {
																	boxShadow: 2, // theme.shadows[20]
																},
															}}
															style={{
																// border: "2px dashed black",
																maxWidth:
																	"200px",
															}}
														>
															<CardMedia
																component="img"
																alt={`Image ${
																	index + 1
																}`}
																height="300"
																width="170"
																image={`${imageName[1]}`}
															/>
														</Card>
														<h3 className="heading-wrapping">
															{imageName[0]}
														</h3>
													</Grid>
												</>
											)
										)}
								</Grid>
								<h1>K Nearest Neighbor</h1>
								<Grid
									container
									spacing={2}
									flexDirection="row"
								>
									{apiData &&
										apiData["knn"].map(
											(imageName, index) => (
												<>
													<Grid
														item
														key={index}
													>
														<Card
															elevation={
																CARD_ELEVATION
															}
															sx={{
																":hover": {
																	boxShadow: 2, // theme.shadows[20]
																},
															}}
															style={{
																// border: "2px dashed black",
																maxWidth:
																	"200px",
															}}
														>
															<CardMedia
																component="img"
																alt={`Image ${
																	index + 1
																}`}
																height="300"
																width="170"
																image={`${imageName[1]}`}
															/>
														</Card>
														<h3 className="heading-wrapping">
															{imageName[0]}
														</h3>
													</Grid>
												</>
											)
										)}
								</Grid>
							</div>
						) : (
							<div>
								<ModalContent
									heading="Matrix Factorization"
									data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
								/>
								<ModalContent
									heading="K-Nearest Neighbor"
									data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
								/>
							</div>
						)}
						<Button
							style={{
								border: "none",
								display: "inline-block",
								padding: "8px 16px",
								verticalAlign: "middle",
								overflow: "hidden",
								backgroundColor: "#f54842",
								textAlign: "center",
								marginTop: "25px",
								cursor: "pointer",
								width: 150,
							}}
							variant="contained"
							onClick={handleClose}
						>
							Close
						</Button>
					</div>
				</Box>
			</Modal>
		</div>
	);
}

export default App;
