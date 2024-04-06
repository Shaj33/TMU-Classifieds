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
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";


type AdsTableProps = {
    adsList: [];
    handleAdClose: (adId: string) => void;
    handleAdDelete: (adId: string) => void;
};

// Ads table for admin
export default function AdsTable({ adsList, handleAdClose, handleAdDelete }: AdsTableProps) {
    const [open, setOpen] = useState(false);
    const [currentAdId, setCurrentAdId] = useState('');

    // Handles admin opening an ad
    const handleClickOpen = (adId: string) => {
        setCurrentAdId(adId);
        setOpen(true);
    };

    // Handles admin closing an add
    const handleClose = (deleteAd: boolean) => {
        if (deleteAd) {
            handleAdDelete(currentAdId);
        }
        setCurrentAdId('');
        setOpen(false);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Content</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {adsList.map((ad: any) => (
                            <TableRow
                                key={ad.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {ad.title}
                                </TableCell>
                                <TableCell align="right">{ad.type}</TableCell>
                                <TableCell align="right">{ad.content}</TableCell>
                                <TableCell align="right">{ad.price}</TableCell>
                                <TableCell align="right">{(ad.is_open) ? "Open" : "Closed"}</TableCell>
                                <TableCell align="right">
                                    {ad.is_open && <Tooltip title="Close the Ad">
                                        <IconButton onClick={() => handleAdClose(ad.id)}>
                                            <ArchiveOutlinedIcon color="secondary" />
                                        </IconButton>
                                    </Tooltip>}


                                    <Tooltip title="Delete the Ad">
                                        <IconButton onClick={() => handleClickOpen(ad.id)}>
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
                    Are you sure you want to delete this ad?
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