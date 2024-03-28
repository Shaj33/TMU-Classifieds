import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

type AdsProps = {
    adsList: any[]
};

const CustomAccordion = styled(Accordion)({
    marginBottom: "10px"
});

const AdsAccordion = ({ adsList }: AdsProps): JSX.Element => {
    console.log(adsList);
    const [expanded, setExpanded] = useState<string | false>('');

    const handleAccordionExpand =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    return (
        <div>
            {adsList.map((ad, index) => (
                <CustomAccordion expanded={expanded === `panel${index + 1}`} onChange={handleAccordionExpand(`panel${index + 1}`)} key={ad.id}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index + 1}-content`}
                        id={`panel${index + 1}-header`}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Typography>{ad.Title}</Typography>
                            <Typography>{ad.Price}</Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{ad.Content}</Typography>
                    </AccordionDetails>
                </CustomAccordion>
            ))}
        </div>
    );
}


export default AdsAccordion;