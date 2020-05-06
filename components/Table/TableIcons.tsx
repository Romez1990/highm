import React, { forwardRef } from 'react';
import {
  AddBox as AddBoxIcon,
  Check as CheckIcon,
  Clear as ClearIcon,
  DeleteOutline as DeleteOutlineIcon,
  ChevronRight as ChevronRightIcon,
  Edit as EditIcon,
  SaveAlt as SaveAltIcon,
  FilterList as FilterListIcon,
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  ChevronLeft as ChevronLeftIcon,
  Search as SearchIcon,
  ArrowDownward as ArrowDownwardIcon,
  Remove as RemoveIcon,
  ViewColumn as ViewColumnIcon,
} from '@material-ui/icons';
import { SvgIconProps } from '@material-ui/core/SvgIcon/SvgIcon';

const tableIcons = {
  Add: forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
    <AddBoxIcon {...props} ref={ref} />
  )),
  Check: forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
    <CheckIcon {...props} ref={ref} />
  )),
  Clear: forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
    <ClearIcon {...props} ref={ref} />
  )),
  Delete: forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
    <DeleteOutlineIcon {...props} ref={ref} />
  )),
  DetailPanel: forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
    <ChevronRightIcon {...props} ref={ref} />
  )),
  Edit: forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
    <EditIcon {...props} ref={ref} />
  )),
  Export: forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
    <SaveAltIcon {...props} ref={ref} />
  )),
  Filter: forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
    <FilterListIcon {...props} ref={ref} />
  )),
  FirstPage: forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
    <FirstPageIcon {...props} ref={ref} />
  )),
  LastPage: forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
    <LastPageIcon {...props} ref={ref} />
  )),
  NextPage: forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
    <ChevronRightIcon {...props} ref={ref} />
  )),
  PreviousPage: forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
    <ChevronLeftIcon {...props} ref={ref} />
  )),
  ResetSearch: forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
    <ClearIcon {...props} ref={ref} />
  )),
  Search: forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
    <SearchIcon {...props} ref={ref} />
  )),
  SortArrow: forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
    <ArrowDownwardIcon {...props} ref={ref} />
  )),
  ThirdStateCheck: forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
    <RemoveIcon {...props} ref={ref} />
  )),
  ViewColumn: forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
    <ViewColumnIcon {...props} ref={ref} />
  )),
};

export default tableIcons;
