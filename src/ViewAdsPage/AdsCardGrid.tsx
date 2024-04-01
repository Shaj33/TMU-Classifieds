import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MessageIcon from '@mui/icons-material/Message';
import AddCommentIcon from '@mui/icons-material/AddComment';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';


type AdsProps = {
    adsList: any[]
};


const AdCardsColumn = (columnAds: AdsProps): JSX.Element => (
    <>
        {columnAds.adsList.map((ad, index) => (
            <Grid item key={index}>
                <Card sx={{ maxWidth: 345 }}>
                        <CardHeader
                            title={
                                ad.title
                            }
                            subheader={
                                <Grid
                                    container
                                    direction="column"
                                    alignItems="flex-start"
                                >
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        marginBottom={1}
                                    >
                                        <Typography>{ad.date}</Typography>
                                        <Typography>{ad.price}</Typography>
                                    </Grid>
                                    <Typography variant='subtitle2'>{ad.location}</Typography>
                                </Grid>
                            }
                        />
                        {ad.picture && (
                            <CardMedia
                                component="img"
                                height="200"
                                image={`data:image/png;base64,${ad.picture}`}
                            />
                        )}
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {ad.content}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Tooltip title="Add a Comment">
                                <IconButton>
                                    <AddCommentIcon />
                                </IconButton>
                            </Tooltip>
                            <Box flexGrow={1} />
                            <Tooltip title="Message the Author">
                                <IconButton>
                                    <MessageIcon />
                                </IconButton>
                            </Tooltip>
                        </CardActions>
                    </Card>
            </Grid>
        ))}
    </>
);


export default function AdsCardGrid({ adsList }: AdsProps) {

    // Split the ads into 4 sub-arrays
    let resultSubarray: any[][] = [];
    let [...arr] = adsList;
    for (let i = 4; i > 0; i--) {
        resultSubarray.push(arr.splice(0, Math.ceil(arr.length / i)));
    }
    console.log(resultSubarray);

    return (
        <Grid container spacing={2}>
            {[...Array(4)].map((_, columnIndex) => (
                <Grid
                    key={columnIndex}
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    rowSpacing={2}
                    xs={3}
                >
                    <AdCardsColumn adsList={resultSubarray[columnIndex]} />
                </Grid>
            ))}
        </Grid>

    );
}