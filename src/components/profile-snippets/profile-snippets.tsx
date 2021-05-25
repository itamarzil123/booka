import Box from '../box/box';
import './profile-snippets.css';

function ProfileSnippets() {
  return (
    <Box width={15} height={70}>
      <div className="snippets">
        details about the user profile / notifications that are related to the
        user profile.
      </div>
    </Box>
  );
}

export default ProfileSnippets;
