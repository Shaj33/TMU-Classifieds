import AddCommentIcon from '@mui/icons-material/AddComment';
import MessageIcon from '@mui/icons-material/Message';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

type AdsProps = {
    adsList: any[]
    openMessage: (ad:any) => void
    columnNum: number
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
                                image={ad.picture}
                            />
                        )}
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {ad.content}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Box flexGrow={1} />
                            <Tooltip title="Message the Author">
                                <IconButton onClick={() => {columnAds.openMessage(ad)}}>
                                    <MessageIcon />
                                </IconButton>
                            </Tooltip>
                        </CardActions>
                    </Card>
            </Grid>
        ))}
    </>
);


export default function AdsCardGrid({ adsList, openMessage, columnNum }: AdsProps, ) {

    // Split the ads into 4 sub-arrays
    let resultSubarray: any[][] = [];
    let [...arr] = adsList;
    for (let i = columnNum; i > 0; i--) {
        resultSubarray.push(arr.splice(0, Math.ceil(arr.length / i)));
    }

    return (
        <Grid container>
            {[...Array(columnNum)].map((_, columnIndex) => (
                <Grid
                    key={columnIndex}
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    rowSpacing={2}
                    xs={true}
                >
                    <AdCardsColumn adsList={resultSubarray[columnIndex]} openMessage={openMessage} columnNum={columnNum}/>
                </Grid>
            ))}
        </Grid>

    );
}