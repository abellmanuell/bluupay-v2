import { useTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ApexOptions } from "apexcharts";
import _ from "lodash";
import { Tabs, Tab } from "@mui/material";
import { useContrastMainTheme } from "@fuse/core/FuseSettings/hooks/fuseThemeHooks";
import { useGetWidget } from "../../../api/hooks/widgets/useGetWidget";
import ReactApexChart from "react-apexcharts";
// import VisitorsVsPageViewsType from "../../../api/types/VisitorsVsPageViewsType";

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
 * Default fallback data
 */
const defaultWidget: VisitorsVsPageViewsType = {
  id: "visitors-overview",
  title: "Visitors Overview",
  overallScore: 75, // 👈 required from AnalyticsDashboardWidgetType
  averageRatio: 1.2, // 👈 required
  predictedRatio: 1.5, // 👈 required

  ranges: {
    last28Days: "Last 28 days",
    last7Days: "Last 7 days",
    yesterday: "Yesterday",
    today: "Today",
  },
  series: {
    last28Days: [
      {
        name: "Visitors",
        data: [
          [1672531200000, 1200],
          [1672617600000, 1500],
          [1672704000000, 1800],
        ],
      },
    ],
    last7Days: [
      {
        name: "Visitors",
        data: [
          [1672963200000, 1300],
          [1673049600000, 1600],
          [1673136000000, 2000],
        ],
      },
    ],
    yesterday: [
      {
        name: "Visitors",
        data: [
          [1673222400000, 1700],
          [1673308800000, 1900],
        ],
      },
    ],
    today: [
      {
        name: "Visitors",
        data: [
          [1673395200000, 800],
          [1673481600000, 1200],
        ],
      },
    ],
  },
};

/**
 * The visitors overview widget.
 */
function VisitorsOverviewWidget() {
  const theme = useTheme();
  const contrastTheme = useContrastMainTheme(theme.palette.primary.dark);

  const { data: widget } = useGetWidget<unknown>("visitors") as {
    data?: VisitorsVsPageViewsType;
  };
  // Use API data or fallback
  const data = widget ?? defaultWidget;
  const { series, ranges } = data;

  const [tabValue, setTabValue] = useState(0);
  const currentRange =
    Object.keys(ranges || {})[tabValue] ?? Object.keys(defaultWidget.ranges)[0];

  const chartOptions: ApexOptions = useMemo(
    () => ({
      chart: {
        animations: { speed: 400, animateGradually: { enabled: false } },
        fontFamily: "inherit",
        foreColor: "inherit",
        width: "100%",
        height: "100%",
        type: "area",
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      colors: [contrastTheme.palette.secondary.main],
      dataLabels: { enabled: false },
      fill: { colors: [contrastTheme.palette.secondary.light] },
      grid: {
        show: true,
        borderColor: theme.palette.divider,
        padding: { top: 10, bottom: -40, left: 0, right: 0 },
        position: "back",
        xaxis: { lines: { show: true } },
      },
      stroke: { width: 2 },
      tooltip: {
        followCursor: true,
        theme: "dark",
        x: { format: "MMM dd, yyyy" },
        y: { formatter: (value: number) => `${value}` },
      },
      xaxis: {
        axisBorder: { show: false },
        axisTicks: { show: false },
        crosshairs: {
          stroke: {
            color: contrastTheme.palette.divider,
            dashArray: 0,
            width: 2,
          },
        },
        labels: {
          offsetY: -20,
          style: { colors: contrastTheme.palette.secondary.dark },
        },
        tickAmount: 20,
        tooltip: { enabled: false },
        type: "datetime",
      },
      yaxis: {
        axisTicks: { show: false },
        axisBorder: { show: false },
        min: (min) => min - 750,
        max: (max) => max + 250,
        tickAmount: 5,
        show: false,
      },
    }),
    [contrastTheme, theme.palette.divider],
  );

  return (
    <Box
      className="flex flex-auto flex-col overflow-hidden rounded-xl shadow-sm sm:col-span-2 lg:col-span-3"
      sx={{
        background: theme.vars.palette.background.paper,
        color: theme.vars.palette.text.primary,
      }}
    >
      <div className="mx-3 mt-3 flex justify-between md:mx-6 md:mt-6">
        <div className="flex flex-col">
          <Typography className="mr-4 text-2xl leading-7 font-semibold tracking-tight md:text-3xl">
            Visitors Overview
          </Typography>
          <Typography className="font-medium" color="text.secondary">
            Number of unique visitors
          </Typography>
        </div>
        <div>
          <Tabs
            value={tabValue}
            onChange={(_ev, value: number) => setTabValue(value)}
          >
            {Object.entries(ranges).map(([key, label]) => (
              <Tab key={key} label={label} />
            ))}
          </Tabs>
        </div>
      </div>

      <div className="flex h-80 flex-auto flex-col">
        <ReactApexChart
          options={chartOptions}
          series={_.cloneDeep(series?.[currentRange] ?? [])}
          type={chartOptions.chart?.type}
          height={chartOptions.chart?.height}
        />
      </div>
    </Box>
  );
}

export default VisitorsOverviewWidget;
