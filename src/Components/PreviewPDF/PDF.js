// Customized components import
import Schedule from './Schedule';

// Fonts import
import RobotoFont from '../../resources/fonts/Roboto-Regular.ttf';
import NeueHaas from '../../resources/fonts/NeueHaasUnica/NeueHaasUnicaPro-Regular.otf';
import NeueHaasMedium from '../../resources/fonts/NeueHaasUnica/NeueHaasUnicaPro-Medium.otf';
import NeueHaasBold from '../../resources/fonts/NeueHaasUnica/NeueHaasUnicaPro-Bold.otf';
import Helvetica from '../../resources/fonts/Helvetica/FreeSans.ttf';
import HelveticaBold from '../../resources/fonts/Helvetica/FreeSansBold.ttf';
import Garamond from '../../resources/fonts/EBGaramond-Regular.ttf';
import Geneva from '../../resources/fonts/Geneva Normal.ttf';
import AvantGarde from '../../resources/fonts/AvantGarde Normal.ttf';

// External import
import React from 'react';
import { Page, Document, Font } from '@react-pdf/renderer';

Font.register({
    family: 'Roboto', fonts: [
        { src: RobotoFont }, // font-style: normal, font-weight: normal
    ],
    family: 'NeueHaas', fonts: [
        { src: NeueHaas }, // font-style: normal, font-weight: normal
    ],
    family: 'NeueHaasMedium', fonts: [
        { src: NeueHaasMedium }, // font-style: normal, font-weight: normal
    ],
    family: 'NeueHaasBold', fonts: [
        { src: NeueHaasBold }, // font-style: normal, font-weight: normal
    ],
    family: 'Helvetica', fonts: [
        { src: Helvetica }, // font-style: normal, font-weight: normal
    ],
    family: 'HelveticaBold', fonts: [
        { src: HelveticaBold }, // font-style: normal, font-weight: normal
    ],
});

Font.register({
    family: 'Garamond',
    src: Garamond,
});

Font.register({
    family: 'Geneva',
    src: Geneva,
});

Font.register({
    family: 'AvantGarde',
    src: AvantGarde,
});


// Create Document Component
const MyDocument = (props) => (
    <Document>
        <Page size={2963}>
            {props.data.parsedScheduleContext.map((day, index) => {
                return (
                    <Schedule key={index} data={day} color={props.data.colorSettings} font={props.data.fontSettings} grid={props.data.gridSettings}></Schedule>
                );
            })}
        </Page>
    </Document >
);

export default MyDocument;
