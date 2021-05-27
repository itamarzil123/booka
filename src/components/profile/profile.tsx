import { SyntheticEvent, useState } from 'react';
import { MAX_POST_IMAGE_SIZE } from '../../constants/image.constants';
import Modal from '../../widgets/modal/modal';
import styled from 'styled-components';
import DummyIcon from '../icon/dummy-icon/dummy-icon';
import './profile.css';

const Photo = styled.img<{ width?: number; height?: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 50%;
  border: 1px solid black;
  cursor: pointer;
`;

const UserProfileAndName = styled.div<{
  profilePhotoSize: any;
  width?: number;
  height?: number;
}>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  font-size: var(--menu-item-font-size);
  font-family: var(--primary-font-family);
  letter-spacing: var(--menu-item-letter-spacing);
`;

const ProfileName = styled.div`
  font-family: var(--primary-font-family);
  font-size: var(--menu-item-font-size);
  color: black;
  cursor: pointer;
  text-transform: capitalize;
`;

type Props = {
  username: string | undefined;
  userImage: any;
  isEditable: boolean;
  profilePhotoSize: any;
  width?: number;
  height?: number;
};
function Profile({
  username,
  userImage,
  isEditable,
  profilePhotoSize,
  width,
  height
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const RenderImageUploadModalContent = ({ image }: any) => (
    <div>
      <h1>Edit Your Profile</h1>
      <input
        className="input-file"
        name="image"
        onChange={handleImageSelection}
        type="file"
        id="profile-image"
        accept="image/x-png,image/jpeg"
      />
      <button onClick={handleSubmit}>UPLOAD IMAGE</button>
    </div>
  );
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };
  const handleImageSelection = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size >= MAX_POST_IMAGE_SIZE) {
      return;
    }
    setImage(file);
    setIsFocused(true);
    e.target.value = null;
  };

  const getUserFullName = () => {
    let results;
    if (username) {
      results = username;
    } else {
      results = '';
    }

    return results;
  };

  const handleProfileEdit = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <div className="profile-container">
        <UserProfileAndName
          profilePhotoSize={profilePhotoSize}
          className="user-profile-and-name"
          onClick={isEditable ? handleProfileEdit : undefined}
          width={width}
          height={height}
        >
          {userImage ? (
            <Photo
              width={profilePhotoSize}
              height={profilePhotoSize}
              src={userImage}
            />
          ) : (
            <DummyIcon profilePhotoSize={profilePhotoSize} />
          )}
          <ProfileName>{getUserFullName()}</ProfileName>
        </UserProfileAndName>
      </div>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <RenderImageUploadModalContent image={image} />
      </Modal>
    </>
  );
}

export default Profile;
