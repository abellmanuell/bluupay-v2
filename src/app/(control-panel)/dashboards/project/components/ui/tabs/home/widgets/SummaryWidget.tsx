import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { memo, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import FuseLoading from "@fuse/core/FuseLoading";
import WidgetDataType, {
  RangeType,
} from "../../../../../api/types/home/WidgetDataType";
import { useGetWidget } from "../../../../../api/hooks/widgets/useGetWidget";

/**
 * The SummaryWidget widget.
 */
function SummaryWidget() {
  const { data: widget, isLoading } = useGetWidget<WidgetDataType>("summary");

  const data = widget?.data ?? {
    count: {},
    extra: { name: "Completed", count: {} },
    name: "Due Tasks",
  };
  const ranges = widget?.ranges ?? { week: "This Week" };
  const currentRangeDefault =
    widget?.currentRange ?? Object.keys(ranges)[0] ?? "";

  const [currentRange, setCurrentRange] = useState<RangeType>(
    currentRangeDefault as RangeType,
  );

  function handleChangeRange(event: SelectChangeEvent<string>) {
    setCurrentRange(event.target.value as RangeType);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  return (
    <Paper className="flex flex-auto flex-col overflow-hidden rounded-xl shadow-sm">
      {/* Header with range selector */}
      <div className="flex items-center justify-between px-2 pt-2">
        <Select
          classes={{ select: "py-0 flex items-center" }}
          value={currentRange}
          onChange={handleChangeRange}
          slotProps={{
            input: {
              name: "currentRange",
            },
          }}
        >
          {Object.entries(ranges).map(([key, label]) => (
            <MenuItem key={key} value={key}>
              {label}
            </MenuItem>
          ))}
        </Select>
        <IconButton aria-label="more">
          <FuseSvgIcon>lucide:ellipsis-vertical</FuseSvgIcon>
        </IconButton>
      </div>

      {/* Main Count */}
      <div className="mt-4 text-center">
        <Typography className="text-7xl leading-none font-bold tracking-tight sm:text-8xl">
          {data.count?.[currentRange] ?? 27}
        </Typography>
        <Typography className="text-lg font-medium" color="text.secondary">
          {data.name ?? "Due Tasks"}
        </Typography>
      </div>

      {/* Extra Info */}
      <Typography
        className="mt-5 mb-6 flex w-full items-baseline justify-center gap-2"
        color="text.secondary"
      >
        <span className="truncate">{data.extra?.name ?? "Completed"}:</span>
        <b>{data.extra?.count?.[currentRange] ?? 7}</b>
      </Typography>
    </Paper>
  );
}

export default memo(SummaryWidget);
