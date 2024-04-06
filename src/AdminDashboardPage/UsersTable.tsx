import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";


type UsersTableProps = {
    usersList: [];
    handleUserDelete: (userId: string) => void;
};

// User table for admin
export default function UsersTable({ usersList, handleUserDelete }: UsersTableProps) {

    const [open, setOpen] = useState(false);
    const [currentUserId, setCurrentUserId] = useState('');
    
    const handleClickOpen = (userId: string) => {
        setCurrentUserId(userId);
        setOpen(true);
    };

    const handleClose = (deleteUser: boolean) => {
        if (deleteUser) {
            handleUserDelete(currentUserId);
        }
        setCurrentUserId('');
        setOpen(false);
    };


    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usersList.map((user: any) => (
                            <TableRow
                                key={user.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {user.username}
                                </TableCell>
                                <TableCell align="right">{user.email}</TableCell>
                                <TableCell align="right">
                                    <Tooltip title="Delete the User">
                                        <IconButton onClick={() => handleClickOpen(user.id)}>
                                            <DeleteForeverOutlinedIcon color="error" />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    Are you sure you want to delete this User?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(true)}>Yes</Button>
                    <Button onClick={() => handleClose(false)} autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}