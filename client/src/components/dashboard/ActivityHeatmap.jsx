import { useMemo } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

function getColorClass(count) {
  if (!count || count === 0) return 'color-empty';
  if (count <= 2) return 'color-scale-1';
  if (count <= 5) return 'color-scale-2';
  return 'color-scale-3';
}

export default function ActivityHeatmap({ data = [] }) {
  const endDate = new Date();
  const startDate = useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 1);
    return d;
  }, []);

  // Build tooltip-friendly values
  const values = useMemo(() => {
    return data.map((d) => ({
      date: d.date,
      count: d.count,
    }));
  }, [data]);

  return (
    <div className="heatmap-wrapper">
      <div className="heatmap-header">
        <h2>Activity</h2>
        <div className="heatmap-legend">
          <span className="heatmap-legend-label">Less</span>
          <span className="heatmap-legend-box color-empty" />
          <span className="heatmap-legend-box color-scale-1" />
          <span className="heatmap-legend-box color-scale-2" />
          <span className="heatmap-legend-box color-scale-3" />
          <span className="heatmap-legend-label">More</span>
        </div>
      </div>

      <div className="heatmap-calendar-container">
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={values}
          classForValue={(value) => {
            if (!value) return 'color-empty';
            return getColorClass(value.count);
          }}
          titleForValue={(value) => {
            if (!value) return 'No activity';
            return `${value.date}: ${value.count} problem${value.count !== 1 ? 's' : ''} solved`;
          }}
          showWeekdayLabels
        />
      </div>
    </div>
  );
}
