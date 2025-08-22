import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { memo, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { ApexOptions } from "apexcharts";
import FuseLoading from "@fuse/core/FuseLoading";
import _ from "lodash";
import { Tabs, Tab } from "@mui/material";
import GithubIssuesDataType from "../../../../../api/types/home/GithubIssuesDataType";
import ReactApexChart from "react-apexcharts";
import { useGetWidget } from "../../../../../api/hooks/widgets/useGetWidget";

/**
 * The GithubIssuesWidget widget.
 */
function GithubIssuesWidget() {
  const theme = useTheme();
  const [awaitRender, setAwaitRender] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const { data: widget, isLoading } =
    useGetWidget<GithubIssuesDataType>("githubIssues");

  // ✅ Default fallback structure
  const defaultWidget: GithubIssuesDataType = {
    overview: {
      default: {
        "new-issues": 0,
        "closed-issues": 0,
        fixed: 0,
        "wont-fix": 0,
        "re-opened": 0,
        "needs-triage": 0,
      },
    },
    series: {
      default: [
        { name: "New Issues", type: "", data: [] },
        { name: "Closed Issues", type: "", data: [] },
      ],
    },
    ranges: {
      default: "Default",
    },
    labels: [],
  };

  const mergedWidget = { ...defaultWidget, ...widget };

  const overview = mergedWidget.overview;
  const series = mergedWidget.series;
  const ranges = mergedWidget.ranges;
  const labels = mergedWidget.labels;

  const rangeKeys = Object.keys(ranges);
  const currentRange = rangeKeys[tabValue] ?? rangeKeys[0] ?? "default";

  const chartOptions: ApexOptions = {
    chart: {
      fontFamily: "inherit",
      foreColor: "inherit",
      height: "100%",
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: [theme.palette.primary.main, theme.palette.secondary.main],
    labels,
    dataLabels: {
      enabled: true,
      enabledOnSeries: [0],
      background: { borderWidth: 0 },
    },
    grid: { borderColor: theme.palette.divider },
    legend: { show: false },
    plotOptions: { bar: { columnWidth: "50%" } },
    states: { hover: { filter: { type: "darken" } } },
    stroke: { width: [3, 0] },
    tooltip: { followCursor: true, theme: theme.palette.mode },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      labels: { style: { colors: theme.palette.text.secondary } },
      tooltip: { enabled: false },
    },
    yaxis: {
      labels: {
        offsetX: -16,
        style: { colors: theme.palette.text.secondary },
      },
    },
  };

  useEffect(() => {
    setAwaitRender(false);
  }, []);

  if (isLoading) {
    return <FuseLoading />;
  }

  if (awaitRender) {
    return null;
  }

  const currentOverview =
    overview[currentRange] ?? defaultWidget.overview.default;

  return (
    <Paper className="flex flex-auto flex-col overflow-hidden rounded-xl p-6 shadow-sm">
      <div className="flex flex-col items-start justify-between sm:flex-row">
        <Typography className="truncate text-xl leading-6 font-medium tracking-tight">
          Github Issues Summary
        </Typography>
        <div className="mt-3 sm:mt-0">
          <Tabs
            value={tabValue}
            onChange={(_ev, value: number) => setTabValue(value)}
          >
            {rangeKeys.map((key, index) => (
              <Tab key={key} value={index} label={ranges[key]} />
            ))}
          </Tabs>
        </div>
      </div>

      <div className="mt-8 grid w-full grid-flow-row grid-cols-1 gap-6 sm:mt-4 lg:grid-cols-2">
        {/* Chart */}
        <div className="flex flex-auto flex-col">
          <Typography className="font-medium" color="text.secondary">
            New vs. Closed
          </Typography>
          <div className="flex flex-auto flex-col">
            <ReactApexChart
              className="w-full flex-auto"
              options={chartOptions}
              series={_.cloneDeep(series[currentRange] ?? [])}
              height={320}
            />
          </div>
        </div>

        {/* Overview */}
        <div className="flex flex-col">
          <Typography className="font-medium" color="text.secondary">
            Overview
          </Typography>
          <div className="mt-6 grid flex-auto grid-cols-4 gap-3">
            {[
              { key: "new-issues", label: "New Issues", highlight: true },
              { key: "closed-issues", label: "Closed", highlight: true },
              { key: "fixed", label: "Fixed" },
              { key: "wont-fix", label: "Won't Fix" },
              { key: "re-opened", label: "Re-opened" },
              { key: "needs-triage", label: "Needs Triage" },
            ].map(({ key, label, highlight }) => (
              <Box
                key={key}
                sx={{
                  backgroundColor: "var(--mui-palette-background-default)",
                }}
                className="col-span-2 flex flex-col items-center justify-center rounded-xl border px-1 py-8 sm:col-span-1"
              >
                <Typography
                  className="text-5xl leading-none font-semibold tracking-tight sm:text-7xl"
                  color={highlight ? "secondary" : "text.secondary"}
                >
                  {currentOverview[key] ?? 0}
                </Typography>
                <Typography
                  className="mt-1 text-center text-sm font-medium sm:text-lg"
                  color={highlight ? "secondary" : "text.secondary"}
                >
                  {label}
                </Typography>
              </Box>
            ))}
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default memo(GithubIssuesWidget);
