import React from 'react';
import { unstable_Box as Box } from '@material-ui/core/Box';
import atoms from '../atoms';

const { Avatar, Icon, Typography, Button } = atoms;

function ProfileHead() {
    return (
        <Box p={2} mb={1}>
            <Box
                style={{
                display: 'flex',
                justifyContent: 'space-between',
                textAlign: 'right'
                }}
            >
                <Avatar
                style={{ 
                    marginTop: '-18%', 
                    marginBottom: 14 
                }}
                ultraLarge
                bordered
                src={
                    'https://cc-media-foxit.fichub.com/image/fox-it-mondofox/e8c0f288-781d-4d0b-98ad-fd169782b53b/scene-sottacqua-per-i-sequel-di-avatar-maxw-654.jpg'
                }
                />
                <Button large color="primary" variant="outlined">
                Edit Profile
                </Button>
            </Box>
            <Typography primary>siriwatknp</Typography>
            <Typography light gutterBottom>
                @siriwatknp
            </Typography>
            <div>
                <Icon text light>
                calendar_today
                </Icon>
                <Typography light inline indented gutterBottom>
                Joined August 2016
                </Typography>
            </div>
            <Typography bold inline>
                48
            </Typography>
            <Typography light inline indented>
                Following
            </Typography>
            <Typography bold inline indentedLarge>
                3
            </Typography>
            <Typography light inline indented>
                Followers
            </Typography>
        </Box>
    );
}

export default ProfileHead;