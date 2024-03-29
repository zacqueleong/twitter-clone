import { useContext, useEffect } from "react";
import { Button, Col, Image, Nav, Row, Spinner } from "react-bootstrap";
import ProfilePostCard from "./ProfilePostCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsByUser } from "../features/posts/postsSlice";
import { AuthContext } from "./AuthProvider";

export default function ProfileMidBody() {
  const coverPic = "https://blog.talent500.co/wp-content/uploads/2021/06/pexels-danny-meneses-943096-1-1500x500.jpg";
  const avatarPic = "https://i.pinimg.com/550x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg";

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const { currentUser } = useContext(AuthContext);

  useEffect(()=> {
    dispatch(fetchPostsByUser(currentUser.uid));
  }, [dispatch, currentUser])

  return (
    <Col>
      <Image src={coverPic} fluid />
      <br />
      <Image
        src={avatarPic}
        roundedCircle
        style={{
          width: 150,
          position: "absolute",
          top: "140px",
          border: "4px solid #F8F9FA",
          marginLeft: 15,
        }}
      />
      <Row className="justify-content-end">
        <Col xs="auto">
          <Button className="rounded-pill mt-2" variant="outline-secondary">
            Edit Profile
          </Button>
        </Col>
      </Row>

      <p className="mt-5" style={{ margin: 0, fontweight: "bold", fontSize: "15px" }}>
        Zac
      </p>
      <p style={{ marginBottom: "2px" }}>@zac.codes</p>
      <p>This is a profile caption, literally :D</p>
      <p>Former AS/400 Developer transitioning to Modern Web Development </p>
      <p>
        <strong>271</strong> Following <strong>610</strong> Followers
      </p>

      <Nav variant="underline" defaultActiveKey="/home" justify>
        <Nav.Item>
          <Nav.Link eventKey="/home">Tweets</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Replies</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Highlights</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3">Media</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-4">Likes</Nav.Link>
        </Nav.Item>
      </Nav>

      {loading && (
        <Spinner animation="border" className="ms-3 mt-3" variant="primary" />
      )}
      {/* Only render ProfilePostCard component if post data is found, spread the array and sort it by descending order. */}
      
      {posts.length > 0 && 
        [...posts]
          // sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          // .map((post) => <ProfilePostCard key={post.id} content={post.content} postId={post.id} />)}
          .map((post) => <ProfilePostCard key={post.id} post={post} />)}
    </Col>
  );
}
