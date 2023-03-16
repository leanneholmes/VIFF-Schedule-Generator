import '../../css/Dashboard.css';
import '../../css/Schedule.css';

import React from 'react';
import reactCSS from 'reactcss';

const ScreenEditable = (prop) => {
    // console.log("schedule box rgb:", prop.screen.colour);
    // console.log("r:", prop.screen.colour.r);
    const r = prop.screen.colour.r;
    const g = prop.screen.colour.g;
    const b = prop.screen.colour.b;
    // console.log(`rgb values: ${r}, ${g}, ${b}`);
    let width;
    let startPoint;
    const color = `2px solid rgb(${r}, ${g}, ${b})`;
    const screen = prop.screen;
    const startTime = screen.startTime;
    const duration = screen.duration;

    const now = new Date();
    now.setHours(startTime.substr(0, startTime.indexOf(':')));
    now.setMinutes(startTime.substr(startTime.indexOf(':') + 1));
    now.setSeconds(0);

    const oneDiv = 1 / 64;
    const hourBegin = 9;
    const boxNumInHour = 4;
    const boxMin = 15;

    // getting a start point
    let hour = startTime.substr(0, startTime.indexOf(':'));
    let min = startTime.substr(startTime.indexOf(':') + 1, startTime.indexOf(':') + 1);
    hour = parseInt(hour);
    hour -= hourBegin;
    hour *= boxNumInHour;
    min = parseInt(min);
    min /= boxMin;
    startPoint = (hour + min) / 64 * 100 * 0.52;
    startPoint += 'vw';

    // getting a width

    hour = duration.substr(0, duration.indexOf(':'));
    min = duration.substr(duration.indexOf(':') + 1, duration.indexOf(':'));
    hour = parseFloat(hour) * boxNumInHour;
    min = parseFloat(min) / boxMin;
    const durationNum = hour + min;
    width = oneDiv * durationNum * 100 * 0.52;
    width = width + 'vw';

    const ScreenBoxstyles = reactCSS({
        'default': {
            screenBox: {
                height: '2%',
                position: 'absolute',
                width: width,
                marginLeft: startPoint,
                backgroundColor: 'white',
                borderTop: '1px solid black',
                borderLeft: '1px dotted black',
                borderBottom: '1px solid black',
                borderRight: color,
            },
            title: {
                height: '50%',
                fontSize: '1.5em',
                margin: '0',
            },
        },
    });
    return (
        <div className='screenBox' style={ScreenBoxstyles.screenBox}>
            <div style={ScreenBoxstyles.title}>{screen.screenTitle}</div>
            <div>{screen.startTime} {screen.duration} </div>
        </div>

    );
};

export default ScreenEditable;
