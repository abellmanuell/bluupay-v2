import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { ApexOptions } from "apexcharts";
import _ from "lodash";
import VisitsWidgetType from "../../../api/types/VisitsWidgetType";
import { useGetWidget } from "../../../api/hooks/widgets/useGetWidget";
import ReactApexChart from "react-apexcharts";

/**
 * Impressions (Visits) widget.
 */
function Impressions() {
  const theme = useTheme();
  const { data: widget } = useGetWidget<VisitsWidgetType>("visits");

  // ✅ Return early while loading or missing data
  if (!widget) {
    return null;
  }

  const series = widget?.series || [];
  const amount = widget?.amount ?? 0;
  const labels = widget?.labels ?? [];

  // Assume backend may also return percentage change (positive/negative)
  const percentChange =
    // widget?.percentChange ??
    -4;

  const chartOptions: ApexOptions = {
    chart: {
      animations: { enabled: false },
      fontFamily: "inherit",
      foreColor: "inherit",
      height: "100%",
      type: "area",
      sparkline: { enabled: true },
    },
    colors: [theme.palette.secondary.main],
    fill: {
      colors: [theme.palette.secondary.light],
      opacity: 0.5,
    },
    stroke: { curve: "smooth", width: 2 },
    tooltip: {
      followCursor: true,
      theme: "dark",
    },
    xaxis: {
      type: "category",
      categories: labels,
    },
    responsive: [
      {
        breakpoint: 768,
        options: { chart: { height: 120 } },
      },
    ],
  };

  return (
    <Paper className="flex flex-auto flex-col overflow-hidden rounded-xl shadow-sm">
      {/* Header */}
      <div className="m-4 mb-0 flex items-start justify-between">
        <Typography className="truncate text-lg leading-6 font-medium tracking-tight">
          Visits
        </Typography>
        <div className="ml-2">
          <Chip size="small" className="text-sm font-medium" label="30 days" />
        </div>
      </div>

      {/* Main number + change */}
      <div className="mx-4 mt-3 flex flex-col gap-3 lg:flex-row lg:items-center">
        <Typography className="text-6xl leading-none font-bold tracking-tighter">
          {amount.toLocaleString("en-US")}
        </Typography>
        <div className="flex lg:flex-col">
          <FuseSvgIcon
            size={20}
            className={percentChange >= 0 ? "text-green-500" : "text-red-500"}
          >
            {percentChange >= 0 ? "lucide:trending-up" : "lucide:trending-down"}
          </FuseSvgIcon>
          <Typography
            className="text-md ml-1 flex items-center leading-none whitespace-nowrap lg:mt-0.5 lg:ml-0"
            color="text.secondary"
          >
            <span
              className={`font-medium ${
                percentChange >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {Math.abs(percentChange)}%
            </span>
            <span className="ml-1">
              {percentChange >= 0 ? "above target" : "below target"}
            </span>
          </Typography>
        </div>
      </div>

      {/* Chart */}
      <div className="-mb-2 flex h-20 flex-auto flex-col">
        <ReactApexChart
          options={chartOptions}
          series={_.cloneDeep(series)}
          type={chartOptions?.chart?.type}
          height={chartOptions?.chart?.height}
        />
      </div>
    </Paper>
  );
}

export default Impressions;
