import Root from "../Pages/Root";
import Home from "../Pages/Home";
import NewsFeed from "../Pages/NewsFeed";
import Chat from "../Pages/Chat";
import PostPage from "../Pages/PostPage";
import Error from "../Pages/Error";
import ChatRoom from "../Pages/ChatRoom";
import Composer from "../Pages/Composer";
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const paths = {
  root: {
    path: "/",
    element: <Root />,
  },
  home: {
    path: "/",
    element: <Home />,
  },
  news_feed: {
    path: "news-feed",
    element: <NewsFeed />,
  },
  chat: {
    path: "chat",
    element: <Chat />,
  },
  post: {
    path: "post/:postId",
    element: <PostPage />,
  },
  error: {
    path: "*",
    element: <Error />,
  },
  chatRoom: {
    path: "chat/:roomId",
    element: <ChatRoom />,
  },
  composer: {
    path: "create-post",
    element: <Composer />,
  },
};

const router = createHashRouter(
  createRoutesFromElements(
    <Route path={paths.root.path} element={paths.root.element}>
      <Route path={paths.home.path} element={paths.home.element}></Route>
      <Route
        path={paths.news_feed.path}
        element={paths.news_feed.element}
      ></Route>
      <Route path={paths.chat.path} element={paths.chat.element}></Route>
      <Route path={paths.post.path} element={paths.post.element}></Route>
      <Route
        path={paths.composer.path}
        element={paths.composer.element}
      ></Route>
      <Route path={paths.error.path} element={paths.error.element}></Route>
      <Route
        path={paths.chatRoom.path}
        element={paths.chatRoom.element}
      ></Route>
    </Route>,
  ),
);

export default router;
