import { jwtDecode } from "jwt-decode";
import { useContext, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { likePost, removeLikeFromPost, deletePost } from "../features/posts/postsSlice";
import { AuthContext } from "./AuthProvider";
import UpdatePostModal from "./UpdatePostModal";

export default function ProfilePostCard({ post }) {
  const [likes, setLikes] = useState(post.likes || []);
  const { content, id: postId, imageUrl } = post;
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;

  // user has liked the post if their id is in the likes array
  const isLiked = likes.includes(userId);

  // Decoding to get the userId
  const token = localStorage.getItem("authToken");
  const decode = jwtDecode(token);

  const avatarPic = "https://i.pinimg.com/550x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg";

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleShowUpdateModal = () => setShowUpdateModal(true);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  // This will be executed when heart/like button is clicked by the user, either add likes / remove likes
  const handleLike = () => (isLiked ? removeFromLikes() : addToLikes());

  // Add userId to likes array
  const addToLikes = () => {
    setLikes([...likes, userId]);
    dispatch(likePost({ userId, postId }));
  };

  // Remove userId from likes array and update the backend
  const removeFromLikes = () => {
    setLikes(likes.filter((id) => id !== userId))
    dispatch(removeLikeFromPost({ userId, postId }))
  };

  const handleDelete = () => {
    dispatch(deletePost({ userId, postId }))
  };

  return (
    <Row
      className="p-3"
      style={{
        borderTop: "1px solid #D3D3D3",
        borderBottom: "1px solid #D3D3D3",
      }}>
      <Col sm={1}>
        <Image src={avatarPic} fluid roundedCircle />
      </Col>

      <Col>
        <strong>Zac</strong>
        <span> @zac.codes - May 4</span>
        <p>{content}</p>
        <Image src={imageUrl} style={{ width: 150 }} />
        <div className="d-flex justify-content-between">
          <Button variant="light">
            <i className="bi bi-chat"></i>
          </Button>
          <Button variant="light">
            <i className="bi bi-repeat"></i>
          </Button>
          <Button variant="light" onClick={handleLike}>
            {isLiked ? <i className="bi bi-heart-fill text-danger"></i> : <i className="bi bi-heart"></i>}
            {likes.length}
          </Button>
          <Button variant="light">
            <i className="bi bi-graph-up"></i>
          </Button>
          <Button variant="light">
            <i className="bi bi-upload"></i>
          </Button>
          <Button variant="light">
            <i className="bi bi-pencil-square" onClick={handleShowUpdateModal}></i>
          </Button>
          <Button variant="light">
            <i className="bi bi-trash" onClick={handleDelete}></i>
          </Button>
          <UpdatePostModal
            show = {showUpdateModal}
            handleClose = {handleCloseUpdateModal}
            postId = {postId}
            originalPostContent = {content}
          />
        </div>
      </Col>
    </Row>
  );
}
