import { Card, CardContent, Typography } from "@mui/material";

const DashboardCard = ({ title, value }) => (
  <Card elevation={3} sx={{ borderRadius: 3 }}>
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

export default DashboardCard;
