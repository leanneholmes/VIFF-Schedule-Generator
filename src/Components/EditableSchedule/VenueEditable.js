// Customized components import
import ScreenEditable from './ScreenEditable';

// CSS import
import '../../css/Dashboard.css';
import '../../css/Schedule.css';

// context import
import { useScheduleContext } from '../../Context/ScheduleContext/ScheduleContext';

// External import
import React from 'react';
import reactCSS from 'reactcss';

const VenueEditable = (props) => {
    // console.log("venue",props.venueDetail.venueName, "id:", props.venueDetail.id);
    const convert = require('color-convert');
    const scheduleContext = useScheduleContext();
    const colors = scheduleContext.colorSettings;
    const fonts = scheduleContext.fontSettings;
    
    const oddRowColors = colors["oddRow"];
    const oddRowColorHex = convert.rgb.hex(oddRowColors.r, oddRowColors.g, oddRowColors.b);
    const evenRowColors = colors["evenRow"];
    const evenRowColorHex = convert.rgb.hex(evenRowColors.r, evenRowColors.g, evenRowColors.b);

    const venueTextColor = colors["venueText"];
    const venueTextColorHex = convert.rgb.hex(venueTextColor.r, venueTextColor.g, venueTextColor.b);

    const venueBarColor = colors["venueBar"];
    const venueBarColorHex = convert.rgb.hex(venueBarColor.r, venueBarColor.g, venueBarColor.b);

const oddBoxes = {
    'backgroundColor': '#' + oddRowColorHex, 
}

const evenBoxes = {
    'backgroundColor': '#' + evenRowColorHex,
}

const venueText = {
    'color': '#' + venueTextColorHex, 
    'fontSize': fonts["size"] +'pt',
}
const venueBar = {
    'backgroundColor': '#' + venueBarColorHex,
}

const createdScheduleBox = (id) => {
    const scheduleBoxNum = 64;
    const scheduleBoxes = [];
    // console.log("created schedule boxes!");
    for (let i = 0; i < scheduleBoxNum; i++) {
        if (id % 2 == 0) {
            if (i % 2 == 0) {
                scheduleBoxes.push(<div style={oddBoxes} className="box1" key={i}></div>);
            } else {
                scheduleBoxes.push(<div style={oddBoxes} className="box3" key={i}></div>);
            }
        } else {
            if (i % 2 == 0) {
                scheduleBoxes.push(<div style={evenBoxes} className="box2" key={i}></div>);
            } else {
                scheduleBoxes.push(<div style={evenBoxes} className="box4" key={i}></div>);
            }
        }
        // } else if (i % 4 == 2) {
        //     scheduleBoxes.push(<View style={styles.box3} key={i}></View>);
        // } else {
        //     scheduleBoxes.push(<View style={styles.box4} key={i}></View>);
        // }
    }
    return scheduleBoxes;
};
    return (
        <div className='venueRow'>
            <div className='venue'style={venueBar}>
                <div className='text' style={venueText}>{props.venueDetail.venueName}</div>
            </div>
            <div className='screen'>
                {createdScheduleBox(props.venueDetail.id)}
                {props.venueDetail.screens.map((screen, index) => {
                    return (
                        <ScreenEditable key={index} screen={screen}></ScreenEditable>
                    );
                })}

            </div>
        </div>
    );
};

export default VenueEditable;
