import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { memo, useState } from "react";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import FuseLoading from "@fuse/core/FuseLoading";
import { Tabs, Tab } from "@mui/material";
import ScheduleDataType from "../../../../../api/types/home/ScheduleDataType";
import { useGetWidget } from "../../../../../api/hooks/widgets/useGetWidget";

/**
 * The ScheduleWidget widget.
 */
function ScheduleWidget() {
  const { data: widget, isLoading } =
    useGetWidget<ScheduleDataType>("schedule");

  const series = widget?.series ?? {};
  const ranges = widget?.ranges ?? {};
  const [tabValue, setTabValue] = useState(0);

  const rangeKeys = Object.keys(ranges);
  const currentRange = rangeKeys[tabValue] ?? "";
  const currentSeries = series[currentRange] ?? [];

  if (isLoading) {
    return <FuseLoading />;
  }

  return (
    <Paper className="flex h-full flex-auto flex-col overflow-hidden rounded-xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col items-start justify-between sm:flex-row">
        <Typography className="truncate text-lg leading-6 font-medium tracking-tight">
          {"Schedule"}
        </Typography>
        <div className="mt-3 sm:mt-0">
          <Tabs
            value={tabValue}
            onChange={(ev, value: number) => setTabValue(value)}
          >
            {rangeKeys.length > 0 ? (
              rangeKeys.map((key, index) => (
                <Tab key={key} value={index} label={ranges[key] ?? key} />
              ))
            ) : (
              <Tab value={0} label="No Ranges" />
            )}
          </Tabs>
        </div>
      </div>

      {/* List */}
      <List className="mt-2 divide-y py-0">
        {currentSeries.length > 0 ? (
          currentSeries.map((item, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton aria-label="more">
                  <FuseSvgIcon>lucide:chevron-right</FuseSvgIcon>
                </IconButton>
              }
              disableGutters
            >
              <ListItemText
                classes={{ primary: "font-medium" }}
                primary={item.title ?? "Untitled Event"}
                secondary={
                  <span className="flex flex-col gap-1.5 sm:flex-row sm:items-center">
                    {item.time && (
                      <span className="flex items-center gap-1">
                        <FuseSvgIcon color="disabled">lucide:clock</FuseSvgIcon>
                        <Typography
                          component="span"
                          className="text-md"
                          color="text.secondary"
                        >
                          {item.time}
                        </Typography>
                      </span>
                    )}
                    {item.location && (
                      <span className="flex items-center gap-1">
                        <FuseSvgIcon color="disabled">
                          lucide:map-pin
                        </FuseSvgIcon>
                        <Typography
                          component="span"
                          className="text-md"
                          color="text.secondary"
                        >
                          {item.location}
                        </Typography>
                      </span>
                    )}
                  </span>
                }
              />
            </ListItem>
          ))
        ) : (
          <Typography
            className="mt-4 text-center text-md"
            color="text.secondary"
          >
            No schedule available
          </Typography>
        )}
      </List>
    </Paper>
  );
}

export default memo(ScheduleWidget);
