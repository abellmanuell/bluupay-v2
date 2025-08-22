import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Tooltip } from "@mui/material";
import { ApexOptions } from "apexcharts";
import _ from "lodash";
// import VisitorsVsPageViewsType from "../../../api/types/VisitorsVsPageViewsType";
import { useGetWidget } from "../../../api/hooks/widgets/useGetWidget";
import ReactApexChart from "react-apexcharts";

interface AnalyticsDashboardWidgetType {
  id?: string;
  title?: string;
  overallScore?: number;
  averageRatio?: number;
  predictedRatio?: number;
}

interface VisitorsVsPageViewsType extends AnalyticsDashboardWidgetType {
  ranges: {
    last28Days: string;
    last7Days: string;
    yesterday: string;
    today: string;
    [key: string]: string; // allow additional dynamic ranges
  };
  series: Record<string, ApexAxisChartSeries>;
  overallChange?: number;
  averageChange?: number;
  predictedChange?: number;
}

/**
 * Visitors vs. Page Views widget.
 */
function VisitorsVsPageViewsWidget() {
  const theme = useTheme();
  /* const { data: widget } = useGetWidget<VisitorsVsPageViewsType>(
    "visitorsVsPageViews",
  ); */

  const { data: widget } = useGetWidget<unknown>("visitorsVsPageViews") as {
    data?: VisitorsVsPageViewsType;
  };

  // ✅ Return early if no widget data
  if (!widget) {
    return null;
  }

  const series = widget?.series || [];
  const averageRatio = widget?.averageRatio ?? 0;
  const predictedRatio = widget?.predictedRatio ?? 0;
  const overallScore = widget?.overallScore ?? 0;

  // These can be wired from API (currently placeholders)
  const overallChange = widget?.overallChange ?? 42.9;
  const averageChange = widget?.averageChange ?? -13.1;
  const predictedChange = widget?.predictedChange ?? 22.2;

  const chartOptions: ApexOptions = {
    chart: {
      animations: { enabled: false },
      fontFamily: "inherit",
      foreColor: "inherit",
      height: "100%",
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: [theme.palette.primary.main, theme.palette.secondary.main],
    dataLabels: { enabled: false },
    fill: {
      colors: [theme.palette.primary.dark, theme.palette.secondary.light],
      opacity: 0.5,
    },
    grid: {
      show: false,
      padding: { bottom: -40, left: 0, right: 0 },
    },
    legend: { show: false },
    stroke: { curve: "smooth", width: 2 },
    tooltip: {
      followCursor: true,
      theme: "dark",
      x: { format: "MMM dd, yyyy" },
    },
    xaxis: {
      axisBorder: { show: false },
      labels: {
        offsetY: -20,
        rotate: 0,
        style: { colors: theme.palette.text.secondary },
      },
      tickAmount: 3,
      tooltip: { enabled: false },
      type: "datetime",
    },
    yaxis: {
      labels: { style: { colors: theme.palette.divider } },
      max: (max) => max + 250,
      min: (min) => min - 250,
      show: false,
      tickAmount: 5,
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: { height: 240 },
          legend: { position: "bottom" },
        },
      },
    ],
  };

  return (
    <Paper className="flex flex-auto flex-col overflow-hidden rounded-xl shadow-sm">
      {/* Header */}
      <div className="m-6 mb-0 flex items-start justify-between">
        <Typography className="truncate text-xl leading-6 font-medium tracking-tight">
          Visitors vs. Page Views
        </Typography>
        <div className="ml-2">
          <Chip size="small" className="text-sm font-medium" label="30 days" />
        </div>
      </div>

      {/* Metrics */}
      <div className="mx-6 mt-6 flex items-start">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Overall Score */}
          <div className="flex flex-col">
            <div className="flex items-center">
              <Typography
                variant="body2"
                color="text.secondary"
                className="font-medium"
              >
                Overall Score
              </Typography>
              <Tooltip title="Score is calculated by using the historical ratio between Page Views and Visitors. Best score is 1000, worst score is 0.">
                <FuseSvgIcon className="ml-1.5" size={16} color="disabled">
                  lucide:info
                </FuseSvgIcon>
              </Tooltip>
            </div>
            <div className="mt-2 flex items-start">
              <Typography className="text-4xl leading-none font-bold tracking-tight">
                {overallScore}
              </Typography>
              <div className="ml-2 flex items-center">
                <FuseSvgIcon className="text-green-500" size={20}>
                  lucide:trending-up
                </FuseSvgIcon>
                <Typography className="text-md ml-1 font-medium text-green-500">
                  {overallChange}%
                </Typography>
              </div>
            </div>
          </div>

          {/* Average Ratio */}
          <div className="flex flex-col">
            <div className="flex items-center">
              <Typography
                variant="body2"
                color="text.secondary"
                className="font-medium"
              >
                Average Ratio
              </Typography>
              <Tooltip title="Average Ratio is the average ratio between Page Views and Visitors">
                <FuseSvgIcon className="ml-1.5" size={16} color="disabled">
                  lucide:trending-up
                </FuseSvgIcon>
              </Tooltip>
            </div>
            <div className="mt-2 flex items-start">
              <Typography className="text-4xl leading-none font-bold tracking-tight">
                {averageRatio}%
              </Typography>
              <div className="ml-2 flex items-center">
                <FuseSvgIcon
                  className={
                    averageChange >= 0 ? "text-green-500" : "text-red-500"
                  }
                  size={20}
                >
                  {averageChange >= 0
                    ? "lucide:trending-up"
                    : "lucide:trending-down"}
                </FuseSvgIcon>
                <Typography
                  className={`text-md ml-1 font-medium ${
                    averageChange >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {averageChange}%
                </Typography>
              </div>
            </div>
          </div>

          {/* Predicted Ratio */}
          <div className="flex flex-col">
            <div className="flex items-center">
              <Typography
                variant="body2"
                color="text.secondary"
                className="font-medium"
              >
                Predicted Ratio
              </Typography>
              <Tooltip title="Predicted Ratio is calculated by using historical ratio, current trends and your goal targets.">
                <FuseSvgIcon className="ml-1.5" size={16} color="disabled">
                  lucide:info
                </FuseSvgIcon>
              </Tooltip>
            </div>
            <div className="mt-2 flex items-start">
              <Typography className="text-4xl leading-none font-bold tracking-tight">
                {predictedRatio}%
              </Typography>
              <div className="ml-2 flex items-center">
                <FuseSvgIcon
                  className={
                    predictedChange >= 0 ? "text-green-500" : "text-red-500"
                  }
                  size={20}
                >
                  {predictedChange >= 0
                    ? "lucide:trending-up"
                    : "lucide:trending-down"}
                </FuseSvgIcon>
                <Typography
                  className={`text-md ml-1 font-medium ${
                    predictedChange >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {predictedChange}%
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-3 flex h-80 flex-auto flex-col">
        <ReactApexChart
          className="h-full w-full flex-auto"
          options={chartOptions}
          // series={_.cloneDeep(series)}
          type={chartOptions?.chart?.type}
          height={chartOptions?.chart?.height}
        />
      </div>
    </Paper>
  );
}

export default VisitorsVsPageViewsWidget;
