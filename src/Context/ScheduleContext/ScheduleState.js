import React, { useReducer } from 'react';
import colorSettings from "../../resources/colors.json";
import reactCSS from 'reactcss';
import ScheduleContext from './ScheduleContext';
import ScheduleReducer from './ScheduleReducer';
import { useCookies } from 'react-cookie';


import {
    PARSE_GRIDSCREENTIMES,
    MAP_VENUENAME,
    SET_DATE,
    SET_COLOR,
} from '../ActionType';
import { parseGridScreensHelper, mapVenueNameHelper } from '../../Helper/ParsingHelper';


const ScheduleState = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(['dateText','dateBar', 'timeText', 'venueText', 'venueBar', 'filmTitleText', 'filmDetailsText', 'filmBlock', 'oddRow', 'evenRow']);

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);


    colorSettings.dateText = cookies.dateText !== undefined ? cookies.dateText : colorSettings.dateText;
    colorSettings.dateBar = cookies.dateBar !== undefined ? cookies.dateBar : colorSettings.dateBar;
    colorSettings.timeText = cookies.timeText !== undefined ? cookies.timeText : colorSettings.timeText;
    colorSettings.venueText = cookies.venueText !== undefined ? cookies.venueText : colorSettings.venueText;
    colorSettings.venueBar = cookies.venueBar !== undefined ? cookies.venueBar : colorSettings.venueBar;
    colorSettings.filmTitleText = cookies.filmTitleText !== undefined ? cookies.filmTitleText : colorSettings.filmTitleText;
    colorSettings.filmDetailsText = cookies.filmDetailsText !== undefined ? cookies.filmDetailsText : colorSettings.filmDetailsText;
    colorSettings.filmBlock = cookies.filmBlock !== undefined ? cookies.filmBlock : colorSettings.filmBlock;
    colorSettings.oddRow = cookies.oddRow !== undefined ? cookies.oddRow : colorSettings.oddRow;
    colorSettings.evenRow = cookies.evenRow !== undefined ? cookies.evenRow : colorSettings.evenRow;


    // if ( cookies.dateBar === null ) {
    //      colorSettings = colorSettings.dateBar;
    //  } else {
    //      colorSettings.dateBar = cookies.dateBar;
    //  }

    

    const initialState = {
        gridScreenTimes: [],
        colorSettings,
    };

    const [state, dispatch] = useReducer(ScheduleReducer, initialState);

    // Parse screen times
    const parseGridScreens = async (lines) => {
        const result = await parseGridScreensHelper(lines);
        dispatch({
            type: PARSE_GRIDSCREENTIMES,
            screenTimes: result,
        });
    };

    // Map venue code to name
    const mapVenueName = async (parsedGridVenues) => {
        const result = await mapVenueNameHelper(state.gridScreenTimes, parsedGridVenues);
        dispatch({
            type: MAP_VENUENAME,
            screenTimes: result,
        });
    };

    const setDate = (rowId) => {
        dispatch({
            type: SET_DATE,
            index: rowId,
        });
    };

    const setColor = (color) => {
        let colorObject = { r: color.r, g: color.g, b: color.b, a: color.a }
        dispatch({
            type: SET_COLOR,
            id: color.id,
            color: colorObject,
        });
        setCookie(color.id, colorObject, { expires: expirationDate });

        // updateColorSettings(color.id, colorObject);

    };

    return (
        <ScheduleContext.Provider
            value={{
                gridScreenTimes: state.gridScreenTimes,
                colorSettings: state.colorSettings,
                parseGridScreens,
                mapVenueName,
                setDate,
                setColor,
            }}>
            {props.children}
        </ScheduleContext.Provider>
    );
};

export default ScheduleState;
