import type { StyledComponent } from '@emotion/styled';
import type { TabProps, TabsProps } from '@mui/material';

import { Tab, Tabs, styled } from '@mui/material';

interface StyledTabsProps extends TabsProps {
   children?: React.ReactNode;
   value: number;
   onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export const StyledTabs: StyledComponent<StyledTabsProps> = styled((props: StyledTabsProps) => (
   <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />
))(({ theme }) => ({
   '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
   },
   '& .MuiTabs-indicatorSpan': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: theme.palette.primary.light,
   },
}));

interface StyledTabProps extends TabProps {
   label: string;
}

export const StyledTab: StyledComponent<StyledTabProps> = styled((props: StyledTabProps) => (
   <Tab disableRipple {...props} />
))(({ theme }) => ({
   textTransform: 'none',
   fontWeight: theme.typography.fontWeightRegular,
   fontSize: theme.typography.pxToRem(20),
   marginRight: theme.spacing(1),
   color: theme.palette.secondary.main,
   '&.Mui-selected': {
      color: theme.palette.primary.light,
   },
}));
