import ScheduleEditable from "./ScheduleEditable";
import { useScheduleContext } from "../../Context/ScheduleContext/ScheduleContext";
import CalendarHeader from "../../assets/img/CalendarHeader_12345px.jpeg";

const SchedulePreview = () => {
  const scheduleContext = useScheduleContext();
  return (
    <div className="schedule-preview-container">
      <div className="image-container">
        <img
          src={CalendarHeader}
          alt="Calendar Header"
          className="calendar-image"
        />
      </div>
      {scheduleContext.gridScreenTimes.map((day, index) => (
        <ScheduleEditable key={index} data={day} />
      ))}
    </div>
  );
};

export default SchedulePreview;
