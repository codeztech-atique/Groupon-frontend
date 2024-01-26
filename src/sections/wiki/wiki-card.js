import PropTypes from 'prop-types';
import BookOpenIcon from '@heroicons/react/24/solid/BookOpenIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import { format, formatDistanceToNow } from 'date-fns';


export const WikiCard = (props) => {
  const { data } = props;
  const timestampDate = new Date(data.createdAt);
  const formattedTimestamp = format(timestampDate, 'dd-MM-yyyy HH:mm');
  const timeDifference = formatDistanceToNow(timestampDate, { addSuffix: true });
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3
          }}
        >
          <Avatar
            src={data.logo}
            variant="square"
          />
        </Box>
        <Typography
          align="center"
          gutterBottom
          variant="h5"
        >
          {data.title}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {data.description}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <ClockIcon />
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            {timeDifference}
          </Typography>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <BookOpenIcon />
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            {data.wordcount} Word
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

WikiCard.propTypes = {
  data: PropTypes.object.isRequired
};
