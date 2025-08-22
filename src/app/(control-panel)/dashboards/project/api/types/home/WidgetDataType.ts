type ExtraData = {
  name: string;
  count: Record<RangeType, number>;
};

type WidgetInnerData = {
  name: string;
  count: Record<RangeType, number>;
  extra: ExtraData;
};

/**
 * The type definition for the data used to populate the widget.
 */
/* type WidgetDataType = {
	title?: string;
	ranges: Record<RangeType, string>;
	currentRange?: string;
	data: WidgetInnerData;
	detail?: string;
}; */

type WidgetDataType = {
  title: string;
  currentRange: RangeType;
  ranges: Record<RangeType, string>; // ✅ e.g. { week: "This Week", month: "This Month" }
  data: {
    count: Record<RangeType, number>;
    name: string;
    extra: {
      name: string;
      count: Record<RangeType, number>;
    };
  };
};
/* 
export type WidgetDataType = {
  title: string;
  ranges: Record<RangeType, string>; // ✅ e.g. { week: "This Week", month: "This Month" }

  data: {
    count: number; // ✅ number, not Record
    name: string;
    extra: {
      name: string;
      count: number; // ✅ number, not Record
    };
  };
}; */

export type RangeType = "DY" | "DT" | "DTM";

/**
 * Widget type for range-based widgets (like SummaryWidget).
 */
export type RangeWidgetDataType = {
  title: string;
  currentRange: RangeType;
  ranges: Record<RangeType, string>;
  data: {
    count: Record<RangeType, number>;
    name: string;
    extra: {
      name: string;
      count: Record<RangeType, number>;
    };
  };
};

/**
 * Widget type for simple number-based widgets (like IssuesWidget).
 */
export type SimpleWidgetDataType = {
  title: string;
  data: {
    count: number;
    name: string;
    extra: {
      name: string;
      count: number;
    };
  };
};

export type ProjectDashboardWidgetType =
  | SimpleWidgetDataType
  | RangeWidgetDataType;

export default WidgetDataType;
