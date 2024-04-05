import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

import UsersTable from "./UsersTable";
import AdsTable from "./AdsTable";

export default function AdminDashboard() {
    const [users, setUsers] = useState<[]>([]);
    const [ads, setAds] = useState<[]>([]);

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/app/get_all_users/");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const jsonData = await response.json();

            setUsers(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchAds = async () => {
        try {
            const response = await fetch(
                "http://127.0.0.1:8000/app/get_all_ad_listings/"
            );
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const jsonData = await response.json();

            setAds(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchAds();
    }, []);

    const handleUserDelete = async (userId: string) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/app/delete_user/${userId}/`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error("Failed to delete the user. Server responded with status: " + response.status);
            }

            const jsonData = await response.json();

            if (jsonData.error) {
                throw new Error("Error deleting user: " + jsonData.error);
            }

            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };


    const handleAdClose = async (adId: string) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/app/close_ad/${adId}/`, {
                method: 'PUT'
            });

            if (!response.ok) {
                throw new Error("Failed to close the ad. Server responded with status: " + response.status);
            }

            const jsonData = await response.json();

            if (jsonData.error) {
                throw new Error("Error closing ad: " + jsonData.error);
            }

            fetchAds();
        } catch (error) {
            console.error("Error closing ad:", error);
        }
    };

    const handleAdDelete = async (adId: string) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/app/delete_ad/${adId}/`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error("Failed to delete the ad. Server responded with status: " + response.status);
            }

            const jsonData = await response.json();

            if (jsonData.error) {
                throw new Error("Error deleting ad: " + jsonData.error);
            }

            fetchAds();
        } catch (error) {
            console.error("Error deleting ad:", error);
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                <Grid item xs={4} sm={4} md={6}>

                    <Typography textAlign="center" variant="h5">User Table</Typography>

                    <Divider component="div" />

                    <UsersTable usersList={users} handleUserDelete={handleUserDelete} />

                </Grid>

                <Grid item justifyContent="center" xs={4} sm={4} md={6}>
                    <Typography textAlign="center" variant="h5">Ads Table</Typography>

                    <Divider component="div" />

                    <AdsTable adsList={ads} handleAdClose={handleAdClose} handleAdDelete={handleAdDelete} />
                </Grid>
            </Grid>
        </Box>
    );
}
