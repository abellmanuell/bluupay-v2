import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { memo } from "react";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import FuseLoading from "@fuse/core/FuseLoading";
import WidgetDataType from "../../../../../api/types/home/WidgetDataType";
import { useGetWidget } from "../../../../../api/hooks/widgets/useGetWidget";

/**
 * The FeaturesWidget widget.
 */
function FeaturesWidget() {
  const { data: widget, isLoading } = useGetWidget<WidgetDataType>("features");

  const data = widget?.data ?? {
    count: 0,
    name: "Features",
    extra: { name: "Enabled", count: 0 },
  };
  const title = widget?.title ?? "Features";

  if (isLoading) {
    return <FuseLoading />;
  }

  return (
    <Paper className="flex flex-auto flex-col overflow-hidden rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-2 pt-2">
        <Typography
          className="truncate px-3 text-lg leading-6 font-medium tracking-tight"
          color="text.secondary"
        >
          {title}
        </Typography>
        <IconButton aria-label="more">
          <FuseSvgIcon>lucide:ellipsis-vertical</FuseSvgIcon>
        </IconButton>
      </div>

      {/* Main Count */}
      <div className="mt-4 text-center">
        <Typography className="text-7xl leading-none font-bold tracking-tight sm:text-8xl">
          {data?.count ?? 0}
        </Typography>
        <Typography className="text-lg font-medium" color="text.secondary">
          {data?.name ?? "Features"}
        </Typography>
      </div>

      {/* Extra Info */}
      <Typography
        className="mt-5 mb-6 flex w-full items-baseline justify-center gap-2"
        color="text.secondary"
      >
        <span className="truncate">{data?.extra?.name ?? "Enabled"}:</span>
        <b>{data?.extra?.count ?? 0}</b>
      </Typography>
    </Paper>
  );
}

export default memo(FeaturesWidget);
